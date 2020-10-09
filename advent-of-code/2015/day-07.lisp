(uiop:define-package #:advent-of-code/2015/day-07
  (:use #:cl #:aoc-utils)
  (:export #:day-07/p1 #:day-07/p2))

(in-package #:advent-of-code/2015/day-07)

(defparameter *rules*
  '(((?x -> ?y)           ?y ?x)
    ((?x AND ?y -> ?z)    ?z (logand ?x ?y))
    ((?x OR ?y -> ?z)     ?z (logior ?x ?y))
    ((?x LSHIFT ?y -> ?z) ?z (ash ?x ?y))
    ((?x RSHIFT ?y -> ?z) ?z (ash ?x (- ?y)))
    ((NOT ?x -> ?y)       ?y (lognot ?x))))

(defparameter *keywords* '(logand logior ash lognot -))

(defparameter *table* nil)

(defun vars-in (expr)
  "Return a list of variables (wire identifiers) in expr."
  (cond ((null expr) nil)
        ((atom expr)
         (when (and (symbolp expr) (not (member expr *keywords*)))
           (list expr)))
        (t (append (vars-in (car expr)) (vars-in (cdr expr))))))

(defun wire-value (wire)
  "Return the output of the wire by recursively solving its inputs."
  (let ((value (gethash wire *table*)))
    (if (integerp value)
        value
        (let ((bindings (mapcar (lambda (var)
                                  (cons var (wire-value var)))
                                (vars-in value))))
          (setf (wire-value wire) (eval (sublis bindings value)))))))

(defun (setf wire-value) (value wire)
  "Assign the value to the wire."
  (setf (gethash wire *table*) value))

(defun connect-circuit (instructions)
  "Connect all the wires together by following the instructions but not evaluate yet."
  (dolist (instruction instructions)
    (dolist (rule *rules*)
      (multiple-value-bind (bindings success)
          (match (car rule) instruction)
        (when success
          (let ((wire (sublis bindings (second rule)))
                (value (sublis bindings (third rule))))
            (setf (wire-value wire) value)
            (return)))))))

(defun read-instructions ()
  (puzzle-file->forms "2015/data/07.txt"))

(defun day-07/p1 ()
  (let ((*table* (make-hash-table)))
    (connect-circuit (read-instructions))
    (wire-value 'a)))

(defun day-07/p2 ()
  (let ((*table* (make-hash-table)))
    (connect-circuit (read-instructions))
    (setf (wire-value 'b) (day-07/p1))
    (wire-value 'a)))

(uiop:define-package #:advent-of-code/2015/day-23
  (:use #:cl #:aoc-utils)
  (:export #:day-23/p1 #:day-23/p2))

(in-package #:advent-of-code/2015/day-23)

(defparameter *rules*
  '(((hlf ?r) (progn
                (setf (register '?r) (/ (register '?r) 2))
                (incf (register 'pc))))
    ((tpl ?r) (progn
                (setf (register '?r) (* (register '?r) 3))
                (incf (register 'pc))))
    ((inc ?r) (progn
                (incf (register '?r))
                (incf (register 'pc))))
    ((jmp ?offset) (incf (register 'pc) ?offset))
    ((jie ?r ?offset) (incf (register 'pc) (if (evenp (register '?r)) ?offset 1)))
    ((jio ?r ?offset) (incf (register 'pc) (if (= (register '?r) 1) ?offset 1)))))

(let ((a 0)
      (b 0)
      (pc 0))
  (defun register (sym)
    (case sym
      (a a)
      (b b)
      (pc pc)))
  (defun (setf register) (value sym)
    (case sym
      (a (setf a value))
      (b (setf b value))
      (pc (setf pc value))))
  (defun reset ()
    (setf a 0 b 0 pc 0)))

(defun read-instructions ()
  (let ((forms (mapcar (lambda (line) (str->form (remove #\, line)))
                       (puzzle-file->lines "2015/data/23.txt"))))
    (coerce (mapcar (lambda (form)
                      (dolist (rule *rules*)
                        (multiple-value-bind (bindings success) (match (car rule) form)
                          (when success
                            (return (sublis bindings (cadr rule)))))))
                    forms)
            'vector)))

(defun run-program ()
  (let ((instructions (read-instructions)))
    (do ((pc 0 (register 'pc)))
        ((>= pc (length instructions)))
      (eval (aref instructions pc)))))

(defun day-23/p1 ()
  (reset)
  (run-program)
  (register 'b))

(defun day-23/p2 ()
  (reset)
  (setf (register 'a) 1)
  (run-program)
  (register 'b))

(uiop:define-package #:advent-of-code/2020/day-08
  (:use #:cl #:aoc-utils)
  (:export #:day-08/p1 #:day-08/p2))

(in-package #:advent-of-code/2020/day-08)

(defun read-instructions ()
  (coerce (puzzle-file->forms "2020/data/08.txt") 'vector))

(defun run-program (instructions)
  "Return the accumulator and a boolean flag when the program terminates, the flag
indicates if program exits normally or not (entering infinite loop)."
  (let* ((num-instructions (length instructions))
         (table (make-array num-instructions :initial-element nil))
         (accumulator 0))
    (do ((pc 0))
        ((or (>= pc num-instructions) (aref table pc))
         (values accumulator (>= pc num-instructions)))
      (destructuring-bind (op value) (aref instructions pc)
        (setf (aref table pc) t)
        (case op
          (acc
           (incf accumulator value)
           (incf pc))
          (jmp (incf pc value))
          (nop (incf pc)))))))

(defun day-08/p1 ()
  (run-program (read-instructions)))

(defun day-08/p2 ()
  (let ((instructions (read-instructions)))
    (flet ((fixed-instructions (addr)
             (let ((instructions (copy-seq instructions)))
               (destructuring-bind (op value) (aref instructions addr)
                 (setf (aref instructions addr) (list (if (eq op 'jmp) 'nop 'jmp) value)))
               instructions)))
      (loop for (op value) across instructions
            for addr from 0
            do (when (member op '(jmp nop))
                 (multiple-value-bind (acc terminate-normally-p)
                     (run-program (fixed-instructions addr))
                   (when terminate-normally-p
                     (return acc))))))))

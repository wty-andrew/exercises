(uiop:define-package #:advent-of-code/2020/day-01
  (:use #:cl #:aoc-utils)
  (:export #:day-01/p1 #:day-01/p2))

(in-package #:advent-of-code/2020/day-01)

(defun read-expense-report ()
  (mapcar #'parse-integer (puzzle-file->lines "2020/data/01.txt")))

(defun day-01/p1 ()
  (let ((table (make-hash-table)))
    (dolist (n (read-expense-report))
      (if (gethash (- 2020 n) table)
          (return-from day-01/p1 (* n (- 2020 n)))
          (setf (gethash n table) t)))))

(defun day-01/p2 ()
  (let ((seen nil)
        (table (make-hash-table)))
    (dolist (n (read-expense-report))
      (let ((product2 (gethash (- 2020 n) table)))
        (when product2
          (return-from day-01/p2 (* n product2)))
        (dolist (x seen)
          (setf (gethash (+ n x) table) (* n x)))
        (push n seen)))))

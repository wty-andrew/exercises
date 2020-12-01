(uiop:define-package #:advent-of-code/2015/day-25
  (:use #:cl #:aoc-utils)
  (:export #:day-25/p1))

(in-package #:advent-of-code/2015/day-25)

(defun index-of (row col)
  (/ (+ (* row row) (* col col) (* 2 row col) (- col) (- (* 3 row)) 2) 2))

(defun next-number (n)
  (mod (* n 252533) 33554393))

(defun read-input ()
  (let* ((forms (str->form (remove-chars (puzzle-file->string "2015/data/25.txt") '(#\, #\.))))
         (row (nth 15 forms))
         (column (nth 17 forms)))
    (list row column)))

(defun day-25/p1 ()
  (let ((n 20151125))
    (destructuring-bind (row col) (read-input)
      (dotimes (_ (1- (index-of row col)) n)
        (setf n (next-number n))))))

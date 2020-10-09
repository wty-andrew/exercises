(uiop:define-package #:advent-of-code/2015/day-02
  (:use #:cl #:aoc-utils)
  (:export #:day-02/p1 #:day-02/p2))

(in-package #:advent-of-code/2015/day-02)

(defun parse-input (input-file)
  "Return a list of dimensions, each dimensions is a sorted list of three numbers."
  (flet ((parse-dimensions-string (s)
           (sort (mapcar #'parse-integer
                         (uiop:split-string s :separator '(#\x)))
                 #'<)))
    (mapcar #'parse-dimensions-string (puzzle-file->lines input-file))))

(defun day-02/p1 ()
  (let ((dimensions-list (parse-input "2015/data/02.txt"))
        (amount-of-paper 0))
    (dolist (dim dimensions-list amount-of-paper)
      (destructuring-bind (a b c) dim
        (incf amount-of-paper (+ (* 3 a b) (* 2 a c) (* 2 b c)))))))

(defun day-02/p2 ()
  (let ((dimensions-list (parse-input "2015/data/02.txt"))
        (amount-of-ribbon 0))
    (dolist (dim dimensions-list amount-of-ribbon)
      (destructuring-bind (a b c) dim
        (incf amount-of-ribbon (+ (* 2 a) (* 2 b) (* a b c)))))))

(uiop:define-package #:advent-of-code/2015/day-01
  (:use #:cl #:aoc-utils)
  (:export #:day-01/p1 #:day-01/p2))

(in-package #:advent-of-code/2015/day-01)

(defun day-01/p1 ()
  (let ((input (read-puzzle-input "2015/data/01.txt"))
        (floor 0))
    (dotimes (i (length input) floor)
      (if (char= (char input i) #\()
          (incf floor)
          (decf floor)))))

(defun day-01/p2 ()
  (let ((input (read-puzzle-input "2015/data/01.txt")))
    (do ((floor 0)
         (i 0 (1+ i)))
        ((= floor -1) i)
      (if (char= (char input i) #\()
          (incf floor)
          (decf floor)))))

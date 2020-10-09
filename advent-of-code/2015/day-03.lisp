(uiop:define-package #:advent-of-code/2015/day-03
  (:use #:cl #:aoc-utils)
  (:export #:day-03/p1 #:day-03/p2))

(in-package #:advent-of-code/2015/day-03)

(defun make-position (x y)
  (cons x y))

(defun move (position direction)
  (destructuring-bind (x . y) position
    (cond ((char= direction #\^) (make-position x (1+ y)))
          ((char= direction #\v) (make-position x (1- y)))
          ((char= direction #\<) (make-position (1- x) y))
          ((char= direction #\>) (make-position (1+ x) y)))))

(defun day-03/p1 ()
  (let ((input (puzzle-file->string "2015/data/03.txt"))
        (visited (make-hash-table :test 'equalp))
        (position (make-position 0 0)))
    (setf (gethash position visited) t)
    (dotimes (i (length input) (hash-table-count visited))
      (setf position (move position (char input i))
            (gethash position visited 0) t))))

(defun day-03/p2 ()
  (let ((input (puzzle-file->string "2015/data/03.txt"))
        (visited (make-hash-table :test 'equalp))
        (santa-pos (make-position 0 0))
        (robot-pos (make-position 0 0)))
    (setf (gethash santa-pos visited) t)
    (dotimes (i (/ (length input) 2) (hash-table-count visited))
      (setf santa-pos (move santa-pos (char input (* i 2)))
            (gethash santa-pos visited 0) t
            robot-pos (move robot-pos (char input (1+ (* i 2))))
            (gethash robot-pos visited 0) t))))

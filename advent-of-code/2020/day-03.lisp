(uiop:define-package #:advent-of-code/2020/day-03
  (:use #:cl #:aoc-utils)
  (:export #:day-03/p1 #:day-03/p2))

(in-package #:advent-of-code/2020/day-03)

(defun read-map ()
  (let* ((lines (puzzle-file->lines "2020/data/03.txt"))
         (height (length lines))
         (width (length (car lines)))
         (map (make-array `(,height ,width) :element-type 'bit))
         (y 0))
    (dolist (line lines map)
      (dotimes (x width)
        (setf (aref map y x) (if (char= (char line x) #\#) 1 0)))
      (incf y))))

(defun traverse (map x-step y-step)
  (destructuring-bind (height width) (array-dimensions map)
    (let ((trees 0))
      (do ((x 0 (mod (+ x x-step) width))
           (y 0 (+ y y-step)))
          ((>= y height) trees)
        (incf trees (aref map y x))))))

(defun day-03/p1 ()
  (traverse (read-map) 3 1))

(defun day-03/p2 ()
  (let ((map (read-map)))
    (reduce #'* (loop for (x-step y-step) in '((1 1) (3 1) (5 1) (7 1) (1 2))
                      collect (traverse map x-step y-step)))))

(uiop:define-package #:advent-of-code/2016/day-03
  (:use #:cl #:aoc-utils)
  (:export #:day-03/p1 #:day-03/p2))

(in-package #:advent-of-code/2016/day-03)

(defun read-triangles-by-row ()
  (mapcar #'str->form (puzzle-file->lines "2016/data/03.txt")))

(defun read-triangles-by-column ()
  (let* ((data (mapcar #'str->form (puzzle-file->lines "2016/data/03.txt")))
         (height (length data))
         (array (make-array (list height 3) :initial-contents data)))
    (loop for j below height by 3
          nconc (loop for i below 3
                      collect (list (aref array j i)
                                    (aref array (+ j 1) i)
                                    (aref array (+ j 2) i))))))

(defun valid-triangle-p (triangle)
  (destructuring-bind (a b c) triangle
    (and (> (+ a b) c)
         (> (+ a c) b)
         (> (+ b c) a))))

(defun day-03/p1 ()
  (loop for triangle in (read-triangles-by-row)
        count (valid-triangle-p triangle)))

(defun day-03/p2 ()
  (loop for triangle in (read-triangles-by-column)
        count (valid-triangle-p triangle)))

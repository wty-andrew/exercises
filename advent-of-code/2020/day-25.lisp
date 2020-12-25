(uiop:define-package #:advent-of-code/2020/day-25
  (:use #:cl #:aoc-utils)
  (:export #:day-25/p1))

(in-package #:advent-of-code/2020/day-25)

(defun read-keys ()
  (destructuring-bind ((key1) (key2)) (puzzle-file->forms "2020/data/25.txt")
    (values key1 key2)))

(defun transform (n subject-number)
  (mod (* n subject-number) 20201227))

(defun find-loop-size (pub-key subject-number)
  (do ((n 1 (transform n subject-number))
       (loop-size 0 (1+ loop-size)))
      ((= n pub-key) loop-size)))

(defun day-25/p1 ()
  (multiple-value-bind (key1 key2) (read-keys)
    (let ((n 1))
      (dotimes (_ (find-loop-size key2 7) n)
        (setf n (transform n key1))))))

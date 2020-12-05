(uiop:define-package #:advent-of-code/2020/day-05
  (:use #:cl #:aoc-utils)
  (:export #:day-05/p1 #:day-05/p2))

(in-package #:advent-of-code/2020/day-05)

(defun binary-search (lower-char upper-char string)
  (declare (ignorable upper-char))
  (let ((lower 0)
        (upper (1- (expt 2 (length string)))))
    (loop for c across string
          do (let ((range (/ (1+ (- upper lower)) 2)))
               (if (char= c lower-char)
                   (decf upper range)
                   (incf lower range))))
    lower))

(defun boarding-pass->seat-id (boarding-pass)
  (let ((row (binary-search #\F #\B (subseq boarding-pass 0 7)))
        (col (binary-search #\L #\R (subseq boarding-pass 7))))
    (+ (* row 8) col)))

(defun read-seat-ids ()
  (mapcar #'boarding-pass->seat-id (puzzle-file->lines "2020/data/05.txt")))

(defun day-05/p1 ()
  (reduce #'max (read-seat-ids)))

(defun day-05/p2 ()
  (let ((seat-ids (sort (read-seat-ids) #'<)))
    (loop for id in seat-ids
          for id2 from (first seat-ids)
          when (/= id id2)
            do (return id2))))

(uiop:define-package #:advent-of-code/2020/day-15
  (:use #:cl #:aoc-utils)
  (:export #:day-15/p1 #:day-15/p2))

(in-package #:advent-of-code/2020/day-15)

(defun read-start-numbers ()
  (list 2 0 6 12 1 3))

(defun find-nth-spoken-number (start-numbers n)
  (let ((table (make-hash-table))
        (prev-number (car (last start-numbers))))
    (flet ((update-entry (num turn)
             (let ((history (gethash num table)))
               (if (< (length history) 2)
                   (push turn (gethash num table))
                   (setf (gethash num table) (list turn (first history))))
               (setf prev-number num))))
      (loop for turn from 1
            for num in start-numbers
            do (update-entry num turn))
      (loop for turn from (1+ (length start-numbers)) upto n
            do (let* ((history (gethash prev-number table))
                      (zero-or-age (if (< (length history) 2) ; length of history will only be 1 or 2
                                       0
                                       (- (first history) (second history)))))
                 (update-entry zero-or-age turn))
            finally (return prev-number)))))

(defun day-15/p1 ()
  (find-nth-spoken-number (read-start-numbers) 2020))

(defun day-15/p2 ()
  (find-nth-spoken-number (read-start-numbers) 30000000))

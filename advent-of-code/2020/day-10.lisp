(uiop:define-package #:advent-of-code/2020/day-10
  (:use #:cl #:aoc-utils)
  (:export #:day-10/p1 #:day-10/p2))

(in-package #:advent-of-code/2020/day-10)

(defun read-adapter-jolts ()
  (mapcar #'parse-integer
          (puzzle-file->lines "2020/data/10.txt")))

(defun day-10/p1 ()
  (let ((jolts (sort (cons 0 (read-adapter-jolts)) #'<)) ; 0 for outlet jolt
        (diff-3-jolt-count 1) ; account for device jolt
        (diff-1-jolt-count 0))
    (loop for x in jolts
          for y in (cdr jolts)
          do (cond ((= (- y x) 1) (incf diff-1-jolt-count))
                   ((= (- y x) 3) (incf diff-3-jolt-count))))
    (* diff-1-jolt-count diff-3-jolt-count)))

(defun day-10/p2 ()
  (let ((table (make-hash-table))
        (jolts (sort (read-adapter-jolts) #'>)))
    (labels ((arrangements (n)
               (+ (or (gethash (+ n 1) table) 0)
                  (or (gethash (+ n 2) table) 0)
                  (or (gethash (+ n 3) table) 0)))
             (rec (jolts)
               (let ((jolt (car jolts)))
                 (when jolt
                   (setf (gethash jolt table) (arrangements jolt))
                   (rec (cdr jolts))))))
      (setf (gethash (car jolts) table) 1)
      (rec (cdr jolts))
      (arrangements 0))))

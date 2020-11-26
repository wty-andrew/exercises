(uiop:define-package #:advent-of-code/2015/day-20
  (:use #:cl #:aoc-utils)
  (:export #:day-20/p1 #:day-20/p2))

(in-package #:advent-of-code/2015/day-20)

(defun factorize (number)
  (let ((factors nil))
    (loop for i from 1 upto (floor (sqrt number))
          do (multiple-value-bind (quotient remainder)
                 (floor number i)
               (when (zerop remainder)
                 (push i factors)
                 (when (/= quotient i)
                   (push quotient factors)))))
    factors))

(defun find-lowest-house-number (score-fn)
  (do* ((i 1 (1+ i))
        (n (funcall score-fn i) (funcall score-fn i)))
       ((> n 36000000) i)))

(defun day-20/p1 ()
  (find-lowest-house-number
   (lambda (n) (* (reduce #'+ (factorize n)) 10))))

(defun day-20/p2 ()
  (find-lowest-house-number
   (lambda (n) (loop for factor in (factorize n)
                     when (<= n (* factor 50))
                       sum (* factor 11)))))

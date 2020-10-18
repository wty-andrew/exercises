(uiop:define-package #:advent-of-code/2015/day-10
  (:use #:cl #:aoc-utils)
  (:export #:day-10/p1 #:day-10/p2))

(in-package #:advent-of-code/2015/day-10)

(defun look-and-say (sequence)
  (let ((prev (car sequence))
        (count 1)
        (acc nil))
    (dolist (curr (cdr sequence))
      (if (= prev curr)
          (incf count)
          (setf acc (cons prev (cons count acc))
                prev curr
                count 1)))
    (reverse (cons prev (cons count acc)))))

(defun input-sequence ()
  (map 'list #'digit-char-p "1321131112"))

(defun day-10/p1 ()
  (let ((seq (input-sequence)))
    (dotimes (_ 40 (length seq))
      (setf seq (look-and-say seq)))))

(defun day-10/p2 ()
  (let ((seq (input-sequence)))
    (dotimes (_ 50 (length seq))
      (setf seq (look-and-say seq)))))

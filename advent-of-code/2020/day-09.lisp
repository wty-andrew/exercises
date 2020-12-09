(uiop:define-package #:advent-of-code/2020/day-09
  (:use #:cl #:aoc-utils)
  (:export #:day-09/p1 #:day-09/p2))

(in-package #:advent-of-code/2020/day-09)

(defun read-numbers ()
  (coerce (mapcar #'parse-integer
                  (puzzle-file->lines "2020/data/09.txt"))
          'vector))

(defun find-range (numbers target)
  "Return the contiguous numbers from given numbers that sum up to target."
  (let ((start-idx 0)
        (end-idx 0)
        (running-sum 0))
    (do ()
        ((= running-sum target) (subseq numbers start-idx end-idx))
      (cond ((> running-sum target) (progn
                                      (decf running-sum (aref numbers start-idx))
                                      (incf start-idx)))
            ((< running-sum target) (progn
                                      (incf running-sum (aref numbers end-idx))
                                      (incf end-idx)))))))

(defun day-09/p1 ()
  (let ((numbers (read-numbers)))
    (flet ((valid-p (preamble target)
             (loop for n across preamble
                   for i from 0
                     thereis (find (- target n) (subseq preamble (1+ i))))))
      (do* ((i 25 (1+ i))
            (preamble (subseq numbers (- i 25) i) (subseq numbers (- i 25) i))
            (target (aref numbers i) (aref numbers i)))
           ((not (valid-p preamble target)) target)))))

(defun day-09/p2 ()
  (let ((range (find-range (read-numbers) (day-09/p1))))
    (+ (reduce #'max range) (reduce #'min range))))

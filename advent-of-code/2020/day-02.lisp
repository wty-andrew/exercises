(uiop:define-package #:advent-of-code/2020/day-02
  (:use #:cl #:aoc-utils)
  (:export #:day-02/p1 #:day-02/p2))

(in-package #:advent-of-code/2020/day-02)

(defun read-inputs ()
  (flet ((parse-line (line)
           (destructuring-bind (n1 n2 s password)
               (uiop:split-string (remove #\: (substitute #\Space #\- line)))
             (list (parse-integer n1)
                   (parse-integer n2)
                   (coerce s 'character)
                   password))))
    (mapcar #'parse-line (puzzle-file->lines "2020/data/02.txt"))))

(defun day-02/p1 ()
  (loop for (min max char string) in (read-inputs)
        count (<= min
                  (loop for c across string
                        count (char= c char))
                  max)))

(defun day-02/p2 ()
  (loop for (i1 i2 char string) in (read-inputs)
        count (= (loop for i in (list (1- i1) (1- i2))
                       count (char= (char string i) char))
                 1)))

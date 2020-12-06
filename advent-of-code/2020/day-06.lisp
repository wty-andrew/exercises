(uiop:define-package #:advent-of-code/2020/day-06
  (:use #:cl #:aoc-utils)
  (:export #:day-06/p1 #:day-06/p2))

(in-package #:advent-of-code/2020/day-06)

(defun read-group-answers ()
  (let ((group-answers nil)
        (current nil))
    (dolist (line (puzzle-file->lines "2020/data/06.txt"))
      (if (string= line "")
          (progn
            (push (nreverse current) group-answers)
            (setf current nil))
          (push line current)))
    (push (nreverse current) group-answers)
    (nreverse group-answers)))

(defun day-06/p1 ()
  (let ((sum 0))
    (dolist (group-answer (read-group-answers) sum)
      (let ((unique-answers nil))
        (dolist (person-answer group-answer)
          (loop for answer across person-answer
                do (pushnew answer unique-answers)))
        (incf sum (length unique-answers))))))

(defun day-06/p2 ()
  (let ((sum 0))
    (dolist (group-answer (read-group-answers) sum)
      (let ((counter (make-array 26 :element-type 'fixnum)))
        (dolist (person-answer group-answer)
          (loop for c across person-answer
                do (incf (aref counter (- (char-code c) 97)))))
        (incf sum (loop for c across counter
                        count (= c (length group-answer))))))))

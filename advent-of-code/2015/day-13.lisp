(uiop:define-package #:advent-of-code/2015/day-13
  (:use #:cl #:aoc-utils)
  (:export #:day-13/p1 #:day-13/p2))

(in-package #:advent-of-code/2015/day-13)

(defparameter *graph* nil)

(defun parse (line)
  (let* ((words (uiop:split-string (subseq line 0 (1- (length line)))))
         (person1 (read-from-string (first words)))
         (person2 (read-from-string (car (last words))))
         (happiness (* (if (string= (third words) "gain") 1 -1)
                       (read-from-string (fourth words)))))
    (values person1 person2 happiness)))

(defun build-graph ()
  (let ((lines (puzzle-file->lines "2015/data/13.txt"))
        (graph (make-graph)))
    (dolist (line lines graph)
      (multiple-value-bind (p1 p2 happiness) (parse line)
        (add-edge graph p1 p2 happiness)))))

(defun happiness (p1 p2)
  (weight *graph* p1 p2))

(defun calculate-happiness (seats)
  (let ((rotate-left (append (cdr seats) (list (car seats))))
        (rotate-right (append (last seats) (butlast seats))))
    (+ (reduce #'+ (mapcar #'happiness seats rotate-left))
       (reduce #'+ (mapcar #'happiness seats rotate-right)))))

(defun day-13/p1 ()
  (let* ((*graph* (build-graph))
         (people (graph-vertices *graph*))
         (seats (permutations people)))
    (apply #'max (mapcar #'calculate-happiness seats))))

(defun day-13/p2 ()
  (let* ((*graph* (build-graph))
         (people (graph-vertices *graph*))
         (self 'me))
    (dolist (person people)
      (add-edge *graph* person self 0)
      (add-edge *graph* self person 0))
    (reduce #'max (mapcar #'calculate-happiness (permutations (cons self people))))))

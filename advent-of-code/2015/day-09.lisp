(uiop:define-package #:advent-of-code/2015/day-09
  (:use #:cl #:aoc-utils)
  (:export #:day-09/p1 #:day-09/p2))

(in-package #:advent-of-code/2015/day-09)

(defparameter *graph* nil)

(defun build-graph ()
  (let ((forms (puzzle-file->forms "2015/data/09.txt"))
        (graph (make-graph)))
    (dolist (form forms)
      (destructuring-bind (from to distance)
          (mapcar #'cdr (match '(?from to ?to = ?dist) form))
        (add-edge graph from to distance)
        (add-edge graph to from distance)))
    graph))

(defun distance (city1 city2)
  (weight *graph* city1 city2))

(defun route-cost (route)
  "Return the total distance of the route, a route is a list of cities."
  (loop for city1 in route
        for city2 in (cdr route)
        sum (distance city1 city2)))

(defun day-09/p1 ()
  (let* ((*graph* (build-graph))
         (cities (graph-vertices *graph*))
         (routes (permutations cities)))
    (apply #'min (mapcar #'route-cost routes))))

(defun day-09/p2 ()
  (let* ((*graph* (build-graph))
         (cities (graph-vertices *graph*))
         (routes (permutations cities)))
    (apply #'max (mapcar #'route-cost routes))))

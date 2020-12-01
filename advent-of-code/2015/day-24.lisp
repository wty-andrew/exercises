(uiop:define-package #:advent-of-code/2015/day-24
  (:use #:cl #:aoc-utils)
  (:export #:day-24/p1 #:day-24/p2))

(in-package #:advent-of-code/2015/day-24)

(defun all-weight-groups (weights target)
  "Return all different ways to pick numbers from given weights that sum up to target, assume
no duplicate weights and weights are in ascending order."
  (cond ((or (null weights) (> (car weights) target)) nil)
        ((= (car weights) target) (list (list (car weights))))
        (t (append (mapcar (lambda (xs) (cons (car weights) xs))
                           (all-weight-groups (cdr weights) (- target (car weights))))
                   (all-weight-groups (cdr weights) target)))))

(defun quantum-entanglement (weights)
  (reduce #'* weights))

(defun keep-shortest-lists (lists)
  (let ((min-length (length (car lists)))
        (result (list (car lists))))
    (dolist (lst (cdr lists) result)
      (let ((length (length lst)))
        (cond ((< length min-length) (setf min-length length
                                           result (list lst)))
              ((= length min-length) (push lst result))
              (t nil))))))

(defun find-qe (weights num-groups)
  (let* ((target (/ (reduce #'+ weights) num-groups))
         (groups (keep-shortest-lists (all-weight-groups weights target)))
         (min-qe most-positive-fixnum))
    (labels ((solution-exist-p (weights)
               (or (= (reduce #'+ weights) target)
                   (some (lambda (group) (solution-exist-p (set-difference weights group)))
                         (all-weight-groups weights target)))))
      (dolist (group groups min-qe)
        (when (solution-exist-p (set-difference weights group))
          (setf min-qe (min (quantum-entanglement group) min-qe)))))))

(defun read-weights ()
  (mapcar #'car (puzzle-file->forms "2015/data/24.txt")))

(defun day-24/p1 ()
  (find-qe (read-weights) 3))

(defun day-24/p2 ()
  (find-qe (read-weights) 4))

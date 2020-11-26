(uiop:define-package #:advent-of-code/2015/day-21
  (:use #:cl #:aoc-utils)
  (:export #:day-21/p1 #:day-21/p2))

(in-package #:advent-of-code/2015/day-21)

(defparameter *weapons* '(( 8 4 0)
                          (10 5 0)
                          (25 6 0)
                          (40 7 0)
                          (74 8 0)))

(defparameter *armors* '(( 13 0 1)
                         ( 31 0 2)
                         ( 53 0 3)
                         ( 75 0 4)
                         (102 0 5)))

(defparameter *rings* '(( 25 1 0)
                        ( 50 2 0)
                        (100 3 0)
                        ( 20 0 1)
                        ( 40 0 2)
                        ( 80 0 3)))

(defun sum-items (items)
  (when (consp items)
    (apply #'mapcar #'+ items)))

(defun possible-checkouts ()
  (let* ((weapons *weapons*)
         (armors (cons '(0 0 0) *armors*))
         (one-ring *rings*)
         (two-rings (mapcar #'sum-items
                            (remove-if (lambda (x)
                                         (equalp (car x) (cadr x)))
                                       (product *rings* *rings*))))
         (rings (append (list '(0 0 0)) one-ring two-rings)))
    (mapcar #'sum-items (product weapons armors rings))))

(defun hit-points (character)
  (first character))

(defun damage (character)
  (second character))

(defun armor (character)
  (third character))

(defun real-damage (character1 character2)
  (max 1 (- (damage character1) (armor character2))))

(defun win-game-p (player boss)
  (<= (ceiling (hit-points boss) (real-damage player boss))
      (ceiling (hit-points player) (real-damage boss player))))

(defun read-boss-stats ()
  (mapcar (lambda (line)
            (parse-integer (car (last (uiop:split-string line)))))
          (puzzle-file->lines "2015/data/21.txt")))

(defun day-21/p1 ()
  (let ((boss (read-boss-stats)))
    (loop for (cost damage armor) in (sort (possible-checkouts) #'< :key #'car)
          when (win-game-p (list 100 damage armor) boss)
            return cost)))

(defun day-21/p2 ()
  (let ((boss (read-boss-stats)))
    (loop for (cost damage armor) in (sort (possible-checkouts) #'> :key #'car)
          unless (win-game-p (list 100 damage armor) boss)
            return cost)))

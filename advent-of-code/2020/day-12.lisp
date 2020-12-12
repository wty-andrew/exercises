(uiop:define-package #:advent-of-code/2020/day-12
  (:use #:cl #:aoc-utils)
  (:export #:day-12/p1 #:day-12/p2))

(in-package #:advent-of-code/2020/day-12)

(defclass pose ()
  ((x :initarg :x)
   (y :initarg :y)
   (theta :initarg :theta)))

(defun make-pose (x y theta)
  (make-instance 'pose :x x :y y :theta theta))

(defun degree->radian (degree)
  (/ (* degree pi) 180))

(defun move! (object dx dy)
  (with-slots (x y) object
    (incf x dx)
    (incf y dy)))

(defun turn! (object degree)
  (with-slots (theta) object
    (incf theta (/ (* degree pi) 180))))

(defun rotate! (object angle)
  (with-slots (x y) object
    (let* ((theta (degree->radian angle))
           (cos (round (cos theta)))
           (sin (round (sin theta))))
      (psetf x (- (* cos x) (* sin y))
             y (+ (* sin x) (* cos y))))))

(defun manhattan-distance (obj)
  (with-slots (x y) obj
    (+ (abs x) (abs y))))

(defun read-instructions ()
  (mapcar (lambda (line)
            (cons (char line 0) (parse-integer (subseq line 1))))
          (puzzle-file->lines "2020/data/12.txt")))

(defun day-12/p1 ()
  (let ((ship (make-pose 0 0 0)))
    (flet ((follow-instruction (instruction)
             (destructuring-bind (action . value) instruction
               (case action
                 (#\N (move! ship 0 value))
                 (#\S (move! ship 0 (- value)))
                 (#\E (move! ship value 0))
                 (#\W (move! ship (- value) 0))
                 (#\L (turn! ship value))
                 (#\R (turn! ship (- value)))
                 (#\F (let ((theta (slot-value ship 'theta)))
                        (move! ship (round (* (cos theta) value)) (round (* (sin theta) value)))))))))
      (mapc #'follow-instruction (read-instructions)))
    (manhattan-distance ship)))

(defun day-12/p2 ()
  (let ((ship (make-pose 0 0 0))
        (waypoint (make-pose 10 1 0))) ; pose relatively to ship
    (flet ((follow-instruction (instruction)
             (destructuring-bind (action . value) instruction
               (case action
                 (#\N (move! waypoint 0 value))
                 (#\S (move! waypoint 0 (- value)))
                 (#\E (move! waypoint value 0))
                 (#\W (move! waypoint (- value) 0))
                 (#\L (rotate! waypoint value))
                 (#\R (rotate! waypoint (- value)))
                 (#\F (with-slots (x y) waypoint
                        (move! ship (* value x) (* value y))))))))
      (mapc #'follow-instruction (read-instructions)))
    (manhattan-distance ship)))

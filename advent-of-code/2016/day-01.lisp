(uiop:define-package #:advent-of-code/2016/day-01
  (:use #:cl #:aoc-utils)
  (:export #:day-01/p1 #:day-01/p2))

(in-package #:advent-of-code/2016/day-01)

(defun read-instructions ()
  (mapcar (lambda (s)
            (cons (char s 0) (parse-integer (subseq s 1))))
          (uiop:split-string (remove #\, (puzzle-file->string "2016/data/01.txt")))))

(defclass pose ()
  ((x :initarg :x)
   (y :initarg :y)
   (heading :initarg :heading)))

(defun make-pose (x y heading)
  (make-instance 'pose :x x :y y :heading heading))

(defun copy-pose (pose)
  (with-slots (x y heading) pose
    (make-pose x y heading)))

(defun turn (pose direction)
  (let ((new-pose (copy-pose pose)))
    (with-slots (heading) new-pose
      (setf heading
            (mod (+ heading (if (char= direction #\L) 1 -1)) 4)))
    new-pose))

(defun move (pose steps)
  (let ((new-pose (copy-pose pose)))
    (with-slots (x y) new-pose
      (case (slot-value pose 'heading)
        (0 (incf y steps))
        (1 (decf x steps))
        (2 (decf y steps))
        (3 (incf x steps))))
    new-pose))

(defun follow-instruction (pose instruction)
  (destructuring-bind (direction . steps) instruction
    (move (turn pose direction) steps)))

(defun manhattan-distance (vec)
  (loop for val across vec
        sum (abs val)))

(defun range (start end)
  (if (> start end)
      (loop for x from start above end
            collect x)
      (loop for x from start below end
            collect x)))

(defun intermediate-positions (start-pose end-pose)
  (with-slots ((start-x x) (start-y y)) start-pose
    (with-slots ((end-x x) (end-y y)) end-pose
      (cond ((= start-x end-x)
             (loop with x = start-x
                   for y in (range start-y end-y)
                   collect (vector x y)))
            ((= start-y end-y)
             (loop with y = start-y
                   for x in (range start-x end-x)
                   collect (vector x y)))))))

(defun day-01/p1 ()
  (let ((pose (make-pose 0 0 0)))
    (dolist (instruction (read-instructions))
      (setf pose (follow-instruction pose instruction)))
    (with-slots (x y) pose
      (manhattan-distance (vector x y)))))

(defun day-01/p2 ()
  (let ((visited (make-hash-table :test 'equalp))
        (pose (make-pose 0 0 0)))
    (dolist (instruction (read-instructions))
      (let ((new-pose (follow-instruction pose instruction)))
        (loop for pos in (intermediate-positions pose new-pose)
              do (if (gethash pos visited)
                     (return-from day-01/p2 (manhattan-distance pos))
                     (setf (gethash pos visited) t)))
        (setf pose new-pose)))))

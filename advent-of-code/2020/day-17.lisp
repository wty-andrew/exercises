(uiop:define-package #:advent-of-code/2020/day-17
  (:use #:cl #:aoc-utils)
  (:export #:day-17/p1 #:day-17/p2))

(in-package #:advent-of-code/2020/day-17)

(defun make-position (x y z &optional (w 0))
  (vector x y z w))

(defun read-init-state ()
  (let ((state (make-hash-table :test 'equalp)))
    (loop for line in (puzzle-file->lines "2020/data/17.txt")
          for y from 0
          do (loop for c across line
                   for x from 0
                   when (char= c #\#)
                     do (setf (gethash (make-position x y 0) state) t))
          finally (return state))))

(defun neighbors-3d (pos)
  (let ((x (svref pos 0))
        (y (svref pos 1))
        (z (svref pos 2))
        (positions nil))
    (dolist (dx '(-1 0 1) positions)
      (dolist (dy '(-1 0 1))
        (dolist (dz '(-1 0 1))
          (when (or (/= dx 0) (/= dy 0) (/= dz 0))
            (push (make-position (+ x dx) (+ y dy) (+ z dz)) positions)))))))

(defun neighbors-4d (pos)
  (let ((x (svref pos 0))
        (y (svref pos 1))
        (z (svref pos 2))
        (w (svref pos 3))
        (positions nil))
    (dolist (dx '(-1 0 1) positions)
      (dolist (dy '(-1 0 1))
        (dolist (dz '(-1 0 1))
          (dolist (dw '(-1 0 1))
            (when (or (/= dx 0) (/= dy 0) (/= dz 0) (/= dw 0))
              (push (make-position (+ x dx) (+ y dy) (+ z dz) (+ w dw)) positions))))))))

(defun tick (state neighbors-fn)
  (let ((new-state (make-hash-table :test 'equalp)))
    (dolist (active-position (hash-table-keys state) new-state)
      (dolist (current (cons active-position (funcall neighbors-fn active-position)))
        (let ((is-active (gethash current state))
              (count (loop for neighbor in (funcall neighbors-fn current)
                           count (gethash neighbor state))))
          (when (or (and is-active (<= 2 count 3))
                    (and (not is-active) (= count 3)))
            (setf (gethash current new-state) t)))))))

(defun day-17/p1 ()
  (do ((count 6 (1- count))
       (state (read-init-state) (tick state #'neighbors-3d)))
      ((= count 0) (hash-table-count state))))

(defun day-17/p2 ()
  (do ((count 6 (1- count))
       (state (read-init-state) (tick state #'neighbors-4d)))
      ((= count 0) (hash-table-count state))))

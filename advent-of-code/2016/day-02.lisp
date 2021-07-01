(uiop:define-package #:advent-of-code/2016/day-02
  (:use #:cl #:aoc-utils)
  (:export #:day-02/p1 #:day-02/p2))

(in-package #:advent-of-code/2016/day-02)

(defun read-instructions ()
  (puzzle-file->lines "2016/data/02.txt"))

(defun make-position (x y)
  (cons x y))

(defun x (position)
  (car position))

(defun y (position)
  (cdr position))

(defun key-at (keypad x y)
  (aref keypad y x))

(defun valid-key-p (key)
  (not (eq key 0)))

(defun follow (keypad start moves)
  (let ((x (x start))
        (y (y start)))
    (flet ((movable-p (x y) (valid-key-p (key-at keypad x y))))
      (loop for move across moves
            do (ecase move
                 (#\U (when (movable-p x (1- y)) (decf y)))
                 (#\D (when (movable-p x (1+ y)) (incf y)))
                 (#\L (when (movable-p (1- x) y) (decf x)))
                 (#\R (when (movable-p (1+ x) y) (incf x))))
            finally (return (make-position x y))))))

(defun solve (keypad init-position instructions)
  (let ((position init-position))
    (loop for moves in instructions
          do (setf position (follow keypad position moves))
          collect (key-at keypad (x position) (y position)))))

(defun day-02/p1 ()
  (solve (make-array '(5 5) :initial-contents '((0 0 0 0 0)
                                                (0 1 2 3 0)
                                                (0 4 5 6 0)
                                                (0 7 8 9 0)
                                                (0 0 0 0 0)))
         (make-position 2 2)
         (read-instructions)))

(defun day-02/p2 ()
  (solve (make-array '(7 7) :initial-contents '((0 0 0 0 0 0 0)
                                                (0 0 0 1 0 0 0)
                                                (0 0 2 3 4 0 0)
                                                (0 5 6 7 8 9 0)
                                                (0 0 A B C 0 0)
                                                (0 0 0 D 0 0 0)
                                                (0 0 0 0 0 0 0)))
         (make-position 1 3)
         (read-instructions)))

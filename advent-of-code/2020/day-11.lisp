(uiop:define-package #:advent-of-code/2020/day-11
  (:use #:cl #:aoc-utils)
  (:export #:day-11/p1 #:day-11/p2))

(in-package #:advent-of-code/2020/day-11)

(defun read-seat-layout ()
  (let* ((lines (puzzle-file->lines "2020/data/11.txt"))
         (height (length lines))
         (width (length (car lines)))
         (layout (make-array (list height width))))
    (loop for line in lines
          for y from 0
          do (loop for c across line
                   for x from 0
                   do (setf (aref layout y x)
                            (case c
                              (#\. 'floor)
                              (#\L 'empty)
                              (#\# 'occupied))))
          finally (return layout))))

(defun tick (layout state-transition)
  (let* ((dimensions (array-dimensions layout))
         (copy (make-array dimensions))
         (changed nil))
    (destructuring-bind (height width) dimensions
      (dotimes (x width)
        (dotimes (y height)
          (let ((current (aref layout y x))
                (next (funcall state-transition layout x y)))
            (setf (aref copy y x) next)
            (when (not (eq current next))
              (setf changed t))))))
    (if changed copy layout)))

(defun boundary-check (array)
  (destructuring-bind (height width) (array-dimensions array)
    (lambda (x y) (and (< -1 x width) (< -1 y height)))))

(defun total-occupied (layout)
  (loop for i below (array-total-size layout)
        count (eq (row-major-aref layout i) 'occupied)))

(defun calculate-final-occupied-seats (init-layout state-transition)
  (do ((current nil next)
       (next init-layout (tick next state-transition)))
      ((eq next current) (total-occupied current))))

(defun day-11/p1 ()
  (let* ((init-layout (read-seat-layout))
         (in-bound (boundary-check init-layout)))
    (labels ((count-occupied-neighbors (layout x y)
               (loop for (dx dy) in '((-1 -1) (-1 0) (-1 1) (0 -1) (0 1) (1 -1) (1 0) (1 1))
                     when (funcall in-bound (+ x dx) (+ y dy))
                       count (eq (aref layout (+ y dy) (+ x dx)) 'occupied)))
             (state-transition (layout x y)
               (let ((current (aref layout y x))
                     (occupied-neighbors (count-occupied-neighbors layout x y)))
                 (case current
                   (empty (if (= occupied-neighbors 0) 'occupied 'empty))
                   (occupied (if (>= occupied-neighbors 4) 'empty 'occupied))
                   (floor 'floor)))))
      (calculate-final-occupied-seats init-layout #'state-transition))))

(defun day-11/p2 ()
  (let* ((init-layout (read-seat-layout))
         (in-bound (boundary-check init-layout)))
    (labels ((first-occupied-p (layout x y dx dy)
               (do ((x (+ x dx) (+ x dx))
                    (y (+ y dy) (+ y dy)))
                   ((not (funcall in-bound x y)) nil)
                 (case (aref layout y x)
                   (empty (return nil))
                   (occupied (return t)))))
             (count-occupied-neighbors (layout x y)
               (loop for (dx dy) in '((-1 -1) (-1 0) (-1 1) (0 -1) (0 1) (1 -1) (1 0) (1 1))
                     count (first-occupied-p layout x y dx dy)))
             (state-transition (layout x y)
               (let ((current (aref layout y x))
                     (occupied-neighbors (count-occupied-neighbors layout x y)))
                 (case current
                   (empty (if (= occupied-neighbors 0) 'occupied 'empty))
                   (occupied (if (>= occupied-neighbors 5) 'empty 'occupied))
                   (floor 'floor)))))
      (calculate-final-occupied-seats init-layout #'state-transition))))

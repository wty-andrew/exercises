(uiop:define-package #:advent-of-code/2015/day-18
  (:use #:cl #:aoc-utils)
  (:export #:day-18/p1 #:day-18/p2))

(in-package #:advent-of-code/2015/day-18)

(defun load-grid ()
  (let* ((string (remove #\Newline (puzzle-file->string "2015/data/18.txt")))
         (grid (make-array (list 100 100) :element-type 'bit :initial-element 0)))
    (dotimes (i (array-total-size grid) grid)
      (when (char= #\# (char string i))
        (setf (row-major-aref grid i) 1)))))

(defun tick (grid)
  (let* ((dimensions (array-dimensions grid))
         (copy (make-array dimensions :element-type 'bit)))
    (destructuring-bind (height width) dimensions
      (labels ((in-bound (x y) (and (< -1 x width) (< -1 y height)))
               (light-on-p (x y) (= (aref grid y x) 1))
               (on-neighbors-count (x y)
                 (loop for (dx dy) in '((-1 -1) (-1 0) (-1 1) (0 -1) (0 1) (1 -1) (1 0) (1 1))
                       count (and (in-bound (+ x dx) (+ y dy))
                                  (or (/= dx 0) (/= dy 0))
                                  (light-on-p (+ x dx) (+ y dy))))))
        (dotimes (x width copy)
          (dotimes (y height)
            (let ((on-neighbors (on-neighbors-count x y)))
              (if (light-on-p x y)
                  (setf (aref copy y x) (if (<= 2 on-neighbors 3) 1 0))
                  (setf (aref copy y x) (if (= on-neighbors 3) 1 0))))))))))

(defun count-lights-on (grid)
  (loop for i from 0 below (array-total-size grid)
        count (= (row-major-aref grid i) 1)))

(defun day-18/p1 ()
  (let ((grid (load-grid)))
    (dotimes (_ 100 (count-lights-on grid))
      (setf grid (tick grid)))))

(defun day-18/p2 ()
  (let ((grid (load-grid)))
    (destructuring-bind (height width) (array-dimensions grid)
      (flet ((turn-corners-on ()
               (setf (aref grid 0 0) 1
                     (aref grid 0 (1- width)) 1
                     (aref grid (1- height) 0) 1
                     (aref grid (1- height) (1- width)) 1)))
        (dotimes (_ 100 (count-lights-on grid))
          (setf grid (tick grid))
          (turn-corners-on))))))

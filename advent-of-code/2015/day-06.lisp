(uiop:define-package #:advent-of-code/2015/day-06
  (:use #:cl #:aoc-utils)
  (:export #:day-06/p1 #:day-06/p2))

(in-package #:advent-of-code/2015/day-06)

(defparameter *pattern* '(?x1 ?y1 through ?x2 ?y2))

(defun parse (string)
  "Return the action and the coordinates."
  (flet ((to-coords (s) ; "x1,y1 through x2,y2" -> '(x1 y1 x2 y2)
           (mapcar #'cdr (match *pattern* (str->form (substitute #\Space #\, s))))))
    (cond ((search "toggle" string)
           (values 'toggle (to-coords (subseq string 7))))
          ((search "turn off" string)
           (values 'turn-off (to-coords (subseq string 9))))
          ((search "turn on" string)
           (values 'turn-on (to-coords (subseq string 8)))))))

(defun day-06/p1 ()
  (let ((input (puzzle-file->lines "2015/data/06.txt"))
        (grid (make-array '(1000 1000) :element-type 'fixnum))
        (total 0))
    (labels ((toggle (x y) (setf (aref grid y x) (- 1 (aref grid y x))))
             (turn-off (x y) (setf (aref grid y x) 0))
             (turn-on (x y) (setf (aref grid y x) 1))
             (change-lights (action x1 y1 x2 y2)
               (loop for x from x1 upto x2
                     do (loop for y from y1 upto y2
                              do (funcall action x y)))))
      (dolist (string input)
        (multiple-value-bind (action coords) (parse string)
          (case action
            (toggle (apply #'change-lights #'toggle coords))
            (turn-off (apply #'change-lights #'turn-off coords))
            (turn-on (apply #'change-lights #'turn-on coords)))))
      (dotimes (i (array-total-size grid) total)
        (incf total (row-major-aref grid i))))))

(defun day-06/p2 ()
  (let ((input (puzzle-file->lines "2015/data/06.txt"))
        (grid (make-array '(1000 1000) :element-type 'fixnum))
        (total 0))
  (labels ((toggle (x y) (incf (aref grid y x) 2))
           (turn-off (x y) (setf (aref grid y x) (max 0 (1- (aref grid y x)))))
           (turn-on (x y) (incf (aref grid y x)))
           (change-lights (action x1 y1 x2 y2)
             (loop for x from x1 upto x2
                   do (loop for y from y1 upto y2
                            do (funcall action x y)))))
    (dolist (string input)
      (multiple-value-bind (action coords) (parse string)
        (case action
          (toggle (apply #'change-lights #'toggle coords))
          (turn-off (apply #'change-lights #'turn-off coords))
          (turn-on (apply #'change-lights #'turn-on coords)))))
    (dotimes (i (array-total-size grid) total)
      (incf total (row-major-aref grid i))))))

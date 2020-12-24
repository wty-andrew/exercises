(uiop:define-package #:advent-of-code/2020/day-24
  (:use #:cl #:aoc-utils)
  (:export #:day-24/p1 #:day-24/p2))

(in-package #:advent-of-code/2020/day-24)

(defstruct (coordinate (:constructor make-coordinate (x y))
                       (:conc-name coord-)
                       (:type vector))
  (x 0 :type integer)
  (y 0 :type integer))

(defun move (coord dx dy)
  (let ((x (coord-x coord))
        (y (coord-y coord)))
    (make-coordinate (+ x dx) (+ y dy))))

(defun move-direction (coord direction)
  (case direction
    (e (move coord 1 0))
    (se (move coord 1 -1))
    (sw (move coord 0 -1))
    (w (move coord -1 0))
    (nw (move coord -1 1))
    (ne (move coord 0 1))))

(defun neighbors (coord)
  (loop for dir in '(e se sw w nw ne)
        collect (move-direction coord dir)))

(defun count-black-tiles (tiles)
  (loop for val in (hash-table-values tiles)
        count val))

(defun read-instructions ()
  (labels ((chars->symbol (chars)
             (read-from-string (coerce chars 'string)))
           (aux (chars acc)
             (cond ((null chars) (reverse acc))
                   ((member (first chars) '(#\s #\n))
                    (aux (cddr chars) (cons (chars->symbol (subseq chars 0 2)) acc)))
                   (t (aux (cdr chars) (cons (chars->symbol (list (car chars))) acc))))))
    (mapcar (lambda (line) (aux (coerce line 'list) nil))
            (puzzle-file->lines "2020/data/24.txt"))))

(defun setup-tiles ()
  "Return a hash table using coordinate/boolean as key/value, the boolean indicates
if the tile is black or not."
  (let ((tiles (make-hash-table :test 'equalp)))
    (dolist (instruction (read-instructions) tiles)
      (let ((coord (make-coordinate 0 0)))
        (dolist (direction instruction)
          (setf coord (move-direction coord direction)))
        (setf (gethash coord tiles) (not (gethash coord tiles)))))))

(defun get-bounds (coords)
  (let ((min-x most-positive-fixnum)
        (max-x most-negative-fixnum)
        (min-y most-positive-fixnum)
        (max-y most-negative-fixnum))
    (loop for coord in coords
          do (let ((x (coord-x coord))
                   (y (coord-y coord)))
               (when (< x min-x)
                 (setf min-x x))
               (when (> x max-x)
                 (setf max-x x))
               (when (< y min-y)
                 (setf min-y y))
               (when (> y max-y)
                 (setf max-y y)))
          finally (return (values min-x max-x min-y max-y)))))

(defun day-24/p1 ()
  (count-black-tiles (setup-tiles)))

(defun day-24/p2 ()
  (let* ((tiles (setup-tiles))
         (coords (hash-table-keys tiles)))
    (macrolet ((tile-at (coord) `(gethash ,coord tiles)))
      (labels ((should-flip-p (coord)
                 (let* ((black-p (tile-at coord))
                        (black-neighbors (loop for neighbor in (neighbors coord)
                                               count (tile-at neighbor))))
                   (if black-p
                       (or (= black-neighbors 0) (> black-neighbors 2))
                       (= black-neighbors 2))))
               (collect-to-flip-coords (min-x max-x min-y max-y)
                 (loop for x from (1- min-x) upto (1+ max-x)
                       nconc (loop for y from (1- min-y) upto (1+ max-y)
                                   for coord = (make-coordinate x y)
                                   when (should-flip-p coord)
                                     collect coord))))
        (multiple-value-bind (min-x max-x min-y max-y) (get-bounds coords)
          (dotimes (_ 100 (count-black-tiles tiles))
            (declare (ignorable _))
            (mapc (lambda (coord) (setf (tile-at coord) (not (tile-at coord))))
                  (collect-to-flip-coords min-x max-x min-y max-y))
            (setf min-x (1- min-x) max-x (1+ max-x) min-y (1- min-y) max-y (1+ max-y))))))))

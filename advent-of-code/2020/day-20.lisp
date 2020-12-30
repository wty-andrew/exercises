(uiop:define-package #:advent-of-code/2020/day-20
  (:use #:cl #:aoc-utils)
  (:export #:day-20/p1 #:day-20/p2))

(in-package #:advent-of-code/2020/day-20)

(defun read-tiles ()
  (let ((tile-table (make-hash-table))
        (tile->borders (make-hash-table))
        (border->tiles (make-hash-table))
        (lines (puzzle-file->lines "2020/data/20.txt")))
    (labels ((char->bit (c) (if (char= #\. c) 0 1))
             (bits->int (bits) (reduce (lambda (acc b) (+ (ash acc 1) b)) bits))
             (parse-borders (lines)
               (let* ((top (map 'list #'char->bit (first lines)))
                      (bottom (map 'list #'char->bit (tenth lines)))
                      (right (loop for line in lines
                                   collect (char->bit (char line 9))))
                      (left (loop for line in lines
                                  collect (char->bit (char line 0))))
                      (front (list top right bottom left))
                      (flipped (mapcar #'reverse front)))
                 (mapcar #'bits->int (nconc front flipped))))
             (parse-block (lines)
               (let* ((tile-id (parse-integer (remove-if-not #'digit-char-p (car lines))))
                      (tile (make-array '(8 8) :element-type 'bit)))
                 (loop for line in (subseq lines 2 10)
                       for y from 0
                       do (loop for c across (subseq line 1 9)
                                for x from 0
                                do (setf (aref tile y x) (char->bit c))))
                 (values tile-id (parse-borders (subseq lines 1 11)) tile))))
      (do ((lines lines (nthcdr 12 lines)))
          ((null lines) (values border->tiles tile->borders tile-table))
        (multiple-value-bind (tile-id borders tile) (parse-block lines)
          (setf (gethash tile-id tile->borders) borders
                (gethash tile-id tile-table) tile)
          (dolist (border-id borders)
            (push tile-id (gethash border-id border->tiles))))))))

(defparameter *orientations*
  '((0 1 2 3)
    (7 0 5 2) ; rotate 90
    (6 7 4 5) ; rotate 180
    (1 6 3 4) ; rotate 270
    (2 5 0 7) ; vertical flip
    (3 2 1 0) ; vertical flip + rotate 90
    (4 3 6 1) ; vertical flip + rotate 180
    (5 4 7 6) ; vertical flip + rotate 270
    ))

(defun rotate (array)
  "Return a 90 degrees clockwise rotated array."
  (destructuring-bind (height width) (array-dimensions array)
    (let ((new (make-array (list width height) :element-type (array-element-type array))))
      (dotimes (y height new)
        (dotimes (x width)
          (setf (aref new x (- height y 1)) (aref array y x)))))))

(defun vertical-flip (array)
  "Return a vertical flipped array."
  (destructuring-bind (height width) (array-dimensions array)
    (let ((new (make-array (list height width) :element-type (array-element-type array))))
      (dotimes (y height new)
        (dotimes (x width)
          (setf (aref new (- height y 1) x) (aref array y x)))))))

(defun orient-array (array orientation)
  (when (> orientation 3)
    (setf array (vertical-flip array)))
  (dotimes (_ (mod orientation 4) array)
    (setf array (rotate array))))

(defun solve-puzzle (border->tiles tile->borders)
  (let ((size (isqrt (hash-table-count tile->borders))))
    (labels ((tiles-sort-by-constraint ()
               (let ((counter (mapcar (lambda (tile-id) (cons tile-id 0))
                                      (hash-table-keys tile->borders))))
                 (dolist (tile-ids (hash-table-values border->tiles))
                   (when (= (length tile-ids) 1)
                     (incf (cdr (assoc (car tile-ids) counter)))))
                 (mapcar #'car (sort counter #'> :key #'cdr))))
             (in-bound (x y) (and (<= 0 x (1- size)) (<= 0 y (1- size))))
             (borders (tile-id orientation)
               (let ((default (gethash tile-id tile->borders)))
                 (mapcar (lambda (i) (nth i default)) (nth orientation *orientations*))))
             (constraint (assigments idx)
               (multiple-value-bind (y x) (floor idx size)
                 (loop for (dx dy) in '((0 -1) (1 0) (0 1) (-1 0)) ; U R D L
                       for i in '(2 3 0 1) ; D L U R
                       for nbr-x = (+ x dx)
                       for nbr-y = (+ y dy)
                       collect (when (in-bound nbr-x nbr-y)
                                 (destructuring-bind (nbr-id . nbr-orientation)
                                     (aref assigments (+ nbr-x (* nbr-y size)))
                                   (and nbr-id (nth i (borders nbr-id nbr-orientation))))))))
             (match-constraint (constraint borders)
               (loop for c in constraint
                     for b in borders
                     always (or (null c) (= c b))))
             (find-candidates (assignments constraint)
               (let* ((assigned-tiles (loop for (tile-id . orientation) across assignments
                                            while tile-id
                                            collect tile-id))
                      (tile-candidates (remove-duplicates (apply #'append (mapcar (lambda (id)
                                                                                    (gethash id border->tiles))
                                                                                  (remove nil constraint))))))
                 (loop for tile-id in (set-difference tile-candidates assigned-tiles)
                       nconc (loop for orientation below 8
                                   when (match-constraint constraint (borders tile-id orientation))
                                     collect (cons tile-id orientation)))))
             (solve (assignments index)
               (let ((candidates (find-candidates assignments (constraint assignments index))))
                 (dolist (candidate candidates)
                   (let ((copy (copy-seq assignments)))
                     (setf (svref copy index) candidate)
                     (if (= index (1- (* size size)))
                         (return-from solve-puzzle copy)
                         (solve copy (1+ index))))))))
      (dolist (tile-id (tiles-sort-by-constraint))
        (dotimes (orientation 8)
          (let ((assignments (make-array (* size size) :initial-element (cons nil nil))))
            (setf (svref assignments 0) (cons tile-id orientation))
            (solve assignments 1)))))))

(defun put-together (tiles)
  (let ((size (isqrt (length tiles))))
    (loop with image = (make-array (list (* size 8) (* size 8)) :element-type 'bit)
          for tile in tiles
          for idx from 0
          do (multiple-value-bind (j i) (floor idx size)
               (dotimes (x 8)
                 (dotimes (y 8)
                   (setf (aref image (+ y (* j 8)) (+ x (* i 8))) (aref tile y x)))))
          finally (return image))))

(defun count-patterns (pattern array)
  (destructuring-bind (height width) (array-dimensions array)
    (destructuring-bind (pat-height pat-width) (array-dimensions pattern)
      (let ((locations (loop for y below pat-height
                             nconc (loop for x below pat-width
                                         when (= (aref pattern y x) 1)
                                           collect (cons x y)))))
        (loop for y upto (- height pat-height)
              sum (loop for x upto (- width pat-width)
                        count (loop for (dx . dy) in locations
                                    always (= (aref array (+ y dy) (+ x dx)) 1))))))))

(defun count-ones (array)
  (loop for i below (array-total-size array)
        count (= (row-major-aref array i) 1)))

(defun day-20/p1 ()
  (multiple-value-bind (border->tiles tile->borders _) (read-tiles)
    (declare (ignore _))
    (let* ((assignments (solve-puzzle border->tiles tile->borders))
           (size (isqrt (length assignments))))
      (apply #'* (mapcar (lambda (i) (car (svref assignments i)))
                         (list 0 (1- size) (* size (1- size)) (1- (* size size))))))))

(defun day-20/p2 ()
  (multiple-value-bind (border->tiles tile->borders tile-table) (read-tiles)
    (let* ((assignments (solve-puzzle border->tiles tile->borders))
           (tiles (loop for (tile-id . orientation) across assignments
                        collect (orient-array (gethash tile-id tile-table) orientation)))
           (image (put-together tiles))
           (pattern #2A((0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0)
                        (1 0 0 0 0 1 1 0 0 0 0 1 1 0 0 0 0 1 1 1)
                        (0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 0))))
      (dotimes (orientation 8)
        (let ((monsters (count-patterns (orient-array pattern orientation) image)))
          (when (> monsters 0)
            (return-from day-20/p2 (- (count-ones image) (* monsters (count-ones pattern))))))))))

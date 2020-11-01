(uiop:define-package #:advent-of-code/2015/day-14
  (:use #:cl #:aoc-utils)
  (:export #:day-14/p1 #:day-14/p2))

(in-package #:advent-of-code/2015/day-14)

(defun parse-reindeer (line)
  "Store the properties of a reindeer inside plist."
  (let* ((form (str->form (remove #\, line)))
         (reindeer (first form)))
    (with-props (speed fly-duration rest-duration) reindeer
      (setf speed (nth 3 form)
            fly-duration (nth 6 form)
            rest-duration (nth 13 form)))
    reindeer))

(defun travel-distance (reindeer seconds)
  (with-props (speed fly-duration rest-duration) reindeer
    (multiple-value-bind (quotient remainder)
        (floor seconds (+ fly-duration rest-duration))
      (* speed (+ (* fly-duration quotient) (min fly-duration remainder))))))

(defun make-history (reindeer seconds)
  "Store the position of the reindeer in every second in an array."
  (let ((history (make-array seconds :element-type 'fixnum))
        (current 0))
    (with-props (speed fly-duration rest-duration) reindeer
      (dotimes (i seconds history)
        (when (< (mod i (+ fly-duration rest-duration)) fly-duration)
          (incf current speed))
        (setf (aref history i) current)))))

(defun read-reindeers ()
  (mapcar #'parse-reindeer (puzzle-file->lines "2015/data/14.txt")))

(defun day-14/p1 ()
  (let ((reindeers (read-reindeers)))
    (reduce #'max (mapcar (lambda (reindeer)
                            (funcall #'travel-distance reindeer 2503))
                          reindeers))))

(defun day-14/p2 ()
  (let* ((reindeers (read-reindeers))
         (scores (make-array (length reindeers) :initial-element 0))
         (seconds 2503)
         (histories (mapcar (lambda (reindeer)
                              (funcall #'make-history reindeer seconds))
                            reindeers)))
    (flet ((winner-indices-at (second)
             (let* ((positions (mapcar (lambda (history)
                                         (aref history second))
                                       histories))
                    (max-dist (apply #'max positions)))
               (positions max-dist positions))))
      (dotimes (sec seconds)
        (dolist (idx (winner-indices-at sec))
          (incf (aref scores idx)))))
    (loop for score across scores
          maximize score)))

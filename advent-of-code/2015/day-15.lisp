(uiop:define-package #:advent-of-code/2015/day-15
  (:use #:cl #:aoc-utils)
  (:export #:day-15/p1 #:day-15/p2))

(in-package #:advent-of-code/2015/day-15)

(defparameter *properties* '(capacity durability flavor texture calories))

(defun remove-chars (string chars)
  (remove-if (lambda (c) (member c chars)) string))

(defun parse-ingredient (line)
  "Store the properties of an ingredient inside plist."
  (let* ((form (str->form (remove-chars line '(#\: #\,))))
         (ingredient (car form))
         (properties (cdr form)))
    (loop for (key value) on properties by #'cddr
          do (setf (get ingredient key) value)
          finally (return ingredient))))

(defun read-ingredients ()
  (mapcar #'parse-ingredient (puzzle-file->lines "2015/data/15.txt")))

(defun stars-and-bars (stars bins)
  "Return all possible ways to allocate n objects (stars) into k bins."
  (cond ((= bins 0) nil)
        ((= bins 1) (list (list stars)))
        (t (loop for i from stars downto 0
                 append (mapcar (lambda (lst) (cons i lst))
                                (stars-and-bars (- stars i) (1- bins)))))))

(defun total-score (recipe &optional (calories-constraint nil))
  "Return the score of the recipe, a recipe is an a-list of ingredient/spoons pairs."
  (flet ((score (property)
           (reduce #'+ (mapcar (lambda (pair)
                                 (* (get (car pair) property) (cdr pair)))
                               recipe))))
    (let ((scores (mapcar #'score *properties*)))
      (if (or (and calories-constraint
                   (/= (car (last scores)) 500))
              (some #'minusp scores))
          0
          (apply #'* (butlast scores))))))

(defun find-best-score (ingredients spoons score-fn)
  (multiple-value-bind (_ value)
      (find-best (lambda (alloc)
                   (funcall score-fn (mapcar #'cons ingredients alloc)))
                 (stars-and-bars spoons (length ingredients)))
    (declare (ignore _))
    value))

(defun day-15/p1 ()
  (let ((ingredients (read-ingredients)))
    (find-best-score ingredients 100 #'total-score)))

(defun day-15/p2 ()
  (let ((ingredients (read-ingredients)))
    (find-best-score ingredients 100 (lambda (recipe) (total-score recipe t)))))

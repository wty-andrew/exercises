(uiop:define-package #:advent-of-code/2015/day-16
  (:use #:cl #:aoc-utils)
  (:export #:day-16/p1 #:day-16/p2))

(in-package #:advent-of-code/2015/day-16)

(defparameter *aunts-sue*
  (pairlis '(children cats samoyeds pomeranians akitas vizslas goldfish trees cars perfumes)
           '(3 7 2 3 0 0 5 3 2 1)))

(defun lookup (key)
  (cdr (assoc key *aunts-sue*)))

(defun parse (line)
  (let* ((form (str->form (remove-chars line '(#\: #\,))))
         (id (second form))
         (plist (nthcdr 2 form)))
    (values id plist)))

(defun find-aunts-sue (test-fn)
  (dolist (line (puzzle-file->lines "2015/data/16.txt"))
    (multiple-value-bind (id plist) (parse line)
      (when (loop for (key value) on plist by #'cddr
                  always (funcall test-fn key value))
        (return id)))))

(defun day-16/p1 ()
  (find-aunts-sue (lambda (key value) (= (lookup key) value))))

(defun day-16/p2 ()
  (find-aunts-sue (lambda (key value)
                    (case key
                      ((cats trees) (> value (lookup key)))
                      ((pomeranians goldfish) (< value (lookup key)))
                      (otherwise (= (lookup key) value))))))

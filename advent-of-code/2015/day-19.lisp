(uiop:define-package #:advent-of-code/2015/day-19
  (:use #:cl #:aoc-utils)
  (:export #:day-19/p1 #:day-19/p2))

(in-package #:advent-of-code/2015/day-19)

(defun load-input ()
  (let* ((strings (puzzle-file->lines "2015/data/19.txt"))
         (conversions (mapcar (lambda (string)
                                (let ((items (uiop:split-string string)))
                                  (cons (first items) (third items))))
                              (butlast strings 2)))
         (molecule (car (last strings))))
    (values molecule conversions)))

(defun replace-substr (string substr index length)
  "Replace the content in string from index to index + length with substr."
  (uiop:strcat (subseq string 0 index)
               substr
               (subseq string (+ index length))))

(defun all-replacements (string old new)
  (let ((results nil))
    (labels ((aux (start)
               (let ((idx (search old string :start2 start)))
                 (when idx
                   (push (replace-substr string new idx (length old))
                         results)
                   (aux (1+ idx))))))
      (aux 0))
    results))

(defun day-19/p1 ()
  (multiple-value-bind (molecule conversions) (load-input)
    (let ((new-molecules nil))
      (dolist (conversion conversions (length new-molecules))
        (destructuring-bind (in . out) conversion
          (mapc (lambda (new) (pushnew new new-molecules :test #'string=))
                (all-replacements molecule in out)))))))

;; greedy approach taken from https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/
;; don't really gaurantee to get the best result :(
(defun day-19/p2 ()
  (multiple-value-bind (molecule conversions) (load-input)
    (let ((sorted-conversions (sort conversions (lambda (s1 s2)
                                                  (> (length s1) (length s2)))
                                    :key #'cdr))
          (steps 0))
      (do ()
          ((string= molecule "e") steps)
        (loop for (out . in) in sorted-conversions
              do (let ((idx (search in molecule)))
                   (when idx
                     (setf molecule (replace-substr molecule out idx (length in))
                           steps (1+ steps))
                     (return))))))))

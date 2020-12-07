(uiop:define-package #:advent-of-code/2020/day-07
  (:use #:cl #:aoc-utils)
  (:export #:day-07/p1 #:day-07/p2))

(in-package #:advent-of-code/2020/day-07)

(defun read-rules ()
  (let ((rules (make-hash-table)))
    (labels ((make-bag-name (adjective color)
               (read-from-string (uiop:strcat adjective "-" color)))
             (parse-content (tokens)
               (when (and tokens (not (string= (first tokens) "no")))
                 (destructuring-bind (n adj color) (subseq tokens 0 3)
                   (acons (make-bag-name adj color) (parse-integer n) (parse-content (nthcdr 4 tokens)))))))
      (dolist (line (puzzle-file->lines "2020/data/07.txt"))
        (destructuring-bind (adj color _1 _2 &rest tokens) (uiop:split-string line)
          (declare (ignore _1 _2))
          (setf (gethash (make-bag-name adj color) rules) (parse-content tokens)))))
    rules))

(defun day-07/p1 ()
  (let ((rules (read-rules)))
    (labels ((can-carry-p (bag)
               (if (eq bag 'shiny-gold)
                   t
                   (some #'can-carry-p (mapcar #'car (gethash bag rules))))))
      (loop for bag in (hash-table-keys rules)
            count (and (not (eq bag 'shiny-gold)) (can-carry-p bag))))))

(defun day-07/p2 ()
  (let ((rules (read-rules)))
    (labels ((num-sub-bags (bag)
               (if (null (gethash bag rules))
                   0
                   (loop for (sub-bag . n) in (gethash bag rules)
                         sum (+ (* n (num-sub-bags sub-bag)) n)))))
      (num-sub-bags 'shiny-gold))))

(uiop:define-package #:advent-of-code/2020/day-19
  (:use #:cl #:aoc-utils)
  (:export #:day-19/p1 #:day-19/p2))

(in-package #:advent-of-code/2020/day-19)

(defun read-rules-and-messages ()
  (let ((rules (make-hash-table))
        (messages nil))
    (flet ((parse-rule (string)
             (if (find #\" string)
                 (read-from-string (remove #\" string))
                 (mapcar #'str->form (uiop:split-string string :separator '(#\|))))))
      (dolist (line (puzzle-file->lines "2020/data/19.txt"))
        (cond ((= (length line) 0) nil)
              ((digit-char-p (char line 0))
               (destructuring-bind (id rule-string)
                   (uiop:split-string line :separator '(#\:))
                 (setf (gethash (parse-integer id) rules) (parse-rule rule-string))))
              ((alpha-char-p (char line 0))
               (push (loop for c across line
                           collect (read-from-string (string c)))
                     messages))
              (t nil))))
    (values rules (reverse messages))))

(defun count-matches (rules messages start-rule)
  (labels ((follow (path message)
             (cond ((and (null path) (null message)) t)
                   ((or (null path) (null message)) nil)
                   (t (destructuring-bind (key . rest-path) path
                        (let ((symbol-or-paths (gethash key rules)))
                          (if (symbolp symbol-or-paths)
                              (when (eq symbol-or-paths (car message))
                                (follow rest-path (cdr message)))
                              (loop for sub-path in symbol-or-paths
                                      thereis (follow (append sub-path rest-path) message)))))))))
    (loop for msg in messages
          count (follow (list start-rule) msg))))

(defun day-19/p1 ()
  (multiple-value-bind (rules messages) (read-rules-and-messages)
    (count-matches rules messages 0)))

(defun day-19/p2 ()
  (multiple-value-bind (rules messages) (read-rules-and-messages)
    (setf (gethash 8 rules) '((42) (42 8))
          (gethash 11 rules) '((42 31) (42 11 31)))
    (count-matches rules messages 0)))

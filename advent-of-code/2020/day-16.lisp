(uiop:define-package #:advent-of-code/2020/day-16
  (:use #:cl #:aoc-utils)
  (:export #:day-16/p1 #:day-16/p2))

(in-package #:advent-of-code/2020/day-16)

(defun read-puzzle ()
  (let ((rules (make-hash-table))
        (own-ticket nil)
        (nearby-tickets nil)
        (lines (puzzle-file->lines "2020/data/16.txt")))
    (labels ((split-by (substr string)
               (let ((i (search substr string)))
                 (list (subseq string 0 i) (subseq string (+ i (length substr))))))
             (parse-ticket (line) (mapcar #'parse-integer (uiop:split-string line :separator '(#\,))))
             (read-rule (line)
               (destructuring-bind (field valid-ranges) (split-by ": " line)
                 (let ((key (read-from-string (substitute #\- #\Space field)))
                       (value (mapcan (lambda (s)
                                        (mapcar #'parse-integer (uiop:split-string s :separator '(#\-))))
                                      (split-by " or " valid-ranges))))
                   (setf (gethash key rules) value))))
             (read-rules (lines)
               (let ((line (car lines)))
                 (if (string= line "")
                     (cddr lines)
                     (progn
                       (read-rule line)
                       (read-rules (cdr lines))))))
             (read-own-ticket (lines)
               (setf own-ticket (parse-ticket (car lines)))
               (cdddr lines))
             (read-nearby-tickets (lines)
               (setf nearby-tickets (mapcar #'parse-ticket lines))))
      (read-nearby-tickets (read-own-ticket (read-rules lines)))
      (values rules own-ticket nearby-tickets))))

(defun in-bound-p (ranges value)
  (destructuring-bind (l1 h1 l2 h2) ranges
    (or (<= l1 value h1) (<= l2 value h2))))

(defun invalid-p (ranges-list value)
  (loop for ranges in ranges-list
        never (in-bound-p ranges value)))

(defun day-16/p1 ()
  (multiple-value-bind (rules own-ticket nearby-tickets) (read-puzzle)
    (declare (ignorable own-ticket))
    (let ((ranges-list (hash-table-values rules)))
      (loop for ticket in nearby-tickets
            sum (loop for value in ticket
                      when (invalid-p ranges-list value)
                        sum value)))))

(defun day-16/p2 ()
  (multiple-value-bind (rules own-ticket nearby-tickets) (read-puzzle)
    (let* ((fields (hash-table-keys rules))
           (ranges-list (hash-table-values rules))
           (tickets (remove-if (lambda (ticket)
                                 (loop for value in ticket
                                         thereis (invalid-p ranges-list value)))
                               nearby-tickets))
           (domains (make-hash-table)))
      (dolist (field fields)
        (let* ((ranges (gethash field rules))
               (values (loop for i below (length fields)
                             when (every (lambda (ticket)
                                           (in-bound-p ranges (nth i ticket)))
                                         tickets)
                                 collect i)))
          (setf (gethash field domains) values)))
      (labels ((candidates (field) (gethash field domains))
               (no-duplicates-p (lst) (equal (remove-duplicates lst) lst))
               (constraint-check (field assignments)
                 (declare (ignore field))
                 (no-duplicates-p (hash-table-values assignments))))
        (let* ((sorted-variables (sort (hash-table-keys domains) #'<
                                       :key (lambda (field) (length (candidates field)))))
               (assignments (csp-backtracking sorted-variables #'candidates #'constraint-check)))
          (reduce #'* (loop for field being the hash-keys of assignments
                              using (hash-value idx)
                            when (search "DEPARTURE" (string field))
                              collect (nth idx own-ticket))))))))

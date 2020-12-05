(uiop:define-package #:advent-of-code/2020/day-04
  (:use #:cl #:aoc-utils)
  (:export #:day-04/p1 #:day-04/p2))

(in-package #:advent-of-code/2020/day-04)

(defun read-passports ()
  (let ((lines (puzzle-file->lines "2020/data/04.txt"))
        (passports nil)
        (current nil))
    (flet ((line->fields (line)
             (mapcar (lambda (s) (uiop:split-string s :separator '(#\:)))
                     (uiop:split-string line))))
      (dolist (line lines)
        (if (string= line "")
            (progn
              (push current passports)
              (setf current nil))
            (loop for (key value) in (line->fields line)
                  do (push (cons (read-from-string key) value) current))))
      (push current passports)
      passports)))

(defun no-missing-fields-p (passport)
  (or (= (length passport) 8)
      (and (= (length passport) 7) (null (assoc 'cid passport)))))

(defun all-fields-valid-p (passport)
  (flet ((valid-field-p (name value)
           (case name
             (byr (<= 1920 (parse-integer value) 2002))
             (iyr (<= 2010 (parse-integer value) 2020))
             (eyr (<= 2020 (parse-integer value) 2030))
             (hgt (let ((height (parse-integer (subseq value 0 (- (length value) 2))))
                        (unit (subseq value (- (length value) 2))))
                    (cond ((string= unit "cm") (<= 150 height 193))
                          ((string= unit "in") (<= 59 height 76))
                          (t nil))))
             (hcl (and (= (length value) 7)
                       (char= (char value 0) #\#)
                       (loop for c across (subseq value 1)
                             always (digit-char-p c 16))))
             (ecl (find value '("amb" "blu" "brn" "gry" "grn" "hzl" "oth") :test 'equal))
             (pid (and (= (length value) 9)
                       (loop for c across value
                             always (digit-char-p c))))
             (cid t))))
    (loop for (name . value) in passport
          always (valid-field-p name value))))


(defun day-04/p1 ()
  (loop for passport in (read-passports)
        count (no-missing-fields-p passport)))

(defun day-04/p2 ()
  (loop for passport in (read-passports)
        count (and (no-missing-fields-p passport)
                   (all-fields-valid-p passport))))

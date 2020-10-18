(uiop:define-package #:advent-of-code/2015/day-11
  (:use #:cl #:aoc-utils)
  (:export #:day-11/p1 #:day-11/p2))

(in-package #:advent-of-code/2015/day-11)

(defun next-char (char)
  (if (char= char #\z)
      #\a
      (code-char (1+ (char-code char)))))

(defun next-candidate (password)
  "Return the next possible password without forbidden chars (#\i, #\o, #\l)."
  (let ((pwd (copy-seq password)))
    (macrolet ((char-at (index)
                 `(char pwd ,index)))
      (labels ((inc-char-at (pos)
                 (when (and (>= pos 0) (char= (setf (char-at pos)
                                                    (next-char (char-at pos)))
                                              #\a))
                   (inc-char-at (1- pos)))))
        (inc-char-at (1- (length pwd)))
        (let ((pos (position-if (lambda (c) (find c "iol")) pwd)))
          (when pos
            (setf (char-at pos) (next-char (char-at pos)))
            (loop for i from (1+ pos) to (1- (length pwd))
                  do (setf (char-at i) #\a))))
        pwd))))

(defun contain-straight-sequence-p (string)
  "Test if string contains three successive characters."
  (dotimes (i (- (length string) 2) nil)
    (destructuring-bind (c1 c2 c3)
        (map 'list #'char-code (subseq string i (+ i 3)))
      (when (and (= c2 (1+ c1)) (= c3 (1+ c2)))
        (return-from contain-straight-sequence-p t)))))

(defun find-pairs (string &optional (start 0))
  "Return position and character of the first found character pairs in string."
  (when (< start (1- (length string)))
    (dotimes (i (- (length string) start 1) (values nil nil))
      (when (char= (char string (+ start i)) (char string (+ start i 1)))
        (return-from find-pairs (values (+ start i) (char string (+ start i))))))))

(defun contain-two-pairs (string)
  "Check if string contains two different, non-overlapping charater pairs."
  (labels ((find-second-pair (char1 start)
             (multiple-value-bind (pos char2) (find-pairs string start)
               (when pos
                 (or (not (char= char1 char2))
                     (find-second-pair char1 (+ pos 2)))))))
    (multiple-value-bind (pos char1) (find-pairs string)
      (when pos
        (find-second-pair char1 (+ pos 2))))))

(defun valid-password-p (password)
  (and (contain-straight-sequence-p password)
       (contain-two-pairs password)))

(defun day-11/p1 ()
  (do ((pwd (next-candidate "hepxcrrq") (next-candidate pwd)))
      ((valid-password-p pwd) pwd)))

(defun day-11/p2 ()
  (do ((pwd (next-candidate (day-11/p1)) (next-candidate pwd)))
      ((valid-password-p pwd) pwd)))

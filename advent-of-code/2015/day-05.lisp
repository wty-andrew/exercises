(uiop:define-package #:advent-of-code/2015/day-05
  (:use #:cl #:aoc-utils)
  (:export #:day-05/p1 #:day-05/p2))

(in-package #:advent-of-code/2015/day-05)

(defun day-05/p1 ()
  (let* ((strings (puzzle-file->lines "2015/data/05.txt"))
         (vowels "aeiou")
         (count 0))
    (labels ((enough-vowels-p (string)
               (let ((count 0))
                 (dotimes (i (length string) (>= count 3))
                   (when (find (char string i) vowels)
                     (incf count)))))
             (contain-successive-chars-p (string)
               (let ((prev (char string 0)))
                 (dotimes (i (1- (length string)))
                   (let ((curr (char string (1+ i))))
                     (when (char= prev curr)
                       (return-from contain-successive-chars-p t))
                     (setf prev curr)))))
             (contain-bad-strings-p (string)
               (some (lambda (s) (search s string))
                     (list "ab" "cd" "pq" "xy"))))
      (dolist (s strings count)
        (when (and (not (contain-bad-strings-p s))
                   (enough-vowels-p s)
                   (contain-successive-chars-p s))
          (incf count))))))

(defun day-05/p2 ()
  (let* ((input (puzzle-file->lines "2015/data/05.txt"))
         (count 0))
    (flet ((nice-string-p (string)
             (let* ((char-1 (char string 0))
                    (char-2 (char string 1))
                    (contain-same-pair nil)
                    (contain-triplet nil))
               (dotimes (i (- (length string) 2))
                 (let ((char-3 (char string (+ i 2))))
                   (when (and (not contain-same-pair)
                              (search (coerce `(,char-1 ,char-2) 'string)
                                      (subseq string (+ i 2))))
                     (setf contain-same-pair t))
                   (when (and (not contain-triplet) (char= char-1 char-3))
                     (setf contain-triplet t))
                   (setf char-1 char-2
                         char-2 char-3)))
               (and contain-same-pair contain-triplet))))
      (dolist (string input count)
        (when (nice-string-p string)
          (incf count))))))

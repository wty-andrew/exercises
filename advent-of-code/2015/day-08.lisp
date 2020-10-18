(uiop:define-package #:advent-of-code/2015/day-08
  (:use #:cl #:aoc-utils)
  (:export #:day-08/p1 #:day-08/p2))

(in-package #:advent-of-code/2015/day-08)

(defun indices-of (subseq main-seq)
  "Return the positions of all the subseq occurrences in the main sequence."
  (labels ((aux (start acc)
             (let ((pos (search subseq main-seq :start2 start)))
               (if (and pos (< (+ pos (length subseq)) (length main-seq)))
                   (aux (+ pos (length subseq)) (cons pos acc))
                   acc))))
    (nreverse (aux 0 nil))))

(defun count-hex-chars (str)
  (loop for i in (indices-of "\\x" str)
        count (and (< (+ i 3) (length str))
                   (every (lambda (c) (find c "0123456789abcdef"))
                          (subseq str (+ 2 i) (+ 4 i))))))

(defun day-08/p1 ()
  (loop for str in (puzzle-file->lines "2015/data/08.txt")
        sum (+ (* (count-hex-chars str) 3)
               (length (indices-of "\\\\" str))
               (length (indices-of "\\\"" str))
               2)))

(defun day-08/p2 ()
  (loop for str in (puzzle-file->lines "2015/data/08.txt")
        sum (+ (count #\" str) (count #\\ str) 2)))

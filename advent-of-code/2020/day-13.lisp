(uiop:define-package #:advent-of-code/2020/day-13
  (:use #:cl #:aoc-utils)
  (:export #:day-13/p1 #:day-13/p2))

(in-package #:advent-of-code/2020/day-13)

(defun read-notes ()
  (let* ((lines (puzzle-file->lines "2020/data/13.txt"))
         (timestamp (parse-integer (first lines)))
         (buses (loop for id in (uiop:split-string (second lines) :separator '(#\,))
                      for idx from 0
                      unless (string= id "x")
                        collect (cons (parse-integer id) idx))))
    (values buses timestamp)))

(defun day-13/p1 ()
  (multiple-value-bind (buses timestamp) (read-notes)
    (flet ((wait-minutes (bus-id)
             (let ((remain (mod timestamp bus-id)))
               (if (zerop remain) 0 (- bus-id remain)))))
      (multiple-value-bind (best-id minutes)
          (find-best #'wait-minutes (mapcar #'car buses) :comparator #'<)
        (* best-id minutes)))))

(defun day-13/p2 ()
  (labels ((expected-remainder (bus-id idx) ; stamp = bus-id * k + (bus-id - idx)
             (mod (- bus-id idx) bus-id))
           (rec (buses stamp step)
             (if (null buses)
                 stamp
                 (destructuring-bind (bus-id . rem) (first buses)
                   (do ((stamp stamp (+ stamp step)))
                       ((= (mod stamp bus-id) rem) (rec (cdr buses) stamp (lcm bus-id step))))))))
    (let ((buses (loop for (id . idx) in (read-notes)
                       collect (cons id (expected-remainder id idx)))))
      (destructuring-bind (bus-id . rem) (first buses)
        (rec (cdr buses) rem bus-id)))))

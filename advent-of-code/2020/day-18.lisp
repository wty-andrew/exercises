(uiop:define-package #:advent-of-code/2020/day-18
  (:use #:cl #:aoc-utils)
  (:export #:day-18/p1 #:day-18/p2))

(in-package #:advent-of-code/2020/day-18)

(defun read-exprs ()
  (puzzle-file->forms "2020/data/18.txt"))

(defun day-18/p1 ()
  (labels ((evaluate (expr)
             (cond ((integerp expr) expr)
                   ((= (length expr) 1) (evaluate (first expr)))
                   (t (destructuring-bind (x op y . rest) expr
                        (evaluate (cons (eval `(,op ,(evaluate x) ,(evaluate y))) rest)))))))
    (reduce #'+ (mapcar #'evaluate (read-exprs)))))

(defun day-18/p2 ()
  (labels ((evaluate (expr)
             (cond ((integerp expr) expr)
                   ((= (length expr) 1) (evaluate (first expr)))
                   (t (destructuring-bind (x op . rest) expr
                        (case op
                          (* (eval `(* ,(evaluate x) ,(evaluate rest))))
                          (+ (evaluate (cons (eval `(+ ,(evaluate x) ,(evaluate (car rest))))
                                              (cdr rest))))))))))
    (reduce #'+ (mapcar #'evaluate (read-exprs)))))

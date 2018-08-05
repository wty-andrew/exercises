(defun find-divisors (num)
  "return the number of divisors for a given integer"
  (let ((alist '()))
    (do ((n 2 (1+ n)))
        ((= num 1))
      (do ((k 0 (1+ k)))
          ((/= (mod num n) 0) (if (> k 0) (push (cons n k) alist)))
        (setf num (/ num n))))
    (reduce #'(lambda (x y) (* x (1+ (cdr y)))) alist :initial-value 1)))

(defun solution ()
  (do* ((n 1 (1+ n))
        (triangular-num n (+ triangular-num n)))
       ((> (find-divisors triangular-num) 500) triangular-num)))

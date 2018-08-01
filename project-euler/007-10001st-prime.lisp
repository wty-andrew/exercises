(defun find-nth-prime (n)
  (do ((lst () (append lst (list num)))
       (nth 1 (1+ nth))
       (num 2 (do ((x (1+ num) (1+ x)))
                  ((every #'(lambda (i) (/= (mod x i) 0)) lst) x))))
      ((= nth n) num)))

(defun solution ()
  (find-nth-prime 10001))

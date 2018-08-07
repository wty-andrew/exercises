(defun factorial (n)
  (if (= n 1)
      1
      (* n (factorial (1- n)))))

(defun solution ()
  (loop for c across (write-to-string (factorial 100))
        sum (- (char-code c) 48))) ; (char-code #\0) = 48

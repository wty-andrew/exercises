(defun solution ()
  (loop for c across (write-to-string (expt 2 1000))
        sum (- (char-code c) 48))) ; (char-code #\0) = 48

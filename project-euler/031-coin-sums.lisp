(defparameter coin-table '((8 . 200)
                           (7 . 100)
                           (6 . 50)
                           (5 . 20)
                           (4 . 10)
                           (3 . 5)
                           (2 . 2)
                           (1 . 1)))

(defun ways-to-make-amount (amount coin-types)
  (cond ((zerop amount) 1)
        ((or (< amount 0) (zerop coin-types)) 0)
        (t (+ (ways-to-make-amount (- amount (cdr (assoc coin-types coin-table))) coin-types)
              (ways-to-make-amount amount (1- coin-types))))))

(defun solution ()
  (ways-to-make-amount 200 8))
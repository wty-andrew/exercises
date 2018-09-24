;; the top right corner of the nth-spiral is n^2, the sum of four corners can be easily calculated
(defun n-spiral-sum (n)
  (if (= n 1)
      1
      (+ (n-spiral-sum (- n 2))
         (+ (* 4 n n) (- (* 6 n)) 6))))

(defun solution ()
  (n-spiral-sum 1001))

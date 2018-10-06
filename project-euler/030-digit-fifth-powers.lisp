(defun sum-of-fifth-powers-of-digits (n)
  (do ((sum 0))
      ((zerop n) sum)
    (multiple-value-bind (d r) (floor n 10)
      (incf sum (expt r 5))
      (setf n d))))

(defun solution ()
  (loop :for n :from 2 :to 300000 ;; (sum-of-fifth-powers-of-ditits 299999) = 295277
        :if (= n (sum-of-fifth-powers-of-digits n))
        :sum n))

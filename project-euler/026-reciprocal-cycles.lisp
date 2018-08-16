(defun recurring-cycle (n)
  (let ((seen '())) ;; list of quotient remainder pair (single-digit)
    (do ((i 1 (* (mod i n) 10)))
        ((zerop (mod i n)) nil)
      (multiple-value-bind (f r) (floor i n)
        (let ((result (member (cons f r) seen :test #'equal)))
          (if result
              (return-from recurring-cycle (mapcar #'car result))
              (setf seen (append seen (list (cons f r))))))))))

(defun solution ()
  (let ((max 0)
        num)
    (dotimes (n 1000)
      (let ((len (length (recurring-cycle (1+ n)))))
        (when (> len max)
          (setf max len
                num (1+ n)))))
    num))

(defun range (start end)
  (loop for n from start to end
        collect n))

(defun solution ()
  (/ (reduce #'* (range 21 40))
     (reduce #'* (range 1 20))))

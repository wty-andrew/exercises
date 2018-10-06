(defun solution ()
  (length (remove-duplicates
           (loop :for a :from 2 :to 100
                 :append (loop :for b :from 2 :to 100
                               :collect (expt a b))))))

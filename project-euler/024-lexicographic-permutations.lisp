(defun factorial (n)
  (if (< n 2)
      1
      (* n (factorial (1- n)))))

(defun nth-permutation (nth objects)
  (assert (<= 1 nth (factorial (length objects))))
  (if (null (cdr objects))
      objects
      (let* ((fac (factorial (1- (length objects))))
             (n (do ((i 1 (1+ i)))
                    ((and (>= (* i fac) nth)
                          (> nth (* (1- i) fac)))
                     (1- i)))))
        (cons (nth n objects)
              (nth-permutation (- nth (* n fac))
                               (append (subseq objects 0 n)
                                       (nthcdr (1+ n) objects)))))))

(defun solution ()
  (nth-permutation 1000000 '(0 1 2 3 4 5 6 7 8 9)))

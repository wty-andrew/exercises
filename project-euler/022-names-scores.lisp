(defun split (str &key (delimeterp #'(lambda (c) (equal c #\,))))
  (let ((i (position-if delimeterp str)))
    (cond (i (cons (subseq str 0 i) (split (subseq str (1+ i)))))
          ((> (length str) 0) (list str))
          (t nil))))

(defun name-score (str)
  (loop for c across str
        sum (if (char= c #\") 0 (- (char-code c) 64))))

(defun solution ()
  (let ((names (with-open-file (input "022_names.txt")
                 (sort (split (read-line input)) #'string<))))
    (loop for name in names and index from 1
          sum (* index (name-score name)))))

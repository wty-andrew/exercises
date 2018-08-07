;; cheating by using lisp's cardinal english formatting :)
(defun count-letters (str)
  (loop for c across str
        count (alpha-char-p c)))

(defun solution ()
  (loop for n from 1 to 1000
        sum (let ((count (count-letters (format nil "~r" n))))
              ;; (format nil "~r" 123) => "one hundred twenty-three"
              ;; +3 for the missing "and" letters
              (if (or (< n 100)
                      (zerop (mod n 100)))
                  count
                  (+ count 3)))))

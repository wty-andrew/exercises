(uiop:define-package #:advent-of-code/2020/day-14
  (:use #:cl #:aoc-utils)
  (:export #:day-14/p1 #:day-14/p2))

(in-package #:advent-of-code/2020/day-14)

(defun read-programs ()
  (let ((lines (puzzle-file->lines "2020/data/14.txt"))
        (mask nil)
        (addr-value-pairs nil)
        (programs nil))
    (labels ((parse-addr-value-pair (tokens)
               (let* ((token1 (first tokens))
                      (addr (parse-integer (subseq token1 4 (1- (length token1)))))
                      (value (parse-integer (third tokens))))
                 (cons addr value))))
      (dolist (line lines)
        (let ((tokens (uiop:split-string line)))
          (if (string= "mask" (first tokens))
              (progn
                (when mask
                  (push (cons mask (reverse addr-value-pairs)) programs)
                  (setf addr-value-pairs nil))
                (setf mask (third tokens)))
              (push (parse-addr-value-pair tokens) addr-value-pairs))))
      (push (cons mask (reverse addr-value-pairs)) programs)
      (reverse programs))))

(defun exp2 (n)
  (ash 2 (1- n)))

(defun bit-string->int (str)
  (let ((n 0))
    (dotimes (i (length str) n)
      (setf n (+ (ash n 1) (digit-char-p (char str i)))))))

(defun int->char (n)
  (code-char (+ n 48)))

(defun addresses (masked-addr)
  "Return all the possible memory addresses caused by the floating bits."
  (labels ((rec (n)
             (if (zerop n) (list nil)
                 (mapcan (lambda (lst)
                           (list (cons 1 lst) (cons 0 lst)))
                         (rec (1- n))))))
    (let ((x-indices (loop for i below (length masked-addr)
                           when (char= (char masked-addr i) #\X)
                             collect i)))
      (mapcar (lambda (lst)
                (let ((copy (copy-seq masked-addr)))
                  (mapc (lambda (i n) (setf (char copy i) (int->char n))) x-indices lst)
                  (bit-string->int copy)))
              (rec (length x-indices))))))

(defun day-14/p1 ()
  (flet ((apply-mask (mask number)
           (let ((len (length mask)))
             (loop for n across mask
                   for i from (1- len) downto 0
                   do (case n
                        (#\0 (setf number (logand number (- (1- (exp2 len)) (exp2 i)))))
                        (#\1 (setf number (logior number (exp2 i)))))
                   finally (return number)))))
    (let ((memory (make-hash-table)))
      (dolist (program (read-programs))
        (destructuring-bind (mask . addr-value-pairs) program
          (loop for (addr . value) in addr-value-pairs
                do (setf (gethash addr memory) (apply-mask mask value)))))
      (reduce #'+ (hash-table-values memory)))))

(defun day-14/p2 ()
  (flet ((apply-mask (mask addr)
           (let ((bits (format nil "~36,'0b" addr)))
             (dotimes (i 36 bits)
               (when (not (eq (char mask i) #\0))
                 (setf (char bits i) (char mask i)))))))
    (let ((memory (make-hash-table)))
      (dolist (program (read-programs))
        (destructuring-bind (mask . addr-value-pairs) program
          (loop for (addr . value) in addr-value-pairs
                do (dolist (addr (addresses (apply-mask mask addr)))
                     (setf (gethash addr memory) value)))))
      (reduce #'+ (hash-table-values memory)))))

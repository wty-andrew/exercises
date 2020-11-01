(uiop:define-package #:advent-of-code/2015/day-12
  (:use #:cl #:aoc-utils)
  (:export #:day-12/p1 #:day-12/p2))

(in-package #:advent-of-code/2015/day-12)

;; copied from https://gist.github.com/chaitanyagupta/9324402
(defconstant +left-bracket+ #\[)
(defconstant +right-bracket+ #\])
(defconstant +left-brace+ #\{)
(defconstant +right-brace+ #\})
(defconstant +comma+ #\,)
(defconstant +colon+ #\:)

(defun read-next-object (separator delimiter &optional (input-stream *standard-input*))
  (flet ((peek-next-char () (peek-char t input-stream t nil t))
         (discard-next-char () (read-char input-stream t nil t)))
    (if (and delimiter (char= (peek-next-char) delimiter))
        (progn
          (discard-next-char)
          nil)
        (let* ((object (read input-stream t nil t))
               (next-char (peek-next-char)))
          (cond
            ((char= next-char separator) (discard-next-char))
            ((and delimiter (char= next-char delimiter)) nil)
            (t (error "Unexpected next char: ~S" next-char)))
          object))))

(defun read-left-bracket (stream char)
  (declare (ignore char))
  (let ((*readtable* (copy-readtable)))
    (set-macro-character +comma+ 'read-separator)
    (loop for object = (read-next-object +comma+ +right-bracket+ stream)
          while object
          collect object into objects
          finally (return `(list ,@objects)))))

(defun read-separator (stream char)
  (declare (ignore stream))
  (error "Separator ~S shouldn't be read alone" char))

(defun read-delimiter (stream char)
  (declare (ignore stream))
  (error "Delimiter ~S shouldn't be read alone" char))

(defun create-json-hash-table (&rest pairs)
  (let ((hash-table (make-hash-table :test #'equal)))
    (loop for (key . value) in pairs
          do (setf (gethash key hash-table) value))
    hash-table))

(defun read-left-brace (stream char)
  (declare (ignore char))
  (let ((*readtable* (copy-readtable)))
    (set-macro-character +comma+ 'read-separator)
    (set-macro-character +colon+ 'read-separator)
    (loop for key = (read-next-object +colon+ +right-brace+ stream)
          while key
          for value = (read-next-object +comma+ +right-brace+ stream)
          collect `(cons ,key ,value) into pairs
          finally (return `(create-json-hash-table ,@pairs)))))

(defmacro with-json-syntax (&body body)
  (let ((prev-table (gensym)))
    `(let ((,prev-table *readtable*))
       (setf *readtable* (copy-readtable))
       (set-macro-character +left-bracket+ 'read-left-bracket)
       (set-macro-character +right-bracket+ 'read-delimiter)
       (set-macro-character +left-brace+ 'read-left-brace)
       (set-macro-character +right-brace+ 'read-delimiter)
       (unwind-protect
            (progn
              ,@body)
         (setf *readtable* ,prev-table )))))

(defun sum-object (object)
  (typecase object
    (integer object)
    (list (reduce #'+ (mapcar #'sum-object object)))
    (hash-table (sum-object (hash-table-values object)))
    (otherwise 0)))

(defun sum-object-ignore-red (object)
  (typecase object
    (integer object)
    (list (reduce #'+ (mapcar #'sum-object-ignore-red object)))
    (hash-table (let ((values (hash-table-values object)))
                  (if (member "red" values :test #'equal)
                      0
                      (reduce #'+ (mapcar #'sum-object-ignore-red values)))))
    (otherwise 0)))

(defun read-json-document ()
  (with-json-syntax
    (eval (read-from-string (puzzle-file->string "2015/data/12.txt")))))

(defun day-12/p1 ()
  (sum-object (read-json-document)))

(defun day-12/p2 ()
  (sum-object-ignore-red (read-json-document)))

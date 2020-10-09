(uiop:define-package #:advent-of-code/utils
  (:nicknames #:aoc-utils)
  (:use #:cl)
  (:export #:puzzle-file->string
           #:puzzle-file->lines
           #:puzzle-file->forms
           #:str->form
           #:match))

(in-package #:advent-of-code/utils)

(defun get-input-full-path (filepath)
  "Return the full path of the file, the file path is relative to the project root folder."
  (asdf:system-relative-pathname :advent-of-code filepath))

(defun puzzle-file->string (path)
  "Read the puzzle input file into a string."
  (uiop:read-file-string (get-input-full-path path)))

(defun puzzle-file->lines (path)
  "Read the puzzle input file into a list of strings."
  (uiop:read-file-lines (get-input-full-path path)))

(defun str->form (string)
  "Transform a string into a lisp form."
  (read-from-string (format nil "(~a)" string)))

(defun puzzle-file->forms (path)
  "Read the puzzle input file into a list of forms."
  (mapcar #'str->form (puzzle-file->lines path)))

(defun variable-p (x)
  "Check if the argument is a symbol starts with a question mark."
  (and (symbolp x) (char= (char (symbol-name x) 0) #\?)))

(defun match (pattern sequence &optional binds)
  "Return the bindings (variable and symbol pairs) as an alist."
  (cond ((and (null pattern) (null sequence)) (values binds t))
        ((eq (car pattern) (car sequence))
         (match (cdr pattern) (cdr sequence) binds))
        ((and (variable-p (car pattern)) (consp sequence))
         (multiple-value-bind (binds2 success)
             (match (cdr pattern) (cdr sequence))
           (if success
               (values (acons (car pattern) (car sequence) binds2) t)
               (values nil nil))))
        (t (values nil nil))))

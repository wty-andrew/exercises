(uiop:define-package #:advent-of-code/utils
  (:nicknames #:aoc-utils)
  (:use #:cl)
  (:export #:puzzle-file->string
           #:puzzle-file->lines
           #:puzzle-file->forms
           #:str->form
           #:remove-chars
           #:match
           #:hash-table-keys
           #:hash-table-values
           #:permutations
           #:product
           #:with-props
           #:positions
           #:find-best
           #:separate-by
           #:csp-backtracking
           #:make-graph
           #:add-edge
           #:graph-vertices
           #:weight))

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

(defun remove-chars (string chars)
  "Return a new string without chars in it."
  (remove-if (lambda (c) (member c chars)) string))

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

(defun hash-table-keys (hash-table)
  "Return the keys of hash-table as a list."
  (loop for key being the hash-keys of hash-table
        collect key))

(defun hash-table-values (hash-table)
  "Return the values of hash-table as a list."
  (loop for value being the hash-value of hash-table
        collect value))

(defun permutations (items)
  "Return all the possible ways that a list of items can be arranged."
  (cond ((null items) nil)
        ((null (cdr items)) (list items))
        (t (mapcan (lambda (item)
                     (mapcar (lambda (p) (cons item p))
                             (permutations (remove item items))))
                   items))))

(defun product (&rest lists)
  "Return all the possible ways to choose one item from each list."
  (if (null lists)
      (list nil)
      (mapcan (lambda (lst)
                (mapcar (lambda (x)
                          (cons x lst))
                        (car lists)))
              (apply #'product (cdr lists)))))

(defmacro with-props (props symbol &body body)
  "A helper macro for asscessing plist of a symbol."
  (let ((gsym (gensym)))
    `(let ((,gsym ,symbol))
       (symbol-macrolet ,(mapcar (lambda (prop)
                                   `(,prop (get ,gsym ',prop)))
                          props)
         ,@body))))

(defun positions (target sequence &key (test #'equal))
  "Return the indices of target in sequence."
  (let ((result nil))
    (dotimes (i (length sequence) (nreverse result))
      (if (funcall test (elt sequence i) target)
          (push i result)))))

(defun find-best (fn sequence &key (comparator #'>))
  "Mapping a function to sequence, find the item that produce the best value, return
both the item and the value."
  (let ((best-item (first sequence))
        (best-val (funcall fn (first sequence))))
    (dolist (item (rest sequence))
      (let ((val (funcall fn item)))
        (when (funcall comparator val best-val)
          (setf best-val val
                best-item item))))
    (values best-item best-val)))

(defun separate-by (pred sequence)
  "Separate the items in given sequence into two list by the predicate function."
  (loop for item in sequence
        if (funcall pred item)
          collect item into good
        else
          collect item into bad
        finally (return (values good bad))))

(defun csp-backtracking (variables var-candidates-fn constraint-check-fn)
  "Solve constraint satisfaction problems with backtracking, returns a hash-table if a
solution is found."
  (labels ((rec (assignments)
             (let* ((assigned-vars (hash-table-keys assignments))
                    (unassigned-vars (loop for var in variables
                                           when (not (member var assigned-vars))
                                             collect var)))
               (if unassigned-vars
                   (let ((var (car unassigned-vars)))
                     (dolist (value (funcall var-candidates-fn var))
                       (setf (gethash var assignments) value)
                       (when (and (funcall constraint-check-fn var assignments)
                                  (rec assignments))
                         (return-from rec assignments))
                       (remhash var assignments)))
                   assignments))))
    (rec (make-hash-table))))

;;; Graph with adjacent list representation. Each key-value pair in the graph
;;; is a vertex and its connecting vertices with weight stored in a-list.
(defun make-graph ()
  "Create an empty graph."
  (make-hash-table))

(defun add-edge (graph vertex1 vertex2 &optional (weight 0))
  "Adding an edge connecting vertex1 and vertex2 to the graph."
  (push (cons vertex2 weight) (gethash vertex1 graph)))

(defun graph-vertices (graph)
  "Return all vertices in the graph."
  (hash-table-keys graph))

(defun weight (graph vertex1 vertex2)
  "Lookup the weight between vertex1 and vertex2 in the graph."
  (cdr (assoc vertex2 (gethash vertex1 graph))))

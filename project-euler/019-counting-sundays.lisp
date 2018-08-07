(defparameter *month-length* (make-hash-table))
(loop for days in '(31 28 31 30 31 30 31 31 30 31 30 31) and month from 1
      do (setf (gethash month *month-length*) days))

(defun leap-year-p (year)
  (and (zerop (mod year 4))
       (or (not (zerop (mod year 100)))
           (zerop (mod year 400)))))

(defun date->num (year month &optional (day 1))
  "count the days after 1899/12/31"
  (let ((days 0))
    (incf days (loop for y from 1900 to (1- year)
                     sum (if (leap-year-p y) 366 365)))
    (when (> month 1)
      (incf days (+ (loop for m from 1 to (1- month)
                          sum (gethash m *month-length*))
                    (if (and (> month 2) (leap-year-p year)) 1 0))))
    (incf days day)))

(defun solution ()
  (let ((count 0))
    (dotimes (y 100 count)
      (dotimes (m 12)
        (if (zerop (mod (date->num (+ 1901 y) (1+ m)) 7))
            (incf count))))))

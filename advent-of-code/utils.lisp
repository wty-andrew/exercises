(uiop:define-package #:advent-of-code/utils
  (:nicknames #:aoc-utils)
  (:use #:cl)
  (:export #:read-puzzle-input))

(in-package #:advent-of-code/utils)

(defun read-puzzle-input (path)
  "Return the content of the file as a string, the file path is relative to the project root folder."
  (uiop:read-file-string (asdf:system-relative-pathname :advent-of-code path)))

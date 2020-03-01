Parenscript implementation of the [Coding Math](http://www.codingmath.com/) series

## Quick Start
- In terminal
    - `npm run dev`: launch webpack dev server on port 3000
- In slime/sly
    - `(ql:quickload "coding-math")`
    - `(in-package :coding-math)`
    - `(start-server)`: run hunchentoot server on port 5000
    - compile each parenscript file


## Note
Here's a snippet modified from [trident-mode](https://github.com/johnmastro/trident-mode.el) to compile parenscript in sly
```elisp
(defun compile-buffer-to-file ()
  (interactive)
  (when (and (buffer-modified-p)
             (y-or-n-p "Save buffer? "))
    (save-buffer))

  (let* ((this buffer-file-name)
         (dir (and this (file-name-directory this)))
         (initial (and this (concat (file-name-base this) ".js")))
         (destination (if (and dir initial)
                          (concat dir initial)
                        (read-file-name "Destination: " dir nil nil initial nil))))
    (sly-eval-async `(ps:ps-compile-file ,(buffer-file-name))
      #'(lambda (js-code)
          (with-temp-buffer
            (erase-buffer)
            (insert js-code)
            (write-region 1 (point-max) destination)))
      (sly-current-package))))
```

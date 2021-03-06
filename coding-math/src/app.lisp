(defpackage #:coding-math
  (:use #:cl #:hunchentoot #:cl-who #:parenscript))

(in-package #:coding-math)

(setf (html-mode) :html5)

(defvar *acceptor* nil)

(defun start-server (&optional (port 5000))
  (stop-server)
  (start (setf *acceptor* (make-instance 'easy-acceptor
                                         :port port
                                         :document-root "static/"))))

(defun stop-server ()
  (when *acceptor*
    (stop *acceptor*)
    (setf *acceptor* nil)))

(define-easy-handler (index :uri "/") ()
  (with-html-output-to-string (*standard-output* nil :prologue t :indent t)
    (:html
     (:head
      (:meta :charset "utf-8")
      (:link :type "text/css" :rel "stylesheet" :href "/main.css"))
     (:body (:canvas :id "canvas")
            (:script :type "text/javascript" :src "http://localhost:3000/utils.js")
            (:script :type "text/javascript" :src "http://localhost:3000/vector.js")
            (:script :type "text/javascript" :src "http://localhost:3000/particle.js")
            (:script :type "text/javascript" :src "http://localhost:3000/arm.js")
            (:script :type "text/javascript" :src "http://localhost:3000/fksystem.js")
            (:script :type "text/javascript" :src "http://localhost:3000/iksystem.js")
            (:script :type "text/javascript" :src "http://localhost:3000/index.js")))))

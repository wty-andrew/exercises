(asdf:defsystem #:advent-of-code
  :class :package-inferred-system
  :depends-on ("advent-of-code/utils"
               "advent-of-code/2015/all"))

(register-system-packages "advent-of-code/utils" '(:aoc-utils))
(register-system-packages "advent-of-code/2015/all" '(:aoc-2015))

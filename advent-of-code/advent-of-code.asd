(asdf:defsystem #:advent-of-code
  :class :package-inferred-system
  :depends-on ("advent-of-code/utils"
               "advent-of-code/2015/all"
               "advent-of-code/2016/all"
               "advent-of-code/2020/all"))

(register-system-packages "advent-of-code/utils" '(:aoc-utils))
(register-system-packages "advent-of-code/2015/all" '(:aoc-2015))
(register-system-packages "advent-of-code/2016/all" '(:aoc-2016))
(register-system-packages "advent-of-code/2020/all" '(:aoc-2020))

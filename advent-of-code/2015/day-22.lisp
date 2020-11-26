(uiop:define-package #:advent-of-code/2015/day-22
  (:use #:cl #:aoc-utils)
  (:export #:day-22/p1 #:day-22/p2))

(in-package #:advent-of-code/2015/day-22)

(defclass state ()
  ((player-hp :initarg :player-hp
              :accessor player-hp)
   (player-mana :initarg :player-mana
                :accessor player-mana)
   (player-armor :initarg :player-armor
                 :accessor player-armor)
   (boss-hp :initarg :boss-hp
            :accessor boss-hp)
   (boss-damage :initarg :boss-damage
                :accessor boss-damage)
   (effects :initarg :effects
            :accessor effects)))

(defun make-state (player-hp player-mana player-armor boss-hp boss-damage effects)
  (make-instance 'state
                 :player-hp player-hp
                 :player-mana player-mana
                 :player-armor player-armor
                 :boss-hp boss-hp
                 :boss-damage boss-damage
                 :effects effects))

(defun copy-state (state)
  (with-slots (player-hp player-mana player-armor boss-hp boss-damage effects) state
    (make-state player-hp player-mana player-armor boss-hp boss-damage (copy-tree effects))))

(defun start-turn! (state)
  (with-slots (player-mana player-armor boss-hp boss-damage effects) state
    (dolist (effect (effects state))
      (destructuring-bind (action . timer) effect
        (when (> timer 0)
          (case action
            (shield (setf player-armor (if (> timer 1) 7 0)))
            (poison (decf boss-hp 3))
            (recharge (incf player-mana 101)))
          (decf (cdr effect)))))))

(defun spell-cost (spell)
  (case spell
    (magic-missile 53)
    (drain 73)
    (shield 113)
    (poison 173)
    (recharge 229)))

(defun cast-spell! (state spell)
  (with-slots (player-hp player-mana player-armor boss-hp effects) state
    (decf player-mana (spell-cost spell))
    (case spell
      (magic-missile (decf boss-hp 4))
      (drain (progn
               (incf player-hp 2)
               (decf boss-hp 2)))
      (shield (setf (cdr (assoc 'shield effects)) 6))
      (poison (setf (cdr (assoc 'poison effects)) 6))
      (recharge (setf (cdr (assoc 'recharge effects)) 5)))))

(defun attack-player! (state)
  (with-slots (player-hp player-armor boss-damage) state
    (decf player-hp (max 1 (- boss-damage player-armor)))))

(defun winner (state)
  (with-slots (player-hp player-mana boss-hp) state
    (cond ((or (<= player-hp 0) (< player-mana 0)) 'boss)
          ((<= boss-hp 0) 'player)
          (t nil))))

(defun spell-choices (state)
  (loop for (action . timer) in (effects state)
        with spells = '(magic-missile drain)
        when (<= timer 1)
          do (push action spells)
        finally (return spells)))

(defun tick! (state spell)
  (macrolet ((check-winner ()
               `(let ((winner (winner state)))
                  (when winner
                    (return-from tick! (values winner state))))))
    (start-turn! state)
    (check-winner)
    (cast-spell! state spell)
    (check-winner)
    (start-turn! state)
    (check-winner)
    (attack-player! state)
    (check-winner)
    (values nil state)))

(defun read-boss-stats ()
  (mapcar (lambda (line)
            (parse-integer (car (last (uiop:split-string line)))))
          (puzzle-file->lines "2015/data/22.txt")))

(defun make-init-state ()
  (let ((init-effects '((shield . 0) (poison . 0) (recharge . 0))))
    (destructuring-bind (boss-hp boss-damage) (read-boss-stats)
      (make-state 50 500 0 boss-hp boss-damage init-effects))))

(defun find-least-mana-spent (game-turn)
  (let ((min-mana-spent most-positive-fixnum))
    (labels ((rec (state mana-spent)
               (dolist (spell (spell-choices state))
                 (let ((next-mana-spent (+ mana-spent (spell-cost spell))))
                   (when (< next-mana-spent min-mana-spent)
                     (multiple-value-bind (winner next-state)
                         (funcall game-turn (copy-state state) spell)
                       (case winner
                         (boss nil)
                         (player (setf min-mana-spent next-mana-spent))
                         (t (rec next-state next-mana-spent)))))))))
      (rec (make-init-state) 0)
      min-mana-spent)))

(defun day-22/p1 ()
  (find-least-mana-spent #'tick!))

(defun day-22/p2 ()
  (flet ((tick-hard-mode! (state spell)
           (if (zerop (decf (player-hp state)))
               (values 'boss state)
               (tick! state spell))))
    (find-least-mana-spent #'tick-hard-mode!)))

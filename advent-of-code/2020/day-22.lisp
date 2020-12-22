(uiop:define-package #:advent-of-code/2020/day-22
  (:use #:cl #:aoc-utils)
  (:export #:day-22/p1 #:day-22/p2))

(in-package #:advent-of-code/2020/day-22)

(defun read-decks ()
  (let* ((string (puzzle-file->string "2020/data/22.txt"))
         (idx1 (position #\P string))
         (idx2 (position #\P string :from-end t))
         (deck1 (str->form (subseq string (+ idx1 9) idx2)))
         (deck2 (str->form (subseq string (+ idx2 9)))))
    (values deck1 deck2)))

(defun deck-score (deck)
  (loop for card in deck
        for multiplier from (length deck) downto 1
        sum (* card multiplier)))

(defun recursive-combat (deck1 deck2)
  (flet ((winner (deck1 deck2)
           (let ((card1 (car deck1))
                 (card2 (car deck2)))
             (cond ((and (>= (length (cdr deck1)) card1) (>= (length (cdr deck2)) card2))
                    (recursive-combat (subseq (cdr deck1) 0 card1)
                                      (subseq (cdr deck2) 0 card2)))
                   ((> card1 card2) 'player1)
                   (t 'player2)))))
    (let ((history (make-hash-table :test 'equal)))
      (do ()
          ((or (null deck1) (null deck2))
           (values (if (null deck1) 'player2 'player1) (or deck1 deck2)))
        (when (gethash deck1 history)
          (return-from recursive-combat (values 'player1 nil)))
        (setf (gethash deck1 history) t)
        (let ((card1 (car deck1))
              (card2 (car deck2)))
          (if (eq (winner deck1 deck2) 'player1)
              (setf deck1 (append (cdr deck1) (list card1 card2))
                    deck2 (cdr deck2))
              (setf deck1 (cdr deck1)
                    deck2 (append (cdr deck2) (list card2 card1)))))))))

(defun day-22/p1 ()
  (multiple-value-bind (deck1 deck2) (read-decks)
    (do ()
        ((or (null deck1) (null deck2)) (deck-score (or deck1 deck2)))
      (let ((card1 (car deck1))
            (card2 (car deck2)))
        (if (> card1 card2)
            (setf deck1 (append (cdr deck1) (list card1 card2))
                  deck2 (cdr deck2))
            (setf deck1 (cdr deck1)
                  deck2 (append (cdr deck2) (list card2 card1))))))))

(defun day-22/p2 ()
  (multiple-value-bind (deck1 deck2) (read-decks)
    (multiple-value-bind (winner deck) (recursive-combat deck1 deck2)
      (declare (ignore winner))
      (deck-score deck))))

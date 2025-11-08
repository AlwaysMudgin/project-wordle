import React from "react";
import GuessForm from "../GuessForm";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import GuessResults from "../GuessResults/GuessResults";
import Keyboard from "../Keyboard/Keyboard";
import WonBanner from "../WonBanner/WonBanner";
import LostBanner from "../LostBanner/LostBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState("running");
  const [letterStatus, setLetterStatus] = React.useState({});

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);
    updateKeyboardLetters(tentativeGuess);
    if (tentativeGuess === answer) {
      setGameStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  function updateKeyboardLetters(word) {
    const wordResults = checkGuess(word, answer);
    let updates;
    if (wordResults) {
      updates = wordResults.reduce((differences, result) => {
        let currentStatus = letterStatus[result.letter];
        if (!currentStatus) {
          // first use of letter will always update keyboard
          return [...differences, result];
        } else if (
          currentStatus === "misplaced" &&
          result.status === "correct"
        ) {
          // subsequent uses only update keyboard if misplaced => correct
          return [...differences, result];
        } else {
          return differences;
        }
      }, []);
    }
    if (updates) {
      const nextLetterStatus = {
        ...letterStatus,
      };
      updates.forEach((update) => {
        nextLetterStatus[update.letter] = update.status;
      });
      setLetterStatus(nextLetterStatus);
    }
  }

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessForm
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={gameStatus}
      />
      <Keyboard letterStatus={letterStatus} />

      {gameStatus === "won" && <WonBanner numOfGuesses={guesses.length} />}
      {gameStatus === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;

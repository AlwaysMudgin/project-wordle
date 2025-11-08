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

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState("running");
  const [keyboardStatus, setKeyboardStatus] = React.useState({});

  console.info(answer);

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);
    updateKeyboard(tentativeGuess);
    if (tentativeGuess === answer) {
      setGameStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  function updateKeyboard(tentativeGuess) {
    const guessResults = checkGuess(tentativeGuess, answer);

    const updates =
      guessResults &&
      guessResults.reduce((updates, result) => {
        const letterStatus = keyboardStatus[result.letter];
        if (!letterStatus) {
          return [...updates, result];
        } else if (
          letterStatus === "misplaced" &&
          result.status === "correct"
        ) {
          return [...updates, result];
        } else return updates;
      }, []);

    if (updates) {
      const nextKeyboardStatus = {
        ...keyboardStatus,
      };
      updates.forEach(({ letter, status }) => {
        nextKeyboardStatus[letter] = status;
      });
      setKeyboardStatus(nextKeyboardStatus);
    }
  }

  function handleRestart() {
    setGuesses([]);
    setGameStatus("running");
    setKeyboardStatus({});
    setAnswer(sample(WORDS));
  }

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessForm
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={gameStatus}
      />
      <Keyboard status={keyboardStatus} />

      {gameStatus === "won" && (
        <WonBanner
          numOfGuesses={guesses.length}
          handleRestart={handleRestart}
        />
      )}
      {gameStatus === "lost" && (
        <LostBanner answer={answer} handleRestart={handleRestart} />
      )}
    </>
  );
}

export default Game;

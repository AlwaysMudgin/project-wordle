import React from "react";

function Key({ letter, letterStatus }) {
  return <div className={`key ${letterStatus}`}>{letter}</div>;
}

function Keyboard({ letterStatus }) {
  const TOP_LETTERS = "qwertyuiop".toUpperCase().split("");
  const MIDDLE_LETTERS = "asdfghjkl".toUpperCase().split("");
  const BOTTOM_LETTERS = "zxcvbnm".toUpperCase().split("");

  return (
    <div className="keyboard-wrapper">
      <div className="keyboard-row">
        {TOP_LETTERS.map((letter) => (
          <Key
            key={letter}
            letter={letter}
            letterStatus={letterStatus[letter]}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {MIDDLE_LETTERS.map((letter) => (
          <Key
            key={letter}
            letter={letter}
            letterStatus={letterStatus[letter]}
          />
        ))}
      </div>
      <div className="keyboard-row">
        {BOTTOM_LETTERS.map((letter) => (
          <Key
            key={letter}
            letter={letter}
            letterStatus={letterStatus[letter]}
          />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;

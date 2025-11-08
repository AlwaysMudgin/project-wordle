import React from "react";

function Key({ letter, status }) {
  return <div className={`key ${status}`}>{letter}</div>;
}

function Keyboard({ status }) {
  const TOP_LETTERS = "qwertyuiop".toUpperCase().split("");
  const MIDDLE_LETTERS = "asdfghjkl".toUpperCase().split("");
  const BOTTOM_LETTERS = "zxcvbnm".toUpperCase().split("");

  return (
    <div className="keyboard-wrapper">
      <div className="keyboard-row">
        {TOP_LETTERS.map((letter) => (
          <Key key={letter} letter={letter} status={status[letter]} />
        ))}
      </div>
      <div className="keyboard-row">
        {MIDDLE_LETTERS.map((letter) => (
          <Key key={letter} letter={letter} status={status[letter]} />
        ))}
      </div>
      <div className="keyboard-row">
        {BOTTOM_LETTERS.map((letter) => (
          <Key key={letter} letter={letter} status={status[letter]} />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;

import React, { useState } from "react";

const GuessingGame = () => {
  const [gameState, setGameState] = useState("start");
  const [secretNumber, setSecretNumber] = useState(0);
  const [score, setScore] = useState(20);
  const [guess, setGuess] = useState("");
  const [resultText, setResultText] = useState("");

  const startGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setScore(20);
    setGameState("playing");
  };

  const submitGuess = () => {
    const difference = Math.abs(guess - secretNumber);
    if (difference <= 10) {
      setResultText(
        "Congratulations! You guessed within +/- 10 of the correct number. You get an extra point!"
      );
      setScore(score + 1);
    } else if (guess === secretNumber) {
      setResultText("Congratulations! You guessed the correct number.");
      setScore(score + 10);
    } else if (guess > secretNumber) {
      setResultText("Your guess is too high. Try again.");
      setScore(score - 2);
    } else {
      setResultText("Your guess is too low. Try again.");
      setScore(score - 2);
    }
    setGameState("result");
  };

  const playAgain = () => {
    startGame();
    setGameState("playing");
    setResultText("");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-8">Guessing Chart Game</h1>
      {gameState === "start" && (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Game
        </button>
      )}
      {gameState === "playing" && (
        <div>
          <div className="mb-4">
            <label htmlFor="guess" className="block text-gray-700 mb-2">
              Enter your guess
            </label>
            <input
              id="guess"
              type="number"
              min="1"
              max="100"
              className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </div>
          <button
            onClick={submitGuess}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Guess
          </button>
        </div>
      )}
      {gameState === "result" && (
        <div>
          <p className="text-xl">{resultText}</p>
          <p>Secret Number: {secretNumber}</p>
          <button
            onClick={playAgain}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GuessingGame;

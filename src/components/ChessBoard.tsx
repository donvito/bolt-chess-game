import React from 'react';
import { Square } from './Square';
import { CapturedPieces } from './CapturedPieces';
import { MoveHistory } from './MoveHistory';
import { useChessGame } from '../hooks/useChessGame';
import { Crown, RotateCcw, Swords, AlertTriangle } from 'lucide-react';

export const ChessBoard = () => {
  const {
    board,
    selectedPiece,
    currentPlayer,
    isGameOver,
    winner,
    inCheck,
    capturedPieces,
    moves,
    handleSquareClick,
    resetGame,
  } = useChessGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 p-4">
      <div className="mb-4 sm:mb-8 flex flex-col items-center gap-2">
        <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 flex items-center gap-2 sm:gap-3">
          <Crown className="w-7 h-7 sm:w-10 sm:h-10 text-yellow-400" />
          Chess
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">A classic game of strategy</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-3 sm:p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left side: Captured pieces (white) and Move History */}
          <div className="lg:w-48 order-1 lg:order-1 flex flex-col gap-4">
            <CapturedPieces pieces={capturedPieces.white} color="white" />
            <MoveHistory moves={moves} />
          </div>

          {/* Game board and status - center */}
          <div className="flex flex-col items-center order-3 lg:order-2">
            <div className="mb-3 sm:mb-4 px-4 sm:px-6 py-2 rounded-full bg-gray-700/50 border border-gray-600 w-full max-w-xs">
              {isGameOver ? (
                <p className="text-yellow-400 font-semibold flex items-center gap-2 justify-center text-sm sm:text-base">
                  <Swords className="w-4 h-4" />
                  {winner} wins!
                </p>
              ) : inCheck ? (
                <p className="text-red-400 font-semibold flex items-center gap-2 justify-center text-sm sm:text-base">
                  <AlertTriangle className="w-4 h-4" />
                  {inCheck} is in check!
                </p>
              ) : (
                <p className="text-gray-300 font-medium flex items-center gap-2 justify-center text-sm sm:text-base">
                  <span className={`w-3 h-3 rounded-full ${currentPlayer === 'white' ? 'bg-white' : 'bg-gray-900'}`} />
                  {currentPlayer}'s turn
                </p>
              )}
            </div>

            <div className="grid grid-cols-8 gap-0 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] border-4 border-gray-700">
              {board.map((row, i) =>
                row.map((piece, j) => (
                  <Square
                    key={`${i}-${j}`}
                    piece={piece}
                    position={{ row: i, col: j }}
                    isSelected={
                      selectedPiece?.position.row === i &&
                      selectedPiece?.position.col === j
                    }
                    isInCheck={piece?.type === 'king' && piece.color === inCheck}
                    onClick={() => handleSquareClick(i, j)}
                    isLight={(i + j) % 2 === 0}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right side: Captured pieces (black) */}
          <div className="lg:w-48 order-2 lg:order-3">
            <CapturedPieces pieces={capturedPieces.black} color="black" />
          </div>
        </div>

        <button
          onClick={resetGame}
          className="mt-4 sm:mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          New Game
        </button>
      </div>
    </div>
  );
};
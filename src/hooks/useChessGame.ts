import { useState, useCallback } from 'react';
import { Piece, Position, Move } from '../types';
import { initialBoard, isValidMove, movePiece, isInCheck } from '../utils/chess';
import { getMoveNotation } from '../utils/notation';

export const useChessGame = () => {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoard());
  const [selectedPiece, setSelectedPiece] = useState<{
    piece: Piece;
    position: Position;
  } | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [inCheck, setInCheck] = useState<'white' | 'black' | null>(null);
  const [capturedPieces, setCapturedPieces] = useState<{
    white: Piece[];
    black: Piece[];
  }>({ white: [], black: [] });
  const [moves, setMoves] = useState<Move[]>([]);

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (isGameOver) return;

      const clickedPiece = board[row][col];

      if (!selectedPiece && clickedPiece?.color === currentPlayer) {
        setSelectedPiece({
          piece: clickedPiece,
          position: { row, col },
        });
        return;
      }

      if (selectedPiece) {
        if (row === selectedPiece.position.row && col === selectedPiece.position.col) {
          setSelectedPiece(null);
          return;
        }

        if (isValidMove(board, selectedPiece.position, { row, col }, selectedPiece.piece)) {
          const simulatedBoard = movePiece(board, selectedPiece.position, { row, col });
          if (isInCheck(simulatedBoard, currentPlayer)) {
            setSelectedPiece(null);
            return;
          }

          const newBoard = movePiece(board, selectedPiece.position, { row, col });
          const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
          const willBeInCheck = isInCheck(newBoard, nextPlayer);

          // Record the move
          const moveNotation = getMoveNotation(
            selectedPiece.piece,
            selectedPiece.position,
            { row, col },
            clickedPiece,
            willBeInCheck
          );

          const move: Move = {
            piece: selectedPiece.piece,
            from: selectedPiece.position,
            to: { row, col },
            notation: moveNotation,
            captured: clickedPiece || undefined,
          };

          setMoves(prev => [...prev, move]);

          if (clickedPiece) {
            setCapturedPieces(prev => ({
              ...prev,
              [currentPlayer]: [...prev[currentPlayer], clickedPiece]
            }));
          }

          setBoard(newBoard);
          
          if (clickedPiece?.type === 'king') {
            setIsGameOver(true);
            setWinner(currentPlayer);
          } else {
            if (willBeInCheck) {
              setInCheck(nextPlayer);
            } else {
              setInCheck(null);
            }
          }

          setCurrentPlayer(nextPlayer);
          setSelectedPiece(null);
        } else {
          if (clickedPiece?.color === currentPlayer) {
            setSelectedPiece({
              piece: clickedPiece,
              position: { row, col },
            });
          } else {
            setSelectedPiece(null);
          }
        }
      }
    },
    [board, currentPlayer, selectedPiece, isGameOver]
  );

  const resetGame = useCallback(() => {
    setBoard(initialBoard());
    setSelectedPiece(null);
    setCurrentPlayer('white');
    setIsGameOver(false);
    setWinner(null);
    setInCheck(null);
    setCapturedPieces({ white: [], black: [] });
    setMoves([]);
  }, []);

  return {
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
  };
};
import { Piece, Position, PieceColor } from '../types';

export const initialBoard = (): (Piece | null)[][] => {
  const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

  // Set up pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' };
    board[6][i] = { type: 'pawn', color: 'white' };
  }

  // Set up other pieces
  const setupRow = (row: number, color: PieceColor) => {
    const pieces: Piece['type'][] = [
      'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
    ];
    pieces.forEach((type, col) => {
      board[row][col] = { type, color };
    });
  };

  setupRow(0, 'black');
  setupRow(7, 'white');

  return board;
};

const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

export const findKing = (board: (Piece | null)[][], color: PieceColor): Position | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'king' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isInCheck = (board: (Piece | null)[][], color: PieceColor): boolean => {
  const kingPosition = findKing(board, color);
  if (!kingPosition) return false;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== color) {
        const from: Position = { row, col };
        if (isValidMove(board, from, kingPosition, piece)) {
          return true;
        }
      }
    }
  }
  return false;
};

const isPawnMove = (
  from: Position,
  to: Position,
  piece: Piece,
  board: (Piece | null)[][]
): boolean => {
  const direction = piece.color === 'white' ? -1 : 1;
  const startRow = piece.color === 'white' ? 6 : 1;
  const targetPiece = board[to.row][to.col];

  // Moving forward
  if (from.col === to.col && !targetPiece) {
    if (to.row - from.row === direction) return true;
    if (from.row === startRow && 
        to.row - from.row === 2 * direction && 
        !board[from.row + direction][from.col]) {
      return true;
    }
  }

  // Capturing
  if (Math.abs(to.col - from.col) === 1 && 
      to.row - from.row === direction && 
      targetPiece && 
      targetPiece.color !== piece.color) {
    return true;
  }

  return false;
};

export const isValidMove = (
  board: (Piece | null)[][],
  from: Position,
  to: Position,
  piece: Piece
): boolean => {
  if (!isValidPosition(from) || !isValidPosition(to)) return false;
  
  const targetPiece = board[to.row][to.col];
  if (targetPiece?.color === piece.color) return false;

  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);

  // Check path obstruction for pieces that can't jump
  if (piece.type !== 'knight' && (rowDiff > 0 || colDiff > 0)) {
    const rowStep = rowDiff === 0 ? 0 : (to.row - from.row) / rowDiff;
    const colStep = colDiff === 0 ? 0 : (to.col - from.col) / colDiff;
    
    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;

    while (currentRow !== to.row || currentCol !== to.col) {
      if (board[currentRow][currentCol] !== null) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
  }

  switch (piece.type) {
    case 'pawn':
      return isPawnMove(from, to, piece, board);

    case 'rook':
      return from.row === to.row || from.col === to.col;

    case 'knight':
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

    case 'bishop':
      return rowDiff === colDiff;

    case 'queen':
      return from.row === to.row || from.col === to.col || rowDiff === colDiff;

    case 'king':
      return rowDiff <= 1 && colDiff <= 1;

    default:
      return false;
  }
};

export const movePiece = (
  board: (Piece | null)[][],
  from: Position,
  to: Position
): (Piece | null)[][] => {
  if (!isValidPosition(from) || !isValidPosition(to)) {
    return board;
  }

  const newBoard = board.map(row => [...row]);
  newBoard[to.row][to.col] = newBoard[from.row][from.col];
  newBoard[from.row][from.col] = null;
  return newBoard;
};
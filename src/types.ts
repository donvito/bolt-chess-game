export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  piece: Piece;
  from: Position;
  to: Position;
  notation: string;
  captured?: Piece;
}

export interface GameState {
  board: (Piece | null)[][];
  currentPlayer: PieceColor;
  isGameOver: boolean;
  winner: PieceColor | null;
  inCheck: PieceColor | null;
  capturedPieces: {
    white: Piece[];
    black: Piece[];
  };
  moves: Move[];
}
import { Piece, Position } from '../types';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

const getPieceSymbol = (piece: Piece): string => {
  const symbols: Record<PieceType, string> = {
    king: 'K',
    queen: 'Q',
    rook: 'R',
    bishop: 'B',
    knight: 'N',
    pawn: '',
  };
  return symbols[piece.type];
};

export const getSquareNotation = (position: Position): string => {
  return `${FILES[position.col]}${RANKS[position.row]}`;
};

export const getMoveNotation = (
  piece: Piece,
  from: Position,
  to: Position,
  captured?: Piece,
  isCheck?: boolean
): string => {
  const pieceSymbol = getPieceSymbol(piece);
  const toSquare = getSquareNotation(to);
  const captureSymbol = captured ? 'x' : '';
  const checkSymbol = isCheck ? '+' : '';

  if (piece.type === 'pawn' && captured) {
    return `${FILES[from.col]}${captureSymbol}${toSquare}${checkSymbol}`;
  }

  return `${pieceSymbol}${captureSymbol}${toSquare}${checkSymbol}`;
};
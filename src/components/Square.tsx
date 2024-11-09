import React from 'react';
import { Piece } from '../types';

interface SquareProps {
  piece: Piece | null;
  position: { row: number; col: number };
  isSelected: boolean;
  isLight: boolean;
  isInCheck?: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  piece,
  isSelected,
  isLight,
  isInCheck,
  onClick,
}) => {
  const getPieceSymbol = (piece: Piece | null) => {
    if (!piece) return null;
    const symbols: { [key: string]: string } = {
      'white-pawn': '♙',
      'white-rook': '♖',
      'white-knight': '♘',
      'white-bishop': '♗',
      'white-queen': '♕',
      'white-king': '♔',
      'black-pawn': '♟',
      'black-rook': '♜',
      'black-knight': '♞',
      'black-bishop': '♝',
      'black-queen': '♛',
      'black-king': '♚',
    };
    return symbols[`${piece.color}-${piece.type}`];
  };

  return (
    <div
      onClick={onClick}
      className={`
        w-[calc(11vw-1rem)] h-[calc(11vw-1rem)] sm:w-[calc(8vw-1rem)] sm:h-[calc(8vw-1rem)] md:w-16 md:h-16 
        flex items-center justify-center text-2xl sm:text-3xl md:text-4xl
        transition-all duration-200 cursor-pointer relative
        ${isLight ? 'bg-amber-50' : 'bg-amber-800'}
        ${isSelected ? 'ring-4 ring-blue-500 ring-inset' : ''}
        ${isInCheck ? 'ring-4 ring-red-500 ring-inset' : ''}
        hover:after:absolute hover:after:inset-0 hover:after:bg-blue-500/20
        after:transition-opacity after:duration-200 after:ease-in-out
        group
      `}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500/20" />
      )}
      <span 
        className={`
          select-none transform transition-transform relative z-10
          ${piece?.color === 'white' 
            ? 'text-white fill-current filter drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]' 
            : 'text-gray-900'}
          ${piece?.color === 'white' && !isLight 
            ? 'drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]' 
            : ''}
        `}
        style={{
          WebkitTextStroke: piece?.color === 'white' ? '1px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        {getPieceSymbol(piece)}
      </span>
    </div>
  );
};
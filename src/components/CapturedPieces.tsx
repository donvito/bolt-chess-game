import React from 'react';
import { Piece } from '../types';

interface CapturedPiecesProps {
  pieces: Piece[];
  color: 'white' | 'black';
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({ pieces, color }) => {
  const getPieceSymbol = (piece: Piece): string => {
    const symbols: Record<string, string> = {
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
    return symbols[`${piece.color}-${piece.type}`] || '';
  };

  return (
    <div className="bg-gray-700/30 rounded-xl p-3 sm:p-4 h-full">
      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">
        Captured {color} pieces
      </h3>
      <div className="flex flex-wrap gap-1">
        {pieces.map((piece, index) => (
          <span
            key={index}
            className={`text-xl sm:text-2xl ${
              piece.color === 'white'
                ? 'text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]'
                : 'text-gray-900'
            }`}
          >
            {getPieceSymbol(piece)}
          </span>
        ))}
      </div>
    </div>
  );
};
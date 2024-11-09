import React from 'react';
import { Move } from '../types';
import { ScrollText } from 'lucide-react';

interface MoveHistoryProps {
  moves: Move[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <div className="bg-gray-700/30 rounded-xl p-3 sm:p-4">
      <h3 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 flex items-center gap-2">
        <ScrollText className="w-4 h-4" />
        Move History
      </h3>
      <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
        {moves.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No moves yet</p>
        ) : (
          <div className="space-y-1">
            {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr_1fr] gap-2 text-sm items-center"
              >
                <span className="text-gray-500 w-6">{i + 1}.</span>
                <span className="text-white">{moves[i * 2]?.notation}</span>
                <span className="text-gray-300">
                  {moves[i * 2 + 1]?.notation || ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
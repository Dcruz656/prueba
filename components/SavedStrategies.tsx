
import React from 'react';
import type { SearchStrategy } from '../types';
import { TrashIcon } from './Icons';

interface SavedStrategiesProps {
  strategies: SearchStrategy[];
  onRemove: (index: number) => void;
}

const SavedStrategies: React.FC<SavedStrategiesProps> = ({ strategies, onRemove }) => {

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(strategies, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "estrategias_guardadas.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Estrategias Guardadas</h2>
        <button
          onClick={handleDownload}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 rounded-md transition-colors text-sm"
        >
          Descargar (.json)
        </button>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
        {strategies.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No tienes estrategias guardadas.</p>
        ) : (
          <ul className="divide-y divide-slate-700">
            {strategies.map((strategy, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div>
                    <p className="font-semibold text-slate-300">{strategy.title}</p>
                    <p className="text-sm text-slate-400 truncate max-w-xs sm:max-w-md md:max-w-lg">{strategy.advancedQuery}</p>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="p-2 rounded-full text-slate-400 hover:bg-red-900/50 hover:text-red-400 transition-colors"
                  title="Eliminar estrategia"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedStrategies;

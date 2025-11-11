
import React, { useState } from 'react';
import type { SearchStrategy } from '../types';
import { CopyIcon, CheckIcon, SaveIcon } from './Icons';

interface StrategyCardProps {
  strategy: SearchStrategy;
  onSave: (strategy: SearchStrategy) => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onSave }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `
Estrategia: ${strategy.title}
Descripción: ${strategy.description}
Palabras Clave: ${strategy.keywords.join(', ')}
Búsqueda Avanzada: ${strategy.advancedQuery}
Fuentes Recomendadas: ${strategy.recommendedSources.join(', ')}
    `.trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-cyan-400">{strategy.title}</h3>
          <p className="text-slate-400 mt-1">{strategy.description}</p>
        </div>
        <div className="flex space-x-2">
            <button
                onClick={() => onSave(strategy)}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                title="Guardar estrategia"
            >
                <SaveIcon className="w-5 h-5" />
            </button>
            <button
                onClick={handleCopy}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                title="Copiar estrategia"
            >
                {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-slate-300">Palabras Clave Sugeridas:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {strategy.keywords.map((kw, i) => (
              <span key={i} className="bg-slate-700 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-300">Ejemplo de Búsqueda Avanzada:</h4>
          <pre className="bg-slate-900/70 text-cyan-300 text-sm p-3 mt-2 rounded-md overflow-x-auto">
            <code>{strategy.advancedQuery}</code>
          </pre>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-300">Fuentes Recomendadas:</h4>
          <ul className="list-disc list-inside mt-2 text-slate-400 space-y-1">
            {strategy.recommendedSources.map((src, i) => (
              <li key={i}>{src}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;

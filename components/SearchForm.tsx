
import React from 'react';

interface SearchFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ topic, setTopic, onGenerate, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(topic);
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-topic" className="block text-lg font-medium text-slate-300 mb-2">
          Describe brevemente lo que buscas
        </label>
        <textarea
          id="search-topic"
          rows={4}
          className="w-full bg-slate-900/70 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 placeholder-slate-500"
          placeholder="Ej: El impacto de las energías renovables en la economía de México..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full flex justify-center items-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </>
          ) : (
            'Generar Estrategias de Búsqueda'
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;


import React, { useState } from 'react';
import type { SearchStrategy } from './types';
import { generateSearchStrategies } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import StrategyCard from './components/StrategyCard';
import Loader from './components/Loader';
import SavedStrategies from './components/SavedStrategies';

function App() {
  const [topic, setTopic] = useState<string>('');
  const [strategies, setStrategies] = useState<SearchStrategy[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedStrategies, setSavedStrategies] = useLocalStorage<SearchStrategy[]>('savedStrategies', []);

  const handleGenerate = async (currentTopic: string) => {
    if (!currentTopic.trim()) {
      setError('Por favor, describe lo que buscas.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setStrategies(null);
    try {
      const result = await generateSearchStrategies(currentTopic);
      setStrategies(result);
    } catch (e) {
      console.error(e);
      setError('Hubo un error al generar las estrategias. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveStrategy = (strategy: SearchStrategy) => {
    if (!savedStrategies.some(s => s.title === strategy.title && s.advancedQuery === strategy.advancedQuery)) {
      setSavedStrategies([...savedStrategies, strategy]);
    }
  };

  const handleRemoveStrategy = (index: number) => {
    const newSaved = [...savedStrategies];
    newSaved.splice(index, 1);
    setSavedStrategies(newSaved);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main>
          <SearchForm
            topic={topic}
            setTopic={setTopic}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          
          {isLoading && <Loader />}
          
          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}
          
          {strategies && (
            <div className="mt-10 space-y-6">
              <h2 className="text-2xl font-bold text-center text-cyan-400">Estrategias de Búsqueda Sugeridas</h2>
              {strategies.map((strategy, index) => (
                <StrategyCard 
                  key={index} 
                  strategy={strategy} 
                  onSave={handleSaveStrategy}
                />
              ))}
            </div>
          )}

          {savedStrategies.length > 0 && (
            <SavedStrategies 
              strategies={savedStrategies} 
              onRemove={handleRemoveStrategy} 
            />
          )}
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Desarrollado con React, Tailwind CSS y la API de Gemini.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

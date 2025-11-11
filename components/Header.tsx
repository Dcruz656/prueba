
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
        Estrategia de Búsqueda Inteligente
      </h1>
      <p className="text-lg text-slate-400">
        Transforma tus ideas en búsquedas de experto con la ayuda de IA.
      </p>
    </header>
  );
};

export default Header;

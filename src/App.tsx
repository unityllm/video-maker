import React from 'react';
import { Editor } from './components/Editor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Remotion Video Creator</h1>
        </div>
      </header>
      <main>
        <Editor />
      </main>
    </div>
  );
}

export default App;
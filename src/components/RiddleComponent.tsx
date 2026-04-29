import React, { useState } from 'react';

const RiddleComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'hint' | 'error'>('error');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = 'banoffee';
    const userInput = input.toLowerCase().trim();
    if (userInput === correctAnswer.toLowerCase()) {
      setMessage('Correto! banoffee é a resposta. Parabéns por desvendar o enigma. Para a etapa final e descobrir seu destino, solicite ao Homem mais sortudo do mundo(por ter você) a próxima pista. Você tem um sorriso tão lindo que ilumina tudo ao redor');
      setMessageType('success');
    } else if (userInput.includes('doce') || userInput.includes('torta')) {
      setMessage('Você entendeu o conceito, siga neste caminho');
      setMessageType('hint');
    } else {
      setMessage('Errado! Tente novamente.');
      setMessageType('error');
    }
    setShowMessage(true);
    // setTimeout(() => setShowMessage(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-gray-800">
          Não vim de padaria, não vim de confeitaria. Nasci de mãos que nunca tinham me feito antes. Carrego três camadas, mas nenhuma é acaso — cada uma foi escolhida pra você. Sou doce, mas não sou simples. Sou a primeira vez de quem quis acertar. O que sou eu?
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <div className="flex items-center bg-[#f0f4f9] rounded-full px-4 py-2 w-full max-w-md shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua resposta..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 border border-gray-400 rounded-full px-2 py-1"
              />
            <button
              type="submit"
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1 transition-colors"
              >
              Enviar
            </button>
          </div>
        </form>
        {showMessage && (
          <div className={`mt-4 ${messageType === 'success' ? 'text-green-600' : messageType === 'hint' ? 'text-yellow-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiddleComponent;

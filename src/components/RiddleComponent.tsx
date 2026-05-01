import React, { useState } from 'react';

const RiddleComponent: React.FC = () => {
  const [stage, setStage] = useState<1 | 2>(1);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'hint' | 'error'>('error');
  const [showMessage, setShowMessage] = useState(false);

  const binaryPuzzle = '00110010 00110000 10110000 00100000 00110111 00100111 00100000 00110010 00110110 00101110 00111000 00110110 00100010 00100000 01010011 00100000 00110100 00110100 10110000 00100000 00110001 00110011 00100111 00100000 00110111 00101110 00110110 00110011 00100010 00100000 01001111';
  const finalAnswer = 'Inhotim';
  const acceptedBinaryAnswers = [
    '20° 7\' 26.86" S 44° 13\' 7.63" O',
    '20° 7\' 26.86" S 44° 13\' 7.63" Oeste',
    '20 7 26.86 S 44 13 7.63 O',
    '20 7 26.86 S 44 13 7.63 Oeste',
  ];

  const normalize = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[º°]/g, '°')
      .replace(/[’‘`]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/oeste/g, 'o')
      .replace(/\s+/g, ' ');
  };

  const isBinaryCorrect = (answer: string) => {
    const normalizedAnswer = normalize(answer);
    return acceptedBinaryAnswers.some((valid) => normalize(valid) === normalizedAnswer);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = input.trim();

    if (stage === 1) {
      if (isBinaryCorrect(userInput)) {
        setMessage('Correto! Você decodificou o binário e desbloqueou a próxima etapa. Agora responda o destino final.');
        setMessageType('success');
        setStage(2);
        setInput('');
      } else if (userInput.match(/\d/)) {
        setMessage('Quase lá. O binário forma coordenadas geográficas, escreva o resultado exatamente.');
        setMessageType('hint');
      } else {
        setMessage('Errado! Tente novamente com as coordenadas do binário.');
        setMessageType('error');
      }
    } else {
      const normalizedAnswer = userInput.toLowerCase();
      if (normalizedAnswer === finalAnswer.toLowerCase()) {
        setMessage('Perfeito! Inhotim é a resposta final. Você concluiu a próxima etapa.');
        setMessageType('success');
      } else if (normalizedAnswer.includes('parque') || normalizedAnswer.includes('museu')) {
        setMessage('Você está no caminho certo, pense em um destino especial.');
        setMessageType('hint');
      } else {
        setMessage('Errado! A resposta final ainda não é essa.');
        setMessageType('error');
      }
    }

    setShowMessage(true);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-xl md:text-3xl font-light leading-relaxed mb-8 text-blue-800">
          Você resolveu cada charada, cada pista, cada detalhe da nossa história. Desde o dia 14 de dezembro, cada momento ao seu lado virou minha parte favorita do dia.
        </h1>

        {stage === 1 ? (
          <>
            {/* <h2 className="text-lg md:text-2xl font-medium mb-4 text-gray-700">Descodifique o binário abaixo:</h2> */}
            <p className="text-base md:text-xl font-mono leading-relaxed break-words bg-slate-100 p-4 rounded-lg text-gray-800">
              {binaryPuzzle}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg md:text-2xl font-medium mb-4 text-gray-700">20° 7' 26.86" S 44° 13' 7.63" O</h2>
            {/* <p className="text-base md:text-xl leading-relaxed mb-6 text-gray-600">
              Agora digite o destino final que o enigma aponta.
            </p> */}
          </>
        )}

        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <div className="flex items-center bg-[#f0f4f9] rounded-full px-4 py-2 w-full max-w-md shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={stage === 1 ? 'Digite as coordenadas decodificadas...' : 'Digite a resposta final...'}
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

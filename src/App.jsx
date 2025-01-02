// Css
import './App.css'

//React
import { useCallback, useEffect, useState } from 'react';

//Dados
import { wordsList } from './data/words.js';

//Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
   {id: 1, name: "start"},
   {id: 2, name: "game"},
   {id: 3, name: "end"},
];

function App() {
   const [gameStage, setGameStage] = useState(stages[0].name);
   const [words] = useState(wordsList);

   //Inicializa o jogo
   const startGame = () => {
      setGameStage(stages[1].name);
   }

   // Processa o input do usuário
   const verifyLetter = () => {
      setGameStage(stages[2].name);
   }

   // Reinicia o jogo
   const restartGame = () => {
      setGameStage(stages[0].name);
   }

   return (
      <div className='App'>
         { gameStage === 'start' && <StartScreen startGame={startGame} /> }
         { gameStage === 'game' && <Game verifyLetter={verifyLetter} /> }
         { gameStage === 'end' && <GameOver restart={restartGame} /> }
      </div>
   )
}

export default App;
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
   { id: 1, name: "start" },
   { id: 2, name: "game" },
   { id: 3, name: "end" },
];

function App() {
   const [gameStage, setGameStage] = useState(stages[0].name);
   const [words] = useState(wordsList);

   const [pickedCategory, setPickedCategory] = useState('');
   const [pickedWord, setPickedWord] = useState('');
   const [letters, setLetters] = useState([]);

   const [letrasAdvinhadas, setLetrasAdvinhadas] = useState([]);
   const [letrasErradas, setLetrasErradas] = useState([]);
   const [tentativas, setTentativas] = useState(4);
   const [pontuacao, setPontuacao] = useState(0);

   const pickWordAndCategory = () => {
      const categories = Object.keys(words);

      // Função que retorna uma categoria aleatória
      const category = categories[Math.floor(Math.random() * categories.length)];
      // Função que retorna uma palavra aleatória da categoria escolhida
      const word = words[category][Math.floor(Math.random() * words[category].length)];
      //Utilizamos a função Math.floor para arredondar o número para baixo e Math.random para gerar um número aleatório entre 0 e 1.

      return { category, word };
   }

   //Inicializa o jogo
   const startGame = () => {
      // Seleciona a categoria e a palavra.
      const { word, category } = pickWordAndCategory();

      // Criando uma array com as letras da palavra escolhida
      let wordLetters = word.split('')
      wordLetters = wordLetters.map((letter) => letter.toLowerCase());

      // Preenchendo os estados com as informações.
      setPickedCategory(category);
      setPickedWord(word);
      setLetters(wordLetters);

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
         {gameStage === 'start' && <StartScreen startGame={startGame} />}
         {gameStage === 'game' && <Game
            verifyLetter={verifyLetter}
            pickedCategory={pickedCategory}
            pickedWord={pickedWord}
            letters={letters}
            letrasAdvinhadas={letrasAdvinhadas}
            letrasErradas={letrasErradas}
            tentativas={tentativas}
            pontuacao={pontuacao}
         />}
         {gameStage === 'end' && <GameOver restart={restartGame} />}
      </div>
   )
}

export default App;
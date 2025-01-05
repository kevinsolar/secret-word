import './Game.css';
import { useState, useRef } from 'react';

const Game = ({
   verifyLetter,
   pickedCategory,
   pickedWord,
   letters,
   letrasAdvinhadas,
   letrasErradas,
   tentativas,
   pontuacao
}) => {

   const [letter, setLetter] = useState('');
   const letterInputRef = useRef(null);

   const handleSubmit = (event) => {
      event.preventDefault();
      verifyLetter(letter);
      setLetter("");

      // Usando o Ref do React, que tem a função parecida com o document.querySelector, faço ele focar no input novamente com o .current.focus() do JS.
      letterInputRef.current.focus();
   }


   return (
      <div className='game'>
         <p className="points">
            <span>Pontuação: {pontuacao}</span>
         </p>
         <h1>Advinhe a palavra:</h1>
         <h3 className='tip'>
            Dica: <span>{pickedCategory}</span>
         </h3>
         <p>Voce ainda tem {tentativas} tentativa(s)...</p>
         <div className="wordContainer">
            {letters.map((letter, i) => (
               letrasAdvinhadas.includes(letter) ?
                  (<span key={i} className='letter'>
                     {letrasAdvinhadas.includes(letter) ? letter : '_'}
                  </span>) :
                  (<span key={i} className='blankSquare'></span>)
            ))}
         </div>

         <div className="letterContainer">
            <p>Tente advinhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  name='letter'
                  maxLength="1"
                  placeholder='_'
                  required
                  onChange={(e) => setLetter(e.target.value)}
                  value={letter}
                  ref={letterInputRef}
               />
               <button className="btn-default">Tentar</button>
            </form>
         </div>

         <div className="wrongLetter">
            <p>Letras utilizadas:</p>
            {letrasErradas.map((letter, i) => (
               <span key={i}>{letter}, </span>
            ))}
         </div>
      </div>
   );
};

export default Game;
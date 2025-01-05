import './Game.css';

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
            <form>
               <input type="text" name='letter' maxLength="1" placeholder='_' required />
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
import './Game.css';

const Game = ({ verifyLetter }) => {
   return (
      <div className='game'>
         <p className="points">
            <span>Pontuação: 000</span>
         </p>
         <h1>Advinhe a palavra:</h1>
         <h3 className='tip'>
            Dica: <span>...</span>
         </h3>
         <p>Voce ainda tem XX tentativa(s)...</p>
         <div className="wordContainer">
            <span className='letter'>A</span>
            <span className='blankSquare'></span>
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
            <span>a, </span>
            <span>b, </span>
         </div>
      </div>
   );
};

export default Game;
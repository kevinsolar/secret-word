import './Game.css';

const Game = ({ verifyLetter }) => {
   return (
      <div>
         <h2>Game</h2>
         <button className="btn-default" onClick={verifyLetter}>Finalize o jogo</button>
      </div>
   );
};

export default Game;
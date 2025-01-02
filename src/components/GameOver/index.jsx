import './GameOver.css';

const GameOver = ({ restart }) => {
   return (
      <div>
         <h2>Game Over</h2>
         <button className="btn-default" onClick={restart}>Tentar novamente</button>
      </div>
   );
};

export default GameOver;
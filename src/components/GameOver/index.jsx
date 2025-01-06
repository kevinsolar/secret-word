import "./GameOver.css";

const GameOver = ({ restart, pontuacao }) => {
	return (
		<div>
			<h1>Game Over</h1>
			<h2>
				A sua pontuação foi: <span>{pontuacao}</span>
			</h2>

			<button className="btn-default" onClick={restart}>
				Tentar novamente
			</button>
		</div>
	);
};

export default GameOver;

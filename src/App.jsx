// Css
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//Dados
import { wordsList } from "./data/words.js";

//Componentes
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
	{ id: 1, name: "start" },
	{ id: 2, name: "game" },
	{ id: 3, name: "end" },
];

const quantidadeTentativas = 4;

function App() {
	const [gameStage, setGameStage] = useState(stages[0].name);
	const [words] = useState(wordsList);

	const [pickedCategory, setPickedCategory] = useState("");
	const [pickedWord, setPickedWord] = useState("");
	const [letters, setLetters] = useState([]);

	const [letrasAdvinhadas, setLetrasAdvinhadas] = useState([]);
	const [letrasErradas, setLetrasErradas] = useState([]);
	const [tentativas, setTentativas] = useState(quantidadeTentativas);
	const [pontuacao, setPontuacao] = useState(0);

	const pickWordAndCategory = useCallback(() => {
		const categories = Object.keys(words);

		// Função que retorna uma categoria aleatória
		const category =
			categories[Math.floor(Math.random() * categories.length)];
		// Função que retorna uma palavra aleatória da categoria escolhida
		const word =
			words[category][Math.floor(Math.random() * words[category].length)];
		//Utilizamos a função Math.floor para arredondar o número para baixo e Math.random para gerar um número aleatório entre 0 e 1.

		return { category, word };
	}, [words]);

	//Inicializa o jogo
	const startGame = useCallback(() => {
		// Vamos adicionar a limpeza das letras já utilizadas aqui, para evitar de começar novamente o jogo em casa de WIN, com letras já utilizadas antes...
		clearLetterStates();

		// Seleciona a categoria e a palavra.
		const { word, category } = pickWordAndCategory();

		// Criando uma array com as letras da palavra escolhida
		let wordLetters = word.split("");
		wordLetters = wordLetters.map((letter) => letter.toLowerCase());

		// Preenchendo os estados com as informações.
		setPickedCategory(category);
		setPickedWord(word);
		setLetters(wordLetters);

		setGameStage(stages[1].name);
	}, [pickWordAndCategory]);

	// Processa o input do usuário
	const verifyLetter = (letter) => {
		const normalizedLetter = letter.toLowerCase();

		// Verifica se a letra já foi escolhida
		if (
			letrasAdvinhadas.includes(normalizedLetter) ||
			letrasErradas.includes(normalizedLetter)
		) {
			return;
		}

		// Adiciona a letra adivinhada ou retira uma tentativa do jogador...
		if (letters.includes(normalizedLetter)) {
			setLetrasAdvinhadas([...letrasAdvinhadas, normalizedLetter]);
		} else {
			setLetrasErradas([...letrasErradas, normalizedLetter]);

			// Função para diminuir as tentivas caso estejam erradas.
			// Esse actual como o nome diz, pega o estado atual do State utilizado, é um hook do próprio React

			setTentativas((actualTentativas) => actualTentativas - 1);
		}
	};

	const clearLetterStates = () => {
		setLetrasAdvinhadas([]);
		setLetrasErradas([]);
	};

	//Verifica tentativas
	useEffect(() => {
		if (tentativas <= 0) {
			//Reset all states
			clearLetterStates();

			setGameStage(stages[2].name);
		}
	}, [tentativas]);

	//Verifica se ganhou
	useEffect(() => {
		const letrasUnicas = [...new Set(letters)];

		//Condição de vitória
		if (letrasAdvinhadas.length === letrasUnicas.length && gameStage === stages[1].name) {
			//Add potuacao max
			setPontuacao((actualPontuacao) => (actualPontuacao += 100));
			startGame();
		}
	}, [letrasAdvinhadas, letters, startGame]);

	// Reinicia o jogo
	const restartGame = () => {
		setPontuacao(0);
		setTentativas(quantidadeTentativas);

		setGameStage(stages[0].name);
	};

	return (
		<div className="App">
			{gameStage === "start" && <StartScreen startGame={startGame} />}
			{gameStage === "game" && (
				<Game
					verifyLetter={verifyLetter}
					pickedCategory={pickedCategory}
					pickedWord={pickedWord}
					letters={letters}
					letrasAdvinhadas={letrasAdvinhadas}
					letrasErradas={letrasErradas}
					tentativas={tentativas}
					pontuacao={pontuacao}
				/>
			)}
			{gameStage === "end" && (
				<GameOver restart={restartGame} pontuacao={pontuacao} />
			)}
		</div>
	);
}

export default App;

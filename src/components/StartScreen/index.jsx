import './StartScreen.css';

const StartScreen = () => {
   return (
      <div className="start">
         <h1>Secret Word</h1>
         <p>Clique no botao para comecar a jogar</p>
         <button className='btn-default'>Iniciar</button>
      </div>
   )
}

export default StartScreen;
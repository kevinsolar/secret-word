const Botao = ({ children, startGame }) => {
   return <button className='btn-default' onClick={startGame}>{children}</button>;
}

export default Botao;
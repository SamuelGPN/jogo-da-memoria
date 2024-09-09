import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './HomePage.css'
// Componente da página inicial
function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/game'); // Redireciona para a página "/game"
    };

    return (
    <div className="container">
        <header>
            <h1>Jogo da memória</h1>
        </header>

        <main>
            <div className="sobre">
                <p>O jogo da memória é um clássico que testa a habilidade de lembrar e combinar pares de cartas ou imagens ocultas, 
                exigindo concentração e boa memória visual. Suas origens remontam a práticas antigas de memorização, e a versão moderna 
                ganhou popularidade no século XX, sendo conhecida por diferentes nomes ao redor do mundo. Popular entre crianças, o jogo 
                é utilizado tanto como ferramenta pedagógica quanto como diversão familiar, com versões que vão do tradicional ao digital, 
                permanecendo relevante até hoje.</p>
            </div>
        
            <div className="regras">
                <br />
                <h3>Regras do jogo</h3>
                <p><strong>Número de Jogadores:</strong> 1 jogador.</p>
                <p><strong>Objetivo:</strong> O objetivo é encontrar e combinar todos os pares de cartas idênticas com o menor número de tentativas possível.</p>
                <br />
        
                <h3>Como jogar</h3>
                <p><strong>Jogando:</strong>
                Escolha duas cartas e vire-as para cima.
                Se as cartas formarem um par, retire-as do tabuleiro e continue jogando.
                Se as cartas não formarem um par, vire-as novamente para baixo e tente lembrar suas posições.</p>
                <p><strong>Memorização:</strong> Concentre-se em memorizar a posição das cartas que você já virou para poder fazer pares em jogadas futuras.</p>
                <p><strong>Finalização:</strong> O jogo termina quando você encontrar todos os pares de cartas e removê-los do tabuleiro.</p>
                <p><strong>Objetivo Final:</strong> Tente completar o tabuleiro com o menor número de jogadas possível, desafiando a si mesmo 
                a melhorar sua memória a cada nova partida.</p>
                <br />
            </div>
        
            <div className="botao">
                <button className="btn" onClick={handleClick}>Jogar</button>
            </div>
        </main>        
    
        <footer>  
            <h3 className="rodape0">Desenvolvido por:</h3>
            <div className="rodape1">
                <div>                
                    <p>César Augusto da Costa</p>
                    <p>Fábio Henrique Manso Micheloto,</p>
                    <p>Larissa Alves de Souza,</p>
                    <p>Marina Valença Alencar Guarato,</p>
                </div>
                <div>
                    <p>Rafael Alexandre de Nardi Barboza,</p>
                    <p>Samuel Gabriel Pereira Nogueira,</p>
                    <p>Tiago Gomes Cabana</p>
                </div>
            </div>

        </footer>
    </div>
    );
}


export default HomePage;
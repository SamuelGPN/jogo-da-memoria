import React, { useState, useEffect } from "react";
import "./GamePage.css";
import axios from 'axios';

function GamePage() {
  const [inputValue, setInputValue] = useState(""); //Estado do input Nome
  const [min, setMin] = useState(0); //Estado dos segundos
  const [seg, setSeg] = useState(0); //Estado dos minutos
  const [isActive, setIsActive] = useState(false); //Para ativar o timer
  const [numZeroseg, setNumS] = useState("0"); //Estado do zero a esquerda don segundo
  const [numZeromin, setNumM] = useState("0"); //Estado do zero a esquerda do minutos

  const [itens, setItens] = useState([]); // Estado inicial da lista
  const [visibilidade, setVisibilidade] = useState({}); // Estado para controlar visibilidade das imagens
  const [nivel, setNivel] = useState(1); //Estado para o nivel
  const [clicadas, setClicadas] = useState([]); // Estado para armazenar as cartas clicadas
  const [paresEncontrados, setParesEncontrados] = useState([]); // Estado para armazenar os pares encontrados
  const [nCartas, setNCartas] = useState([]); //Estado para guardar o valor do numero de cartas


  const [data, setData] = useState('');

  // Mostra a lista de colocados
  useEffect(() => {
    let getNivel;
    if(nivel === 1){
      getNivel = 'http://localhost:8080/api/jogo/hello?dificuldade=fácil';
    }else if(nivel === 2){
      getNivel = 'http://localhost:8080/api/jogo/hello?dificuldade=médio';
    }else if(nivel === 3){
      getNivel = 'http://localhost:8080/api/jogo/hello?dificuldade=difícil'
    }else{

    }
    axios.get(getNivel)
      .then(response => {

        setData(response.data);
      })
      
      .catch(error => {
        console.log("Dados de erro recebidos:", error.response)       
        console.error("Erro ao buscar dados da API", error);
      });
  }, [nivel]);


  //**  Input p/ digitar o nome */
  const handleImputChange = (event) => {
    //Ao escrever no imput cada letra digitada ira setar o valor ndo input
    if (isActive) {
      window.alert(
        "Você não pode alterar o nome, [CONCLUA O JOGO] ou [RECARREGUE A PAGINA]"
      );
    } else {
      setInputValue(event.target.value);
    }
  };

  //********TEMPO DO JOGO */
  useEffect(() => {
    let intervalo = null;

    if (isActive && min < 60) {
      if (paresEncontrados.length > nCartas.length - 2) {
        //Condição para TERMINAR O JOGO***************
        setTimeout(() => {
          alert(`Fim de jogo - Seu tempo foi de ${min} minutos e ${seg} segundos`);
          let nivels = "";
          let segundos;

          if(seg > 9){
            segundos = seg;
          }else{
            segundos = `0${seg}`
          }

          if(nivel === 1){
            nivels = 'fácil'
          }else if(nivel === 2){
            nivels = 'médio'
          }else{
            nivels = 'difícil'
          }
          let tempoJogoData = `${min}.${segundos}` //É o que vai ser salvo no banco de dados
          let tempoJogoFormatado = `${min}min e ${segundos}seg`
          axios.post('http://localhost:8080/saveRanking', { //Faz o envio dos dados para o BD
            nome: inputValue,
            tempo: tempoJogoData,
            tempoFormatado: tempoJogoFormatado,
            dificuldade: nivels,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            console.log('Ranking salvo com sucesso:', response.data);
        })
        .catch(function(error) {
            console.error('Erro ao salvar o ranking:', error);
        });
        
          setIsActive(false); // Desativa o tempo do Jogo************
          alert("O jogo será reinicializado");
          window.location.reload();
        }, 100); // Aguarda um breve momento antes de exibir o alert
      } else {
        intervalo = setInterval(() => {
          //setInterval Função global do JavaScript
          setSeg((time) => time + 1); //Seta o intervalo de tempo em que sera acrescentado +1 no segundos
        }, 1000); //tempo em ms
        
        if (seg > 9) {
          setNumS(""); //Esconde o zero a esquerda do segundos
          if (seg === 60) {
            setSeg(0); // Zera os segundos
            setMin(min + 1); //Seta os minutos adicionandio +1
            setNumS("0"); //Acrescenta o zero na frente dos segundos
          }
        }
        if (min > 9) {
          setNumM(""); //Esconde o zero a esquerda dos minutos
        }
        
      }
    } else if (!isActive && seg !== 0) {
      clearInterval(intervalo);
    }
    
    
    return () => clearInterval(intervalo);
  }, [nivel, inputValue, isActive, seg, min, nCartas, paresEncontrados]);

  


  
  
  // Chame a função saveRanking quando necessário, por exemplo, em um botão
  // <button onClick={saveRanking}>Salvar Ranking</button>
  

  //ATIVA o tempo do Jogo e Adiciona as cartas no jogo************
  const startTimerEJogo = () => {
    if(isActive){
      window.alert('VOCÊ JÁ ESTÁ JOGANDO, TERMINE O JOGO OU REINICIE A PÁGINA...')
    }else{
      setIsActive(true); //Ativa o tempo do Jogo************       

      //Adiciona o tanto de cartas na tela conforme o nivel
      const numCartas = [];
      let maxCartas = 10;
  
      if (nivel === 1) {
        maxCartas = 10;
      } else if (nivel === 2) {
        maxCartas = 20;
      } else if (nivel === 3) {
        maxCartas = 30;
      } else {
        alert("Erro");
      }
  
      setItens([]); // Limpa o array de itens
      setParesEncontrados([]); // Limpa os pares encontrados
      setNCartas([]); //Limpa o numero de cartas
  
      for (let n = 1; n <= maxCartas; n++) {
        numCartas.push(`/figuras/figura${n}.png`); //Cria um array com valores unicos
      }
  
      // Duplicar as cartas (para um jogo de memória)
      const cartasDuplicadas = [...numCartas, ...numCartas];
  
      // Embaralha o array de cartas duplicadas, a função recebe a constante cartasDuplicadas
      const cartasEmbaralhadas = embaralharArray(cartasDuplicadas);
      // Atualiza o estado uma vez com todas as cartas embaralhadas
      setItens(cartasEmbaralhadas);
      setNCartas(cartasEmbaralhadas);
    };
  
    function embaralharArray(array) {
      //Função que embaralha as cartas e é chamada em adicionarItens
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição
      }
      return array;
    }
    
  }

  /*********** Mudar Nivel  */
  const mudarNivel = (event) => {
    const valor = parseInt(event.target.value, 10); //10 no final pois converte o numero na base 10
    if(isActive){
      window.alert('NÃO É MPOSSIVEL MUDAR O SEU NÍVEL NO MOMENTO!')
    }
    else{
      setNivel(valor);
    }    
  };

  /***** Visibilidade e Dinâmica das cartas */
  const alternaVisibilidade = (index) => {
    //let valorCarta = index;
    // console.log(valorCarta)

    console.log(nCartas); //Ver o numero de cartas

    if (clicadas.length === 2) {
      return; // Impede que mais de duas cartas sejam viradas ao mesmo tempo
    } /*******/

    setClicadas((prevClicadas) => [...prevClicadas, index]);

    setVisibilidade((prev) => ({
      ...prev,
      [index]: "inline",
    }));

    if (clicadas.length === 1) {
      const primeiroIndex = clicadas[0];
      console.log(primeiroIndex);
      const segundoIndex = index;

      if (primeiroIndex !== segundoIndex) {
        //Condição para n fazer par com a mesma carta

        if (itens[primeiroIndex] === itens[segundoIndex]) {
          setParesEncontrados((prevPares) => [
            ...prevPares,
            primeiroIndex,
            segundoIndex,
          ]);
          setClicadas([]);
          console.log(paresEncontrados);
        } else {
          setTimeout(() => {
            setVisibilidade((prev) => ({
              ...prev,
              [primeiroIndex]: "none",
              [segundoIndex]: "none",
            }));
            setClicadas([]);
          }, 500); // Espera 1/2 segundo antes de virar as cartas de volta
        }
      } else {
        //Condição para n fazer par com a mesma carta

        alert("Você não pode clicar 2x na mesma carta");
        setTimeout(() => {
          setVisibilidade((prev) => ({
            ...prev,
            [primeiroIndex]: "none",
            [segundoIndex]: "none",
          }));
          setClicadas([]);
        }, 500);
      }
    } /*******/
  };

  return (
    <div>
      <header>
        <h1>Jogo da Memória</h1>
      </header>

      <section className="NomeNivel">
        <div>
          <p>
            <b>Digite seu nome:</b>
          </p>
          <p>
            <input
              type="text"
              value={inputValue}
              onChange={handleImputChange}
              placeholder="Nome"
            />
          </p>
          <label for="opcoes">
            <b>Nível:</b>
          </label>
          <select id="opcoes" name="opcoes" value={nivel} onChange={mudarNivel}>
            <option value={1}>Fácil</option>
            <option value={2}>Médio</option>
            <option value={3}>Difícil</option>
          </select>
          <input type="submit" value="Jogar" onClick={startTimerEJogo} />
        </div>
      </section>

      <section className="jogo">
        <div className="tempo">
          <div className="myTime">
            <b>
              {" "}
              {inputValue} - Tempo: {numZeromin + min + ":" + numZeroseg + seg}
            </b>
          </div>
          <div className="timeRanker">
            <b>Tempo Record: </b>
          </div>
        </div>

        <div className="cartas-container">
          {itens.map((item, index) => (
            <div
              className="card"
              onClick={() => alternaVisibilidade(index)}
              style={{
                cursor: "pointer", //Adiciona um cursor de pointer para indicar que é clicável
                visibility: paresEncontrados.includes(index)
                  ? "visible"
                  : "visible",
              }}
              key={index}
            >
              <img
                className="img"
                src={item}
                alt="figura"
                style={{ display: visibilidade[index] || "none" }} // Define o display da imagem com base no estado
              />
            </div>
          ))}
        </div>
      </section>

      <section className="ranking">
        <div>
          <h2 className="textRank">
            <p>TOP 3 RANKING</p>
          </h2>
          {data && Array.isArray(data) ? (
            data.map((item, index) => (
              <div className="colocados" key={index}>
                <p>Nome: {item.nome}</p>
                <p>Tempo: {item.tempoFormatado}</p>
                <p>Dificuldade: {item.dificuldade}</p>
              </div> 
            ))
          ) : (
            <p>nenhum dado disponível...</p>
          )}
          {/* 
          <p className="posicao" id="pos1">
            1º - {}
          </p>
          <p className="posicao" id="pos2">
            2º - {" oii"}
          </p>
          <p className="posicao" id="pos3">
            3º - {" "}
          </p>
          */}
        </div>
      </section>
    </div>
  );
}

export default GamePage;

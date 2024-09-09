import React, { useState, useEffect } from "react";
import "./GamePage.css";

function GamePage() {
  const [inputValue, setImputValue] = useState("");

  const [min, setMin] = useState(0);
  const [seg, setSeg] = useState(0);
  const [isActive, setIsActive] = useState(false); //Para ativar o timer
  const [numZeroseg, setNumS] = useState("0");
  const [numZeromin, setNumM] = useState("0");




  
//**  Input p/ digitar o nome */
  const handleImputChange = (event) => {//Ao escrever no imput cada letra digitada ira setar o valor ndo input
    if(isActive){
        window.alert("Você não pode alterar o nome, [CONCLUA O JOGO] ou [RECARREGUE A PAGINA]")
    }else{
        setImputValue(event.target.value);
    }
    
  };

  //********TEMPO DO JOGO */
  useEffect(() => {
    let intervalo = null;
    if (isActive && min < 60) {
      intervalo = setInterval(() => {
        //setInterval Função global do JavaScript
        setSeg((time) => time + 1); //Seta o intervalo de tempo em que sera acrescentado +1 no segundos
      }, 100); //tempo em ms
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
    } else if (!isActive && seg !== 0) {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [isActive, seg, min]);

  const startTimer = () => {
    setIsActive(true);
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
            <input type="text" value={inputValue} onChange={handleImputChange} placeholder="Nome" />
          </p>
          <label for="opcoes">
            <b>Nível:</b>
          </label>
          <select id="opcoes" name="opcoes">
            <option value="opcao1">Fácil</option>
            <option value="opcao2">Médio</option>
            <option value="opcao3">Difícil</option>
          </select>
          <input type="submit" value="Jogar" onClick={startTimer} />
        </div>
      </section>

      <section className="jogo">
        <div className="tempo">
          <div className="myTime">
            <b> {inputValue} - Tempo: {numZeromin + min + ":" + numZeroseg + seg}</b>
          </div>
          <div className="timeRanker">
            <b>Tempo Record: </b>
          </div>
        </div>

        <div className="cartas-container">
          <div className="card">
            <p className="cards">a</p>
          </div>
          <div className="card">
            <p className="cards">a</p>
          </div>
          <div className="card">
            <p className="cards">e</p>
          </div>
          <div className="card">
            <p className="cards">e</p>
          </div>
          <div className="card">
            <p className="cards">i</p>
          </div>
          <div className="card">
            <p className="cards">i</p>
          </div>
          <div className="card">
            <p className="cards">o</p>
          </div>
          <div className="card">
            <p className="cards">o</p>
          </div>
          <div className="card">
            <p className="cards">u</p>
          </div>
          <div className="card">
            <p className="cards">u</p>
          </div>
        </div>
      </section>

      <section className="ranking">
        <div className="colocados">
          <h3 className="textRank">
            <p>TOP 3 RANKING</p>
          </h3>
          <p className="posicao" id="pos1">
            1º -{" "}
          </p>
          <p className="posicao" id="pos2">
            2º -{" "}
          </p>
          <p className="posicao" id="pos3">
            3º -{" "}
          </p>
        </div>
      </section>
    </div>
  );
}

export default GamePage;

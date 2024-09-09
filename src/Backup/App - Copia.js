import React, { useEffect, useState } from 'react';

function Apps() {
    const [itens, setItens] = useState([]); // Estado inicial da lista
    const [visibilidade, setVisibilidade] = useState({}); // Estado para controlar visibilidade das imagens
    const [nivel, setNivel] = useState(1)
    const [clicadas, setClicadas] = useState([]); // Estado para armazenar as cartas clicadas
    const [paresEncontrados, setParesEncontrados] = useState([]); // Estado para armazenar os pares encontrados
    const [nCartas, setNCartas] = useState([])

    function embaralharArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição
      }
      return array;
    }

    const adicionarItem = () => {
      const numCartas = []
      let maxCartas = 10;

      if(nivel === 1){
        maxCartas = 10
      }else if(nivel === 2){
        maxCartas = 20
      }else if(nivel === 3){
        maxCartas = 30
      }else{
        alert('Erro')
      }

      setItens([]); // Limpa o array de itens
      setParesEncontrados([]); // Limpa os pares encontrados
      setNCartas([])//Limpa o numero de cartas

      for(let n = 1; n <= maxCartas; n++){
        numCartas.push(`/figuras/figura${n}.png`) //Cria um array com valores unicos
      }

      // Duplicar as cartas (para um jogo de memória)
      const cartasDuplicadas = [...numCartas, ...numCartas];
  
      // Embaralha o array de cartas duplicadas, a função recebe a constante cartasDuplicadas
      const cartasEmbaralhadas = embaralharArray(cartasDuplicadas);
      // Atualiza o estado uma vez com todas as cartas embaralhadas
      setItens(cartasEmbaralhadas);
      setNCartas(cartasEmbaralhadas)      
    };


    /*********** Mudar Nivel  */  
    const mudarNivel = (event) => {
      const valor = parseInt(event.target.value, 10)//10 no final pois converte o numero na base 10
      setNivel(valor)
    }



    
    /***** Visibilidade das cartas */
    const alternaVisibilidade = (index) => {
      //let valorCarta = index;
     // console.log(valorCarta)
     
      console.log(nCartas)//Ver o numero de cartas

      if((paresEncontrados.length <= nCartas.length - 2)){ //Condição para terminar o jogo
        
        if (clicadas.length === 2) {
        
          return; // Impede que mais de duas cartas sejam viradas ao mesmo tempo
            
        }/*******/
  
        setClicadas((prevClicadas) => [...prevClicadas, index]);
  
        setVisibilidade((prev) => ({
            ...prev,
            [index]: 'inline',
        }));
  
        if (clicadas.length === 1) {
            const primeiroIndex = clicadas[0];
            console.log(primeiroIndex)
            const segundoIndex = index;

          if(primeiroIndex !== segundoIndex){//Condição para n fazer par com a mesma carta

            if (itens[primeiroIndex] === itens[segundoIndex]) {
              setParesEncontrados((prevPares) => [...prevPares, primeiroIndex, segundoIndex]);
              setClicadas([]);
              console.log(paresEncontrados)
              
            } else {
                setTimeout(() => {
                    setVisibilidade((prev) => ({
                        ...prev,
                        [primeiroIndex]: 'none',
                        [segundoIndex]: 'none',
                    }));
                    setClicadas([]);
                }, 500); // Espera 1/2 segundo antes de virar as cartas de volta
              }

          }else{ //Condição para n fazer par com a mesma carta

            alert('Você não pode clicar 2x na mesma carta')
            setTimeout(() => {
              setVisibilidade((prev) => ({
                ...prev,
                [primeiroIndex]: "none",
                [segundoIndex]: "none",
              }));
              setClicadas([]);
            }, 500);
          }
            
        }/*******/

      }else{
        alert('Fim de jogo')
      }
        
      


  };

    return (
        <div>
          <img className='card' src="/logo192.png" alt='MinhaImagem'></img>
          <div className='cartas-container'> 
            
            {itens.map((item, index) => (
              <div className='card' onClick={() => alternaVisibilidade(index)} 
              style={{
                cursor: 'pointer', //Adiciona um cursor de pointer para indicar que é clicável
                visibility: paresEncontrados.includes(index) ? 'visible' : 'visible',
              }}
              key={index} 
              >
                 <img className='img'src={item} alt='figura'style={{ display: visibilidade[index] || 'none' }} // Define o display da imagem com base no estado
                />
              </div>
            ))}  
            
          </div>        
            <button onClick={adicionarItem}>Adicionar Item</button>

            <select id="opcoes" name="opcoes" value={nivel} onChange={mudarNivel}>
              <option value={1}>Fácil</option>
              <option value={2}>Médio</option>
              <option value={3}>Difícil</option>
          </select>
        </div>
    );
}

export default Apps;

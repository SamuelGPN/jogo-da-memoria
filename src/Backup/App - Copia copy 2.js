import React, { useState } from 'react';

function Appsss() {
    const [itens, setItens] = useState([]); // Estado inicial da lista
    const [visibilidade, setVisibilidade] = useState({}); // Estado para controlar visibilidade das imagens
    const [nivel, setNivel] = useState(1)

    const adicionarItem = () => {
      const numCartas = []

      for(let n = 1; n <= 8; n++){
        numCartas.push(`/figuras/figura${itens.length + n}.png`) //Cria um array com valores unicos
      }

      setItens((prevItens) => [...prevItens, ...numCartas]); // Adiciona um novo item à lista
      //prevItens: Este parâmetro representa o valor atual do estado itens no momento em que o setItens é chamado.
      //...prevItens: Isso espalha (spread operator) todos os elementos do array atual prevItens no novo array.
      /*numCartas: Este é o novo item que você deseja
      adicionar ao array do itens, isso faz com que o array de intens
      já tenha os 8 itens prontos,
      agora basta então apaertar o botão adicionarItem para ele adicionar 
      as 8 tags conforme o numero de arrys presente em itens.*/
      if(nivel === 1){
        alert('nivel1')
      }else if(nivel === 2){
       alert('nivel2')
      }else if(nivel === 3){
       alert('nivel3')
      }else{
        alert('Erro')
      }
    };

    /*********** Mudar Nivel  */  
    const mudarNivel = (event) => {
      const valor = parseInt(event.target.value, 10)//10 no final pois converte o numero na base 10
      setNivel(valor)
    }



    /***** Visibilidade das cartas */
    const alternaVisibilidade = (index) => { 
      setVisibilidade((prev) => ({
        ...prev,
        [index]: prev[index] === 'inline' ? 'none' : 'inline',
      }));
    };

    return (
        <div>
          <img className='card' src="/logo192.png" alt='MinhaImagem'></img>
          <div className='cartas-container'> 
            
            {itens.map((item, index) => (
              <div className='card' onClick={() => alternaVisibilidade(index)} style={{ cursor: 'pointer' }} //Adiciona um cursor de pointer para indicar que é clicável
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

export default Appsss;
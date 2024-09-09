import React, { useState } from 'react';

function Appss() {
    const [itens, setItens] = useState([]); // Estado inicial da lista
    const [visibilidade, setVisibilidade] = useState({}); // Estado para controlar visibilidade das imagens

    const adicionarItem = () => {
        setItens([...itens, `/figuras/figura${itens.length + 1}.png`]); // Adiciona um novo item à lista
    };

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
        </div>
    );
}

export default Appss;

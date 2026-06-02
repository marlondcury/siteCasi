import React, { useState, useEffect } from 'react';
import '../styles/CardapioRU.css';
export default function CardapioRU() {
  const [cardapio, setCardapio] = useState(null);
  const [activeDay, setActiveDay] = useState("segunda");
  const [error, setError] = useState(false);

useEffect(() => {
    // O '?t=...' evita que o navegador use um JSON antigo guardado em cache
    fetch('/data/cardapio.json?t=' + new Date().getTime())
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status} - O ficheiro não foi encontrado.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ JSON carregado com sucesso:", data);
        setCardapio(data);
        setError(false);
      })
      .catch((err) => {
        console.error("❌ Falha ao consumir o JSON:", err);
        setError(true);
      });
  }, []);
  
  const days = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

  return (
    <section id="cardapio-ru" className="bg-light">
      <div className="container">
        <h2>Cardápio do RU Semanal</h2>
        <p className="section-subtitle">Sincronização automatizada para as sedes de Alegre e Jerônimo Monteiro.</p>

        <div className="contact-grid" id="ru-hours">
          <div className="contact-card">
            <h3>Campus Alegre</h3>
            <p><strong>Café da Manhã:</strong> 06:30 às 07:30</p>
            <p><strong>Almoço:</strong> 11:00 às 13:30</p>
            <p><strong>Jantar:</strong> 17:30 às 19:30</p>
          </div>
          <div className="contact-card">
            <h3>Campus Jerônimo Monteiro</h3>
            <p><strong>Café da Manhã:</strong> 07:00 às 08:00</p>
            <p><strong>Almoço:</strong> 11:30 às 13:30</p>
            <p><strong>Jantar:</strong> 17:15 às 18:30</p>
          </div>
        </div>
        
        <div className="tabs">
          {days.map((day) => (
            <button 
              key={day}
              className={`tab-button ${activeDay === day ? 'active' : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1).replace("terca", "Terça")}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {error ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: '#e53e3e' }}>
              <p><strong>⚠️ Não foi possível sincronizar o cardápio desta semana.</strong></p>
            </div>
          ) : cardapio ? (
            <div dangerouslySetInnerHTML={{ __html: cardapio[activeDay] }} />
          ) : (
            <p style={{ textAlign: 'center' }}>Carregando dados sincronizados...</p>
          )}
        </div>

        <div className="center-btn">
             <a href="https://ru.alegre.ufes.br/cardapio/" className="btn" target="_blank" rel="noopener noreferrer">Ver Site Oficial do RU</a>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import '../styles/CardapioRU.css';

export default function CardapioRU() {
  const [cardapio, setCardapio] = useState(null);
  const [activeDay, setActiveDay] = useState("segunda");
  const [error, setError] = useState(false);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}data/cardapio.json?t=${new Date().getTime()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCardapio(data);
        setError(false);
      })
      .catch((err) => {
        console.error("❌ Erro ao carregar cardápio:", err);
        setError(true);
      });
  }, []);
  
  const days = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

  return (
    <section id="cardapio-ru" className="bg-light">
      <div className="container">
        <h2>Cardápio do RU Semanal</h2>
        <p className="section-subtitle">Sincronização automatizada para as sedes de Alegre e Jerônimo Monteiro.</p>

        {/* Horários Superiores */}
        <div className="ru-grid" id="ru-hours">
          <div className="ru-card">
            <h3>Campus Alegre</h3>
            <p><strong>Café da Manhã:</strong> 06:30 às 07:30</p>
            <p><strong>Almoço:</strong> 11:00 às 13:30</p>
            <p><strong>Jantar:</strong> 17:30 às 19:30</p>
          </div>
          <div className="ru-card">
            <h3>Campus Jerônimo Monteiro</h3>
            <p><strong>Café da Manhã:</strong> 07:00 às 08:00</p>
            <p><strong>Almoço:</strong> 11:30 às 13:30</p>
            <p><strong>Jantar:</strong> 17:15 às 18:30</p>
          </div>
        </div>
        
        {/* Abas de Dias da Semana */}
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

        {/* Conteúdo Dinâmico do Cardápio */}
        <div className="tab-content">
          {error ? (
            <div className="ru-error-alert">
              <p><strong>⚠️ Não foi possível sincronizar o cardápio desta semana.</strong></p>
              <small>O site do RU pode estar fora do ar ou o cardápio ainda não foi liberado.</small>
            </div>
          ) : cardapio ? (
            /* Wrapper adicionado aqui para envelopar e forçar o estilo no HTML injetado */
            <div className="menu-container-wrapper" dangerouslySetInnerHTML={{ __html: cardapio[activeDay] }} />
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
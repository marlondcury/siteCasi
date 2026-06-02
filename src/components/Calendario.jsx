import React from 'react';
import '../styles/Calendario.css';

export default function Calendario() {
  return (
    <section id="calendario" className="bg-light">
      <div className="container">
        <h2>Calendário Acadêmico</h2>
        <p className="section-subtitle">Fique atento aos prazos cruciais estabelecidos pela universidade.</p>
        <ul className="timeline">
          <li><strong>24/02</strong><p>Término do semestre letivo vigente</p></li>
          <li><strong>25/02 a 03/03</strong><p>Período de exames de Provas Finais</p></li>
          <li><strong>05/03 a 09/03</strong><p>Solicitação de Matrícula online via Portal do Aluno</p></li>
          <li><strong>16/03</strong><p>Abertura e início das aulas do próximo semestre letivo</p></li>
        </ul>
        <div className="center-btn">
          <a href="https://prograd.ufes.br/calendario" className="btn" target="_blank" rel="noopener noreferrer">Acessar Calendário Oficial da UFES</a>
        </div>
      </div>
    </section>
  );
}
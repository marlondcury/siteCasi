import React, { useState } from 'react';
import '../styles/Horarios.css';

const scheduleData = {
  periodo1: [
    { hour: "18:00 às 20:00", days: ["", "", "Programação I (Paulo Roberto)", "", "Programação I (Paulo Roberto)"] },
    { hour: "20:00 às 22:00", days: ["", "", "", "", ""] }
  ],
  periodo2: [
    { hour: "18:00 às 20:00", days: ["Teoria Geral dos Sistemas (Simone Dornelas)", "Fund. Programação Web (Giuliano/Simone)", "Matemática Discreta (Edmar Hell)", "Fund. Programação Web (Giuliano/Simone)", "Matemática Discreta (Edmar Hell)"] },
    { hour: "20:00 às 22:00", days: ["Cálculo A (Daniel Santos)", "Teoria Geral dos Sistemas (Simone Dornelas)", "Cálculo A (Daniel Santos)", "Inglês Instrumental (Alexandre Rosa)", "Cálculo A (Daniel Santos)"] }
  ],
  periodo3: [
    { hour: "18:00 às 20:00", days: ["Estruturas de Dados I (Juliana Pirovani)", "", "", "", ""] },
    { hour: "20:00 às 22:00", days: ["", "Estruturas de Dados I (Juliana Pirovani)", "", "", ""] }
  ],
  periodo4: [
    { hour: "18:00 às 20:00", days: ["Programação II (Bruno Vilela)", "Estatística Básica (Maristela Bauer)", "Eng. Requisitos de Software (Bruno Vilela)", "Arquitetura de Computadores (Valeria Alves)", "Estatística Básica (Maristela Bauer)"] },
    { hour: "20:00 às 22:00", days: ["Eng. Requisitos de Software (Bruno Vilela)", "Programação II (Bruno Vilela)", "Estrutura de Dados II (Dayan/Dalvan)", "Estrutura de Dados II (Dayan/Dalvan)", "Arquitetura de Computadores (Valeria Alves)"] }
  ],
  periodo6: [
    { hour: "18:00 às 20:00", days: ["Ger. Banco de Dados (Antonio Almeida)", "Redes de Computadores (Helder Mendes)", "Metodologia de Pesquisa (Dayan Bissoli)", "Ger. Projetos de Software (Marcelo Otone)", "Métodos de Otimização (Geraldo Regis)"] },
    { hour: "20:00 às 22:00", days: ["Direito e Legislação (Larice Nogueira)", "Ger. Banco de Dados (Antonio Almeida)", "Métodos de Otimização (Geraldo Regis)", "Redes de Computadores (Helder Mendes)", "Ger. Projetos de Software (Marcelo Otone)"] }
  ],
  periodo8: [
    { hour: "18:00 às 20:00", days: ["Gestão Qualidade Software (Giuliano Prado)", "", "Empreendedorismo (Wendel Sandro)", "Ger. e Adm. de Redes (Helder Mendes)", ""] },
    { hour: "20:00 às 22:00", days: ["Desenv. Sistemas WEB (Giuliano Prado)", "Desenv. Sistemas WEB (Giuliano Prado)", "Ger. e Adm. de Redes (Helder Mendes)", "Gestão Qualidade Software (Giuliano Prado)", ""] }
  ]
};

export default function Horarios() {
  const [activeTab, setActiveTab] = useState("periodo2");

  return (
    <section id="horarios">
      <div className="container">
        <h2>Horários do Semestre</h2>
        <p className="section-subtitle">Selecione o período acadêmico para mapear as grades horárias das disciplinas.</p>
        
        <div className="tabs">
          {["periodo1", "periodo2", "periodo3", "periodo4", "periodo6", "periodo8"].map((p) => (
            <button 
              key={p}
              className={`tab-button ${activeTab === p ? 'active' : ''}`}
              onClick={() => setActiveTab(p)}
            >
              {p.replace("periodo", "")}º Período
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className="schedule-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Segunda</th>
                  <th>Terça</th>
                  <th>Quarta</th>
                  <th>Quinta</th>
                  <th>Sexta</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData[activeTab] ? (
                  scheduleData[activeTab].map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.hour}</td>
                      {row.days.map((day, dIdx) => (
                        <td key={dIdx}>
                          {day ? (
                            <>
                              <strong>{day.split(' (')[0]}</strong>
                              <small>{day.split(' (')[1]?.replace(')', '')}</small>
                            </>
                          ) : ""}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                      Nenhum horário cadastrado para este período.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
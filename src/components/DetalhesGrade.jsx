import React, { useState } from 'react';
import curriculumData from '../data/curriculum.json';
import '../styles/DetalhesGrade.css';

export default function DetalhesGrade({ concluidas }) {
  const [activePeriod, setActivePeriod] = useState(null);

  return (
    <div className="accordion-container dropdown-group">
      <br />
      <h3>Detalhes e Pré-requisitos por Período</h3>
      <div className="accordion">
        {Object.keys(curriculumData).map((period, index) => {
          const isActive = activePeriod === index;
          return (
            <React.Fragment key={index}>
              <button 
                className={`accordion-button ${isActive ? 'active' : ''}`}
                onClick={() => setActivePeriod(isActive ? null : index)}
              >
                {period}
              </button>
              <div 
                className="accordion-panel"
                style={{ maxHeight: isActive ? '600px' : '0px', transition: 'max-height 0.3s ease-out', overflow: 'hidden' }}
              >
                {curriculumData[period].map((sub, subIdx) => {
                  // Limpa o código para checar se a matéria está concluída
                  const nomeMateriaPuro = sub.name.split(' – ')[1] || sub.name;
                  const isConcluida = concluidas.some(c => nomeMateriaPuro.toLowerCase().includes(c.toLowerCase()));

                  return (
                    <div className={`subject-detail ${isConcluida ? 'detail-concluido' : ''}`} key={subIdx}>
                      <h4>
                        {sub.name} {isConcluida && <span className="badge-done">[Concluída]</span>}
                      </h4>
                      <p><strong>Carga Horária:</strong> {sub.ch}</p>
                      <p><strong>Pré-requisito:</strong> {sub.prereq}</p>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
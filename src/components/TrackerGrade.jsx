import React from 'react';
import '../styles/TrackerGrade.css';

const overviewPeriods = [
  { title: "1º Período", subjects: ["Introdução à Informática", "Int. aos Sistemas de Informação", "Lógica Computacional I", "Português Instrumental", "Programação I", "Vetores e Geometria Analítica"] },
  { title: "2º Período", subjects: ["Cálculo A", "Fund. de Programação Web", "Inglês Instrumental", "Matemática Discreta", "Teoria Geral de Sistemas"] },
  { title: "3º Período", subjects: ["Álgebra Linear", "Comput. e Complexidade", "Engenharia de Software", "Estruturas de Dados I", "Sistemas de Apoio à Decisão"] },
  { title: "4º Período", subjects: ["Arquitetura de Computadores", "Eng. de Requisitos de Software", "Estatística Básica", "Estruturas de Dados II", "Programação II"] },
  { title: "5º Período", subjects: ["Banco de Dados", "Interface Humano-Computador", "Otimização Linear", "Projeto de Sistemas de Software", "Sistemas Operacionais"] },
  { title: "6º Período", subjects: ["Direito e Legislação", "Gerência de Projetos de Software", "Gerenciamento de Banco de Dados", "Metodologia de Pesquisa", "Métodos de Otimização", "Redes de Computadores"] },
  { title: "7º Período", subjects: ["Administração e Economia", "Comércio Eletrônico", "Informática e Sociedade", "Segurança e Auditoria", "Sistemas Distribuídos", "Optativa I"], special: { "Optativa I": "optativa" } },
  { title: "8º Período", subjects: ["Desenvolvimento para Web", "Empreendedorismo", "Gerenciamento de Redes", "Gestão da Qualidade", "TCC I", "Optativa II"], special: { "Optativa II": "optativa", "TCC I": "tcc" } },
  { title: "9º Período", subjects: ["Sistemas Livre", "Estágio Obrigatório", "TCC II", "Optativa III", "Optativa IV", "Optativa V"], special: { "Optativa III": "optativa", "Optativa IV": "optativa", "Optativa V": "optativa", "TCC II": "tcc", "Estágio Obrigatório": "estagio" } }
];

export default function TrackerGrade({ concluidas, onToggleMateria }) {
  const totalMaterias = 50;
  const totalConcluidas = concluidas.length;
  const porcentagem = Math.round((totalConcluidas / totalMaterias) * 100);

  return (
    <div className="tracker-grade-container">
      <div className="progress-dashboard">
        <div className="progress-header">
          <span className="progress-title">O Seu Progresso no Curso</span>
          <span className="progress-stats">{totalConcluidas} de {totalMaterias} disciplinas ({porcentagem}%)</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${porcentagem}%` }}></div>
        </div>
      </div>
      
      <div className="curriculum-grid-container">
        <div className="curriculum-grid">
          {overviewPeriods.map((p, idx) => (
            <div className="period-column" key={idx}>
              <h4>{p.title}</h4>
              {p.subjects.map((sub, sIdx) => {
                let typeClass = p.special && p.special[sub] ? p.special[sub] : "";
                const isConcluida = concluidas.includes(sub);

                return (
                  <div 
                    className={`subject-box ${typeClass} ${isConcluida ? 'concluida' : ''}`} 
                    key={sIdx}
                    onClick={() => onToggleMateria(sub)}
                  >
                    {sub}
                    {isConcluida && <span className="check-icon">✓</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
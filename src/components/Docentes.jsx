import React, { useState } from 'react';
import teachersData from '../data/teachers.json';
import '../styles/Docentes.css';

export default function Docentes() {
  const [activeTeacher, setActiveTeacher] = useState(null);

  const toggleAccordion = (index) => {
    setActiveTeacher(activeTeacher === index ? null : index);
  };

  return (
    <section id="docentes" className="bg-light">
      <div className="container">
        <h2>Corpo Docente e Colegiado</h2>
        <p className="section-subtitle">Conheça os professores e a coordenação do curso.</p>
        
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Coordenação</h3>
            <p><strong>Coordenador:</strong> Prof. MSc. Giuliano Prado de Morais Giglio</p>
            <p><strong>E-mail:</strong> giucontato@gmail.com</p>
            <p><strong>Sub-coordenador:</strong> Prof. DSc. Helder de Amorim Mendes</p>
            <p><strong>E-mail:</strong> helder.mendes@ufes.br</p>
          </div>
          <div className="contact-card">
            <h3>Secretaria (SUGrad)</h3>
            <p><strong>E-mail:</strong> sugrad.alegre@ufes.br</p>
            <p><strong>Telefone:</strong> (28) 3552 8915 / 8981</p>
          </div>
          <div className="contact-card">
            <h3>Representantes Discentes</h3>
            <p><strong>Colegiado:</strong> Sthéfane Almeida (Quebras de requisito)</p>
            <p><strong>Departamento:</strong> Maik Ramos (Aumento de vagas)</p>
          </div>
        </div>
        
        <div className="center-btn">        
          <a href="https://computacao.alegre.ufes.br/" className="btn" target="_blank" rel="noopener noreferrer">Acessar Site Oficial do Departamento</a>
        </div>

        <div className="accordion-container dropdown-group">
          <br />
          <h3>Professores do Departamento</h3>
          <div className="accordion">
            {teachersData.map((teacher, index) => {
              const isActive = activeTeacher === index;
              return (
                <React.Fragment key={index}>
                  <button 
                    className={`accordion-button ${isActive ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {teacher.name}
                  </button>
                  <div 
                    className="accordion-panel"
                    style={{ maxHeight: isActive ? '200px' : '0px', transition: 'max-height 0.3s ease-out' }}
                  >
                    <div className="teacher-detail">
                      <p><strong>Área de Atuação:</strong> {teacher.area}</p>
                      {teacher.email && <p><strong>E-mail:</strong> <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>}
                      {teacher.site && <p><strong>Website:</strong> <a href={teacher.site.startsWith('http') ? teacher.site : `http://${teacher.site}`} target="_blank" rel="noopener noreferrer">{teacher.site}</a></p>}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
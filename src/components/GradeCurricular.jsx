import React, { useState, useEffect } from 'react';
import TrackerGrade from './TrackerGrade';
import DetalhesGrade from './DetalhesGrade';

export default function GradeCurricular() {
  const [concluidas, setConcluidas] = useState(() => {
    const saved = localStorage.getItem('casi-materias-concluidas');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('casi-materias-concluidas', JSON.stringify(concluidas));
  }, [concluidas]);

  const handleToggleMateria = (materia) => {
    if (concluidas.includes(materia)) {
      setConcluidas(concluidas.filter(m => m !== materia));
    } else {
      setConcluidas([...concluidas, materia]);
    }
  };

  return (
    <section id="grade-curricular">
      <div className="container">
        <h2>Grade Curricular & Acompanhamento</h2>
        <p className="section-subtitle">Mapeie sua evolução acadêmica e consulte a estrutura de pré-requisitos do curso.</p>
        
        <TrackerGrade concluidas={concluidas} onToggleMateria={handleToggleMateria} />
        <DetalhesGrade concluidas={concluidas} />
      </div>
    </section>
  );
}
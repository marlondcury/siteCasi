import React from 'react';
import "../styles/About.css"

const members = [
  { name: "Marlon Domingos Cury", role: "Presidente", img: "marlon.jpeg" },
  { name: "Gabriel dos Santos Souza", role: "Vice Presidente", img: "gabriel.jpeg" },
  { name: "Laís de Oliveira Gomes", role: "Secretária Geral", img: "lais.jpeg" },
  { name: "Luan Gomes Ribeiro", role: "Subsecretário Geral", img: "luan.jpeg" },
  { name: "Rômulo Aguiar dos Santos", role: "Tesoureiro", img: "romulo.jpeg" },
  { name: "Eduardo Campos Batista", role: "Diretor de Eventos", img: "eduardo.jpeg" },
  { name: "Luísa Oliveira Carvalho", role: "Auxiliar de Eventos", img: "luisa.jpeg" },
  { name: "Bia Gabriela N. de Azevedo", role: "Diretora de Marketing", img: "bia.jpeg" },
  { name: "Maik Ramos Maifredo", role: "Diretor de Apoio Acadêmico", img: "maik.jpeg" },
  { name: "Emanuela Ferreira Neves", role: "Gestora de Parcerias", img: "manu.jpeg" }
];

export default function About() {
  return (
    <section id="sobre">
      <div className="container">
        <h2>Sobre Nós</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Nossa Missão</h3>
            <p>Nossa missão é representar, apoiar e fortalecer a comunidade estudantil do curso de Sistemas de Informação da UFES, promovendo a integração entre estudantes, docentes e a universidade. Buscamos defender os interesses acadêmicos, incentivar a formação crítica, técnica e cidadã, além de fomentar iniciativas de extensão, pesquisa, cultura, inovação e convivência estudantil.</p>
          </div>
        </div>
        <div className="about-members">
            
          <h3>Gestão Atual</h3>
          <div className="members-row">
            {members.map((member, i) => (
              <div className="member-card" key={i}>
                <img src={`/assets/images/${member.img}`} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
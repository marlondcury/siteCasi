import React from 'react';

export default function Eventos() {
  return (
    <section id="eventos" className="bg-light">
      <div className="container">
         <h2>Próximos Minicursos & Eventos</h2>
         <div className="grid">
              <div className="card">
                 <h3>Automação de Processos com n8n</h3>
                 <p><strong>Data:</strong> 18/10/2025</p>
                 <p><strong>Ministrantes:</strong> Pedro Lucas G. de Oliveira e Erik Estevam M. R. Oliveira</p>
                 <a href="#" className="btn-secondary">Inscrições Encerradas</a>
              </div>
              <div className="card">
                 <h3>Introdução ao Desenvolvimento de APIs</h3>
                 <p><strong>Data:</strong> 25/10/2025</p>
                 <p><strong>Ministrante:</strong> Hiago Moreira</p>
                 <a href="#" className="btn-secondary">Inscreva-se</a>
              </div>
              <div className="card">
                 <h3>Construção de um App Fullstack</h3>
                 <p><strong>Datas:</strong> 22/11/2025 e 29/11/2025</p>
                 <p><strong>Ministrante:</strong> Hiago Moreira</p>
                 <a href="https://www.cognitoforms.com/CentroAcadêmico/INSCRIÇÃOMINICURSOConstruçãoDeUmAppFullstack" target="_blank" rel="noopener noreferrer" className="btn-secondary">Inscreva-se</a>
              </div>
         </div>
      </div>
    </section>
  );
}
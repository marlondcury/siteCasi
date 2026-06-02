import React from 'react';
import '../styles/Contato.css';

export default function Contato() {
  return (
    <section id="contato" className="bg-light">
        <div className="container">
            <h2>Fale Conosco</h2>
            <div className="contact-wrapper">
                <form className="contact-form" action="https://formspree.io/f/SEU_CODIGO_AQUI" method="POST">
                    <input type="text" name="name" placeholder="O Seu Nome Completo" required />
                    <input type="email" name="email" placeholder="O Seu E-mail Institucional" required />
                    <textarea name="message" placeholder="Como é que o CA-SI pode te ajudar?" rows={5} required></textarea>
                    <button type="submit" className="btn">Enviar Mensagem</button>
                </form>
                
                <div className="contact-info">
                    <h3>As Nossas Redes</h3>
                    
                    <a href="https://www.instagram.com/casistemas_ufes/" target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-instagram">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span>@casistemas_ufes</span>
                    </a>
                    
                    <a href="https://github.com/casiufesalegre" target="_blank" rel="noopener noreferrer" className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <span>GitHub Coletivo</span>
                    </a>
                    
                    <h3>E-mail Geral</h3>
                    <div className="social-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-mail">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <p style={{ margin: 0 }}>casi.ufes.alegre@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
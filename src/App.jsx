import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Docentes from './components/Docentes';
import CardapioRU from './components/CardapioRU';
import Footer from './components/Footer';
import GradeCurricular from './components/GradeCurricular';
import About from './components/About';
import AtividadesComplementares from './components/AtividadesComplementares';
import Horarios from './components/Horarios';
import Vagas from './components/Vagas';
import Contato from './components/Contato';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About/>
        <Docentes />
        <GradeCurricular/>
        <Horarios/>
        <AtividadesComplementares/>
        <Vagas/>
        <CardapioRU />
      </main>
      <Contato/>
      <Footer />
    </>
  );
}
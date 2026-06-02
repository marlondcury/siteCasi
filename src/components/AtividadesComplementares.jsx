import React from 'react';

const atividadesData = [
  { id: 1, descricao: "Artigo completo publicado em periódico IA", afins: "100h", outras: "100h" },
  { id: 2, descricao: "Artigo completo publicado em periódico IB ou NA", afins: "80h", outras: "80h" },
  { id: 3, descricao: "Artigo completo publicado em periódico IC ou NB", afins: "70h", outras: "70h" },
  { id: 4, descricao: "Artigo completo publicado em periódico classificado", afins: "50h", outras: "50h" },
  { id: 5, descricao: "Artigo completo publicado em periódico não classificado", afins: "30h", outras: "30h" },
  { id: 6, descricao: "Artigo de divulgação", afins: "15h", outras: "10h" },
  { id: 7, descricao: "Artigo publicado na Internet", afins: "15h", outras: "10h" },
  { id: 8, descricao: "Atualização de homepage", afins: "5h", outras: "5h" },
  { id: 9, descricao: "Desenvolvimento de Software", afins: "45h", outras: "45h" },
  { id: 10, descricao: "Elaboração de homepage", afins: "30h", outras: "30h" },
  { id: 11, descricao: "Estágio Extracurricular (cada 60 h)", afins: "30h", outras: "15h" },
  { id: 12, descricao: "Iniciação científica - CNPq", afins: "50h", outras: "30h" },
  { id: 13, descricao: "Iniciação científica - PIBIC", afins: "50h", outras: "30h" },
  { id: 14, descricao: "Iniciação científica - PIVIC", afins: "50h", outras: "30h" },
  { id: 15, descricao: "Monitoria oficial", afins: "50h", outras: "25h" },
  { id: 16, descricao: "Monitoria voluntária", afins: "30h", outras: "15h" },
  { id: 17, descricao: "Organização de ações sociais", afins: "9h", outras: "9h" },
  { id: 18, descricao: "Organização de atividades culturais", afins: "9h", outras: "9h" },
  { id: 19, descricao: "Organização de eventos", afins: "20h", outras: "10h" },
  { id: 20, descricao: "Participação em atividades culturais", afins: "3h", outras: "1,5h" },
  { id: 21, descricao: "Participação em cursos – Presencial (cada 8h)", afins: "8h", outras: "4h" },
  { id: 22, descricao: "Participação em cursos – Não Presencial (cada 8h)", afins: "4h", outras: "2h" },
  { id: 23, descricao: "Participação em eventos (moderador)", afins: "20h", outras: "10h" },
  { id: 24, descricao: "Participação em eventos (ouvinte)", afins: "10h", outras: "5h" },
  { id: 25, descricao: "Participação em eventos (palestrante)", afins: "45h", outras: "30h" },
  { id: 26, descricao: "Participação em Projetos de Ensino", afins: "20h", outras: "10h" },
  { id: 27, descricao: "Participação em Projetos de Pesquisa", afins: "30h", outras: "15h" },
  { id: 28, descricao: "Participação em Projetos ou Serviços de Extensão", afins: "30h", outras: "15h" },
  { id: 29, descricao: "Participação voluntária em ações sociais (cada semestre)", afins: "50h", outras: "25h" },
  { id: 30, descricao: "Representação em órgãos colegiados", afins: "20h", outras: "-" },
  { id: 31, descricao: "Representação Estudantil (CA, DA e Empresa Júnior)", afins: "20h", outras: "-" },
  { id: 32, descricao: "Resumo apresentado em evento", afins: "20h", outras: "10h" },
  { id: 33, descricao: "Resumo expandido apresentado em evento", afins: "30h", outras: "15h" },
  { id: 34, descricao: "Resumo expandido publicado em evento", afins: "15h", outras: "7h" },
  { id: 35, descricao: "Resumo publicado em evento", afins: "10h", outras: "5h" },
  { id: 36, descricao: "Trabalho completo apresentado em evento", afins: "45h", outras: "30h" },
  { id: 37, descricao: "Trabalho completo publicado em evento", afins: "30h", outras: "15h" }
];

export default function AtividadesComplementares() {
  return (
    <section id="atividades-complementares" className="bg-light">
      <div className="container">
        <h2>Atividades Complementares</h2>
        <p className="section-subtitle">Relação de atividades complementares e as suas respetivas cargas horárias para integralização curricular.</p>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Atividade</th>
                <th>Áreas Afins</th>
                <th>Outras Áreas</th>
              </tr>
            </thead>
            <tbody>
              {atividadesData.map((atividade) => (
                <tr key={atividade.id}>
                  <td>{atividade.id}</td>
                  <td>{atividade.descricao}</td>
                  <td>{atividade.afins}</td>
                  <td>{atividade.outras}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
// scripts/scraper.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Ignora erros de SSL do site da UFES
const agent = new https.Agent({ rejectUnauthorized: false });

async function rasparCardapioRU(dataFormatada) {
  try {
    const url = `https://ru.alegre.ufes.br/cardapio/${dataFormatada}`;
    const { data } = await axios.get(url, { httpsAgent: agent, timeout: 30000 });
    const $ = cheerio.load(data);
    const divs = $('.field-content');

    if (divs.length === 0) return "<p><em>Cardápio ainda não cadastrado para este dia.</em></p>";

    // Extrai o texto e limpa espaços vazios
    let linhas = [];
    divs.each((i, el) => {
      const textoLimpo = $(el).text().split('\n').map(s => s.trim()).filter(s => s.length > 0);
      linhas.push(...textoLimpo);
    });

    // Filtros de lixo (Mesma inteligência do seu script original)
    const lixo = ["CG =", "CL =", "CG=", "CL=", "Contém Glúten", "Contém Lactose", "contaminação", "Aviso"];
    linhas = linhas.filter(t => {
      if (!t || t.startsWith('*') || t === "CG" || t === "CL") return false;
      return !lixo.some(palavra => t.toLowerCase().includes(palavra.toLowerCase()));
    });

    if (linhas.length === 0) return "<p><em>Sem dados úteis para este dia.</em></p>";

    let htmlFormatado = '<div class="menu-grid">\n';
    let refeicaoAtual = "";
    let cardAberto = false;

    const abrirCard = (titulo) => {
      if (cardAberto) htmlFormatado += '  </div>\n';
      htmlFormatado += `  <div class="menu-card">\n    <h3>${titulo}</h3>\n`;
      cardAberto = true;
    };

    const categorias = ["Entrada", "Prato Proteico", "Opção", "Acompanhamento", "Guarnição", "Sobremesa", "Suco", "Pão", "Bebida", "Bebidas", "Fruta", "Complemento"];

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];                 // <-- ADICIONE ESTA LINHA
      const linhaUpper = linha.toUpperCase();
      // Inteligência de Refeição
      if (linhaUpper.includes("DESJEJUM")) {
        if (refeicaoAtual !== "Desjejum") { refeicaoAtual = "Desjejum"; abrirCard("Desjejum"); }
        continue;
      } else if (linhaUpper.includes("ALMOÇO") || linhaUpper.includes("ALMOCO")) {
        if (!linhaUpper.includes("JANTAR") && refeicaoAtual !== "Almoço") { refeicaoAtual = "Almoço"; abrirCard("Almoço"); }
        continue;
      } else if (linhaUpper.includes("JANTAR")) {
        if (refeicaoAtual !== "Jantar") { refeicaoAtual = "Jantar"; abrirCard("Jantar"); }
        continue;
      }

      // CORREÇÃO: Removemos a mudança agressiva para o Jantar. 
      // Agora só deduz pelo nome do prato se o título da refeição estiver vazio.
      if (linhaUpper.startsWith("PÃO") && refeicaoAtual === "") {
        refeicaoAtual = "Desjejum"; abrirCard("Desjejum");
      } else if (linhaUpper.startsWith("ENTRADA") && refeicaoAtual === "") {
        refeicaoAtual = "Almoço"; abrirCard("Almoço");
      }

      if (!cardAberto) abrirCard("Cardápio do Dia");

      // Inteligência de Categoria
      let isCat = false;
      for (const cat of categorias) {
        if (linha.toLowerCase().startsWith(cat.toLowerCase())) {
          isCat = true;
          const nomeCat = cat.charAt(0).toUpperCase() + cat.slice(1);
          let resto = linha.substring(cat.length).trim();
          if (resto.startsWith(':')) resto = resto.substring(1).trim();

          if (resto) {
            htmlFormatado += `    <p><strong>${nomeCat}:</strong> ${resto}</p>\n`;
          } else {
            htmlFormatado += `    <p><strong>${nomeCat}</strong></p>\n`;
          }
          break;
        }
      }
      if (!isCat) htmlFormatado += `    <p>${linha}</p>\n`;
    }

    if (cardAberto) htmlFormatado += '  </div>\n';
    htmlFormatado += '</div>';
    return htmlFormatado;

  } catch (erro) {
    return "<p><em>Erro na conexão com o RU ou indisponibilidade do site.</em></p>";
  }
}

async function principal() {
  const hoje = new Date();
  const diaSemana = hoje.getDay(); // 0 = Domingo, 1 = Segunda
  const segundaFeira = new Date(hoje);

  if (diaSemana === 0) {
    segundaFeira.setDate(hoje.getDate() + 1);
  } else if (diaSemana === 6) {
    segundaFeira.setDate(hoje.getDate() + 2);
  } else {
    segundaFeira.setDate(hoje.getDate() - (diaSemana - 1));
  }

  const diasJs = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  const cardapioData = {};

  console.log(`Buscando cardápios a partir da semana de: ${segundaFeira.toISOString().split('T')[0]}`);

  for (let i = 0; i < diasJs.length; i++) {
    const dataBusca = new Date(segundaFeira);
    dataBusca.setDate(segundaFeira.getDate() + i);
    const dataString = dataBusca.toISOString().split('T')[0];
    
    console.log(`Raspando dados de ${diasJs[i]} (${dataString})...`);
    cardapioData[diasJs[i]] = await rasparCardapioRU(dataString);
  }

  // Salva no local exato onde o React vai ler (pasta public/data)
  const caminhoJson = path.join(process.cwd(), 'public', 'data', 'cardapio.json');
  fs.writeFileSync(caminhoJson, JSON.stringify(cardapioData, null, 2), 'utf-8');
  
  console.log("✅ Concluído! Arquivo public/data/cardapio.json atualizado com sucesso.");
}

principal();
import requests
from bs4 import BeautifulSoup
import urllib3
import datetime
import re
import os

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def raspar_cardapio_ru(data_formatada):
    url = f'https://ru.alegre.ufes.br/cardapio/{data_formatada}'
    try:
        resposta = requests.get(url, verify=False, timeout=30)
        
        if resposta.status_code != 200:
            return "<p><em>Cardápio ainda não cadastrado para este dia.</em></p>"
            
        sopa = BeautifulSoup(resposta.text, 'html.parser')
        divs = sopa.find_all('div', class_='field-content')
        
        if not divs:
            return "<p><em>Cardápio vazio ou não encontrado.</em></p>"
            
        linhas = []
        for div in divs:
            for texto in div.stripped_strings:
                t = texto.strip()
                # Filtro  para tirar legendas e lixo
                lixo = ["CG =", "CL =", "CG=", "CL=", "Contém Glúten", "Contém Lactose", "contaminação", "Aviso"]
                if t and not t.startswith('*') and t != "CG" and t != "CL":
                    if not any(palavra.lower() in t.lower() for palavra in lixo):
                        linhas.append(t)
                    
        if not linhas:
            return "<p><em>Sem dados úteis para este dia.</em></p>"
            
        html_formatado = '<div class="menu-grid">\n'
        
        refeicao_atual = ""
        card_aberto = False
        
        def abrir_card(titulo):
            nonlocal html_formatado, card_aberto
            if card_aberto:
                html_formatado += '  </div>\n'
            html_formatado += f'  <div class="menu-card">\n    <h3>{titulo}</h3>\n'
            card_aberto = True

        categorias = ["Entrada", "Prato Proteico", "Opção", "Acompanhamento", "Guarnição", "Sobremesa", "Suco", "Pão", "Bebida", "Bebidas", "Fruta", "Complemento"]
        
        i = 0
        while i < len(linhas):
            linha = linhas[i]
            linha_upper = linha.upper()
            
            # --- 1. INTELIGÊNCIA DE REFEIÇÃO (DESJEJUM, ALMOÇO, JANTAR) ---
            if "DESJEJUM" in linha_upper:
                if refeicao_atual != "Desjejum":
                    refeicao_atual = "Desjejum"
                    abrir_card("Desjejum")
                i += 1; continue
            elif "ALMOÇO" in linha_upper or "ALMOCO" in linha_upper:
                if "JANTAR" not in linha_upper and refeicao_atual != "Almoço":
                    refeicao_atual = "Almoço"
                    abrir_card("Almoço")
                i += 1; continue
            elif "JANTAR" in linha_upper:
                if refeicao_atual != "Jantar":
                    refeicao_atual = "Jantar"
                    abrir_card("Jantar")
                i += 1; continue
                
            # Se o site não falar o nome, deduzir pela comida:
            if linha_upper.startswith("PÃO") and refeicao_atual == "":
                refeicao_atual = "Desjejum"
                abrir_card("Desjejum")
            elif linha_upper.startswith("ENTRADA"):
                if refeicao_atual in ["", "Desjejum"]:
                    refeicao_atual = "Almoço"
                    abrir_card("Almoço")
                elif refeicao_atual == "Almoço":
                    refeicao_atual = "Jantar"
                    abrir_card("Jantar")
            
            if not card_aberto:
                abrir_card("Cardápio do Dia")
                
            # --- 2. INTELIGÊNCIA DE CATEGORIA (Agrupa itens soltos) ---
            is_cat = False
            for cat in categorias:
                if linha.lower().startswith(cat.lower()):
                    is_cat = True
                    nome_cat = cat.capitalize()
                    
                    resto = linha[len(cat):].strip()
                    if resto.startswith(':'):
                        resto = resto[1:].strip()
                        
                    if resto:
                        html_formatado += f'    <p><strong>{nome_cat}:</strong> {resto}</p>\n'
                    else:
                        # Se a categoria for só "Bebidas", junta as próximas linhas até achar outra categoria
                        itens = []
                        j = i + 1
                        while j < len(linhas):
                            next_line = linhas[j]
                            if any(next_line.lower().startswith(c.lower()) for c in categorias) or next_line.upper() in ["DESJEJUM", "ALMOÇO", "JANTAR", "ENTRADA", "PÃO"]:
                                break
                            itens.append(next_line)
                            j += 1
                            
                        if itens:
                            html_formatado += f'    <p><strong>{nome_cat}:</strong> {", ".join(itens)}</p>\n'
                            i = j - 1 # Pula as linhas que já juntou
                        else:
                            html_formatado += f'    <p><strong>{nome_cat}</strong></p>\n'
                    break
                    
            if not is_cat:
                html_formatado += f'    <p>{linha}</p>\n'
                
            i += 1
            
        if card_aberto:
            html_formatado += '  </div>\n'
            
        html_formatado += '</div>'
        return html_formatado
        
    except Exception as e:
        return "<p><em>Erro na conexão com o RU.</em></p>"



def principal():
    hoje = datetime.date.today()
    
    # --- NOVA LÓGICA DE DATAS ---
    if hoje.weekday() == 6: 
        # Se hoje for Domingo (6), a próxima segunda é amanhã (+1 dia)
        segunda_feira = hoje + datetime.timedelta(days=1)
    elif hoje.weekday() == 5:
        # Se hoje for Sábado (5), a próxima segunda é daqui a 2 dias (+2 dias)
        segunda_feira = hoje + datetime.timedelta(days=2)
    else:
        # Dias normais da semana: volta para a segunda-feira atual
        segunda_feira = hoje - datetime.timedelta(days=hoje.weekday())
    # ----------------------------

    dias_semana_js = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
    novo_objeto_js = "const cardapioData = {\n"
    
    print(f"Buscando cardápios a partir de {segunda_feira}...")
    
    for i, dia_nome in enumerate(dias_semana_js):
        data_busca = segunda_feira + datetime.timedelta(days=i)
        data_string = data_busca.strftime('%Y-%m-%d')
        print(f"Raspando dados de {dia_nome} ({data_string})...")
        
        html_dia = raspar_cardapio_ru(data_string)
        novo_objeto_js += f"  {dia_nome}: `\n{html_dia}\n  `"
        
        if i < 5: 
            novo_objeto_js += ",\n"
        else: 
            novo_objeto_js += "\n};\n"

    caminho_js = 'script.js'
    
    if not os.path.exists(caminho_js):
        print(f"⚠️ Erro: O arquivo {caminho_js} não existe na pasta atual.")
        print("Criando o arquivo script.js do zero para você...")
        with open(caminho_js, 'w', encoding='utf-8') as file:
            file.write(novo_objeto_js)
        print("✅ Concluído! Arquivo criado com sucesso.")
        return

    try:
        with open(caminho_js, 'r', encoding='utf-8') as file:
            conteudo_js = file.read()
            
        padrao = re.compile(r'const cardapioData = \{.*?\};', re.DOTALL)
        
        if padrao.search(conteudo_js):
            with open(caminho_js, 'w', encoding='utf-8') as file:
                file.write(padrao.sub(novo_objeto_js.strip(), conteudo_js))
            print("✅ Concluído! Arquivo script.js atualizado.")
        else:
            print(f"⚠️ Aviso: 'const cardapioData = {{}};' não foi encontrado dentro de {caminho_js}.")
            print("Substituindo todo o conteúdo do arquivo pelos novos dados...")
            with open(caminho_js, 'w', encoding='utf-8') as file:
                file.write(novo_objeto_js)
            print("✅ Concluído! O arquivo foi sobrescrito.")
            
    except Exception as e:
        print(f"❌ Erro crítico ao tentar escrever no arquivo: {e}")

if __name__ == '__main__':
    principal()
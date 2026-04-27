
import requests
from bs4 import BeautifulSoup

resposta = requests.get('https://ru.alegre.ufes.br/cardapio/2026-04-11', verify=False)
print(resposta)

html_site = resposta.text
sopa = BeautifulSoup(html_site, 'html.parser')
print(sopa.title.string)

todas_as_divs = sopa.find_all('div', class_='field-content')

for div in todas_as_divs:
    # O .text extrai só as palavras, e o .strip() limpa os espaços em branco sobrando
    texto_limpo = div.text.strip() 
    print(texto_limpo)
from os import error, replace
from utils import load_data, load_template
import urllib
from database import Database, Note

def index(request):
    db = Database('banco_notas')

    if request.startswith('POST'):
        # print(request)
        # print("\n fim do request \n")
        request = request.replace('\r', '')  # Remove caracteres indesejados
        # Cabeçalho e corpo estão sempre separados por duas quebras de linha
        partes = request.split('\n\n')
        # print(partes)
        corpo = partes[1]
        if corpo.split("=")[0] == 'delete':
            id_int = int(corpo.split("=")[1])
            db.delete(id_int)

        elif 'update' in corpo:
            params = {}
            for chave_valor in corpo.split('&'):
                if chave_valor.startswith("titulo"):
                    params["titulo"] = urllib.parse.unquote_plus(chave_valor[chave_valor.find("=")+1:], encoding="utf-8", errors="replace")
                if chave_valor.startswith("detalhes"):
                    params["detalhes"] = urllib.parse.unquote_plus(chave_valor[chave_valor.find("=")+1:], encoding="utf-8", errors="replace")
                if chave_valor.startswith("update"):
                    params["id"] = urllib.parse.unquote_plus(chave_valor[chave_valor.find("=")+1:], encoding="utf-8", errors="replace")

            db.update(Note(id=params["id"], title=params["titulo"], content=params["detalhes"]))


        else:
            params = {}
        # Preencha o dicionário params com as informações do corpo da requisição
        # O dicionário conterá dois valores, o título e a descrição.
        # Posteriormente pode ser interessante criar uma função que recebe a
        # requisição e devolve os parâmetros para desacoplar esta lógica.
        # Dica: use o método split da string e a função unquote_plus

        #titulo=Sorvete+de+banana 
        #detalhes=Coloque+uma+banana+no+congelador+e+espere.+Pronto%21+1%2B1%3D
            for chave_valor in corpo.split('&'):
                if chave_valor.startswith("titulo"):
                    params["titulo"] = urllib.parse.unquote_plus(chave_valor[chave_valor.find("=")+1:], encoding="utf-8", errors="replace")
                if chave_valor.startswith("detalhes"):
                    params["detalhes"] = urllib.parse.unquote_plus(chave_valor[chave_valor.find("=")+1:], encoding="utf-8", errors="replace")

            db.add(Note(title=params["titulo"], content=params["detalhes"]))

    # Cria uma lista de <li>'s para cada anotação
    # Se tiver curiosidade: https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
    note_template = load_template('components/note.html')
    notes_li = [
        note_template.format(title=dados.title, details=dados.content, id=dados.id)
        for dados in db.get_all()
    ]
    notes = '\n'.join(notes_li)

    return load_template('index.html').format(notes=notes).encode()
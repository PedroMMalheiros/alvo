# ALVO · Jiu-jitsu Streetwear

Site estático da ALVO com seis camisetas vinculadas aos anúncios do Mercado Livre, apresentação da marca, seção Nóbrega CT, tabela de medidas, logo e botão flutuante do WhatsApp. A interface é em português do Brasil.

## Conteúdo desta exportação

`index.html`, `styles.css`, `script.js` e as imagens foram copiados byte a byte da versão 2 publicada em https://alvo-jiu-jitsu.geyger.chatgpt.site/ — commit `ca7d96a79d68298a211a3653e1dac7760c98889c`.

As únicas adições são `robots.txt`, `sitemap.xml`, `404.html`, `.gitignore` e este `README.md`, conforme solicitado. A página 404 reutiliza o cabeçalho, o rodapé, o botão do WhatsApp, o diálogo legal e os estilos existentes. Nela, os links internos e os caminhos de recursos apontam para a raiz, para funcionarem também em endereços inexistentes com subpastas.

As 19 imagens originais estão incluídas, sem regeneração, redimensionamento ou recodificação. O favicon é um SVG em uma data URI (`image/svg+xml`) dentro do HTML; não existe um arquivo `.ico`, `.png` ou `.svg` separado para ele.

## Arquivos

```text
alvo/
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── 404.html
├── .gitignore
├── README.md
└── alvo-img/
    ├── lifestyle-branca.jpg
    ├── lifestyle-kanji-branca.jpg
    ├── lifestyle-kanji-preta.jpg
    ├── lifestyle-kanji-verde.jpg
    ├── lifestyle-preta.jpg
    ├── logo-alvo.png
    ├── produto-01-preta-costas.jpg
    ├── produto-01-preta-frente.jpg
    ├── produto-02-branca-costas.jpg
    ├── produto-02-branca-frente.jpg
    ├── produto-03-verde-costas.jpg
    ├── produto-03-verde-frente.jpg
    ├── produto-04-kanji-preta-costas.jpg
    ├── produto-04-kanji-preta-frente.jpg
    ├── produto-05-kanji-verde-costas.jpg
    ├── produto-05-kanji-verde-frente.jpg
    ├── produto-06-kanji-branca-costas.jpg
    ├── produto-06-kanji-branca-frente.jpg
    └── tabela-de-medidas.jpg
```

Os 12 arquivos de produto são referenciados pelo HTML dos cards criado em `script.js`. `lifestyle-kanji-preta.jpg` é a imagem de compartilhamento nos metadados Open Graph e Twitter. As demais imagens são referenciadas diretamente pelos elementos `img` do HTML.

## Executar localmente

Requisito: Python 3. Extraia o ZIP e entre na pasta `alvo`, que contém `index.html`.

```bash
cd alvo
python3 -m http.server 8000
```

Abra http://localhost:8000/ no navegador. Para conferir a página de erro, abra http://localhost:8000/404.html. O servidor simples do Python não substitui automaticamente respostas de erro pelo arquivo `404.html`.

Não há instalação de dependências nem etapa de build. O JavaScript é executado no navegador. As fontes Archivo Black e Barlow são carregadas pelo Google Fonts; as imagens estão na pasta local `alvo-img`.

## Deploy

Publique a pasta `alvo` como raiz do site, com `index.html` diretamente nessa raiz. Se utilizar um repositório que contém a pasta `alvo` dentro dele, selecione essa pasta como diretório raiz do projeto.

### Netlify

| Configuração | Valor |
| --- | --- |
| Build command | none — deixar em branco |
| Publish directory | root (`.`) |

Em uma publicação manual, envie a pasta `alvo` completa. Em uma publicação pelo repositório, mantenha os valores da tabela e selecione a raiz que contém `index.html`.

### Vercel

| Configuração | Valor |
| --- | --- |
| Framework Preset | Other |
| Build command | none — deixar em branco |
| Publish directory / Output Directory | root (`.`) |

Selecione a raiz que contém `index.html`. Não configure comando de instalação, pois o projeto não usa pacotes nem framework.

### Domínio e metadados

`robots.txt` permite o rastreamento de todo o site e aponta para https://alvojiujitsu.com.br/sitemap.xml. O sitemap lista apenas https://alvojiujitsu.com.br/, sem âncoras.

Para preservar exatamente a versão publicada, o HTML continua com as URLs de canonical, Open Graph e Twitter de https://alvo-jiu-jitsu.geyger.chatgpt.site/. Esses metadados não foram trocados pelo domínio do sitemap durante a exportação.

## Conteúdo legal existente

Os links Política de Privacidade e Termos de Uso abrem o texto `[CONTEÚDO A DEFINIR — LGPD]`. Esse marcador já fazia parte da versão publicada e foi preservado na exportação, inclusive no rodapé da página 404. Nenhum novo marcador de conteúdo foi acrescentado.

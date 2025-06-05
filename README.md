# Aplicativo de Notícias

![GitHub repo size](https://img.shields.io/github/repo-size/artsmoura/noticias_app)
![GitHub language count](https://img.shields.io/github/languages/count/artsmoura/noticias_app)

### Sobre

> Projeto de um APP de Notícias realizado em ReactNative
> Aplicacao consome a API da [NewsApi]<https://newsapi.org/>

### Instalação

1. Clone o Repositorio
```shell
git clone https://github.com/artsmoura/noticias_app.git
```

2. Instale as dependencias

```shell
npm install
```

3. Crie o arquivo .env na raiz do projeto com sua chave da NewsAPI:
```shell
EXPO_PUBLIC_API_KEY = sua_chave_api
```

4. Inicie a aplicacao
```shell
npx expo start
```

### 🔨 Funcionalidades

- Exibição de Notícias
- Listagem clicavel que leva para tela de detalhes da notícia
- Filtragem de notícias por categorias (Tecnologia, Saude, etc)
- Scroll infinito na tela de Mais Notícias
- Favoritar notícias 
- Tela de favoritos

### 💻 Decisões Técnicas

![image](https://img.shields.io/badge/Expo-000000?logo=Expo&logoColor=white)
![image](https://img.shields.io/badge/-React_Native-05122A?style=flat&logo=react)
![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
 - Armazenamento e gerenciamento de Estados
 - Estados para gerenciamento de notícias orinda das requisições da API
 - Integração com o AsyncStorage para cache e armazenamento de favoritos
 - Gerenciamento de favoritos
 - Gerenciamento do scroll infinito
 - Criacao da tela Mais Notícias pois é padrao de aplicações desse escopo
 - Reutilização dessa tela para os resultados de pesquisa e filtragem das categorias
 - NavBar para tela inicial e favoritos
 - StackNavigation para navegação entre as telas (busca, mais noticias, detalhes)
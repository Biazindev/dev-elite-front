# **Frontend da Aplicação de Filmes**
Este é o frontend de uma aplicação de filmes desenvolvida com React e TypeScript, utilizando Redux Toolkit para gerenciamento de estado e Styled Components para estilização. O frontend se integra com um backend Java/Spring Boot para buscar filmes, gerenciar favoritos e compartilhar listas de filmes. A aplicação está hospedada na Vercel e Render, e o backend na Render.

# **Tecnologias Utilizadas**<br>
**React:** Biblioteca para construção de interfaces de usuário.<br>
**TypeScript:** Superconjunto de JavaScript que adiciona tipagem estática ao código.<br>
**Redux Toolkit:** Ferramenta para gerenciamento de estado global da aplicação.<br>
**Styled Components:** Biblioteca para estilização de componentes com CSS-in-JS.<br>
**Vercel:** Plataforma para hospedagem do frontend da aplicação.<br>
**Render:** Plataforma onde o frontend e o backend da aplicação está hospedado.<br>

# **Funcionalidades**<br>
**Buscar Filmes:** Permite buscar filmes na API do TMDb, exibir resultados e ver detalhes de cada filme.<br>

# **Gerenciar Favoritos:**<br>

**Adicionar aos Favoritos:** Os usuários podem adicionar filmes à sua lista de favoritos, que é sincronizada com o backend.<br>
**Remover dos Favoritos:** É possível remover filmes da lista de favoritos.<br>
**Ver Lista de Favoritos:** A lista de filmes favoritos é exibida e atualizada em tempo real.<br>
**Compartilhar Favoritos:** É possivel compartilhar a lista de favoritos.<br>
A aplicação fornece um link direto para a lista de favoritos (https://dev-elite-front.vercel.app/favorites), que pode ser compartilhado para acessar os favoritos facilmente.

# **Como Configurar e Rodar a Aplicação**<br>

**Pré-requisitos**<br>
Node.js e npm (ou yarn) instalados.<br>
Conta na Vercel para deploy, ou rode localmente.<br>

# **Passos para Configuração**<br>
Clone o Repositório:<br>
git clone https://github.com/Biazindev/dev-elite-front.git<br>
**Instalar Dependências:**<br>
Instale as dependências necessárias com npm ou yarn:<br>
npm install ou yarn install<br>

# **Rodar a Aplicação Localmente:**<br>
Execute o comando para iniciar o servidor de desenvolvimento:<br>
npm start ou yarn start<br>
A aplicação estará disponível em http://localhost:3000.<br>

# **Estrutura do Projeto**

src/components: Contém os componentes reutilizáveis da aplicação.<br>
src/styles: Contém estilos globais e temas usando Styled Components.<br>
src/services: Contém a configuração de chamadas à API e integração com o backend.<br>

# **Deploy na Vercel**.<br>
Conecte o Repositório:<br>
Acesse o painel da Vercel e clique em "New Project".<br>
Conecte o repositório do GitHub onde está o frontend.<br>
Configuração de Build:<br>

*A Vercel detecta automaticamente um projeto React.*<br>
Confirme que o comando de build está correto: npm run build ou yarn build.<br>
Configure as variáveis de ambiente necessárias (como REACT_APP_API_URL).<br>

# **Deploy:**

Clique em "Deploy" e aguarde o processo ser concluído.<br>
A Vercel fornecerá uma URL para acessar a aplicação ao vivo.<br>

**Como Usar a Aplicação**<br>
**Buscar Filmes:** Use a barra de busca para encontrar filmes. Os resultados são exibidos em uma lista com opções para visualizar detalhes.<br>

**Adicionar aos Favoritos:** Clique no botão de coração para adicionar um filme à sua lista de favoritos.

**Visualizar Favoritos:** Acesse a lista de favoritos clicando no link de favoritos. Esta página mostra todos os filmes que foram salvos.

**Remover dos Favoritos:** Nos favoritos, clique no botão lixeira para remover um filme da lista.

**Compartilhar Favoritos:** Use o link https://dev-elite-front.vercel.app/favorites para compartilhar a lista com outras pessoas.<br><br>

# **Deploy**

**URL aplicação backend:** https://dev-elite-backend-java.onrender.com
**URL aplicação frontend:** https://dev-elite-front.onrender.com/
**URL aplicação frontend:** https://dev-elite-front.vercel.app/


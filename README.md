# Dino-Game
O projeto se trata de uma aplicação web onde o usuário pode jogar o Dino TRex Runner, similar ao aquele da Google
Essa aplicação serve como uma demonstração de diversas tecnologias, aplicadas no conceito de MVC (Model - View - Control)
Dessa forma, o usuário pode se cadastrar/logar no sistema, bem como adicionar um curso na aba "cursos" e se informar melhor na seção "sobre"
Para a parte de Cursos, é possível realizar um CRUD completo

# Tecnologias usadas
- Framework Express.js
- Engine de views Handlerbars
- Uuid para identificadores
- Salt para reforço na segurança de senhas
- Sequelize para aplicação de ORMs
- Dotenv para variáveis de ambiente
- Bcrypt para senhas
- Bootstrap para design
- Sass css para controle dinâmico do css
  
# Limitações conhecidas
- Durante a gameplay do TRex Dinno, após o score necessário para aparição dos dinossauros voadores, o jogo se torna instável, podendo ter objetos muito grudados e erros de renderização
- A velocidade aumenta de forma constante, porém em alguns casos abruptamente. Essa diferença é notada melhor no começo quando a velocidade começa relativamente baixa
- Bugs visuais na renderização dos sprites de alguns objetos
- Hitboxes não são tão grudadas nos objetos, então o jogador deve pular com certa "folga" em relação ao objeto que vem ao seu encontro
- Ao trocar o turno e anoitecer, toda a página troca de cores
- Falta de harmonia do botão de deleção de curso
- Deleção de curso acontece de forma direta, falta implementação de um sistema de confirmação para a exclusão

# Trabalhos futuros
Além da correção dos problemas já conhecidos, algumas coisas ainda devem ser implementadas para que a aplicação seja mais completa, algumas delas são:
- Criação do perfil de usuário
- Possibilidade de criar nova senha
- CRUD de cursos não pode ser realizado sem que usuário esteja logado
- Pontuação do jogador deve ser armazenada no banco de dados

# Perguntas pertinentes
1. Preciso estar logado para jogar o TRex Runner?
R: Não precisa

2. Preciso estar logado para realizar o CRUD de cursos?
   R: Não precisa

# Últimas observações

Por se tratar de um trabalho didático, certos arquivos que normalmente não são versionados, tais como jsons de configuração, se encontram no repositório
Os únicos arquivos que não estão inclusos são aqueles que possuiam dados de acesso pessoais a DB e a pasta node_modules

4. Como consigo acessar o meu perfil de usuário na aplicação?
   R: Essa parte não foi implementada, mas seria o ideal



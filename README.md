# Mobile Teste

Essa é a aplicação mobile feita em React Native para o teste. Possui um sistema de autenticação básico, que se integra com a API criada para esse mesmo teste.

Foi utilizada a tecnologia React Native, em conjunto com React-Apollo para que fosse feita a integração com GraphQL, e ESLint para toda a estilização e padronização do código da aplicação.

O aplicativo possui:
- Tela de login
- Tela de cadastro
- Validação de login e cadastro
- Feedback para diversos erros e feedback para carregamento
- Checagem automática se o usuário já está logado (se estiver, é redirecionado)

# Instalação

Os passos abaixo assumem que você possui o yarn instalado globalmente. Caso não possua, basta apenas executar `npm -g install yarn`.

1. Clone esse repositório executando o seguinte comando:

```
git clone https://github.com/rodriigovieira/mobile-teste.git
```

2. Mude para o diretório do projeto:

```
cd mobile-teste
```

3. Instale as dependências do projeto:

```
yarn
```

4. Execute o projeto:

Se deseja rodá-lo em um dispositivo iOS, execute `yarn ios`. Caso deseje rodar em um dispositivo android, execute `yarn android`.

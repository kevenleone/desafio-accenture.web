import React from 'react'
import Grid from './Grid';
import './Styles/styleDefault.css'
export default () => (
    <Grid cols="12">
    <br/>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active show" data-toggle="tab" href="#desafio">Desafio</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#consideracoes">Considerações</a>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active show" id="desafio">
                <Grid cols="6 12 12">
                <div className="wrapper">
                <br/><h2>Desafio Front-End da Accenture Recife</h2>
                    <p>O desafio proposta consiste em desenvolver uma aplicação que possibilita o cadastro de potenciais clientes de um novo produto.</p>
                    <h3><strong>Requisitos funcionais</strong></h3>
                    <ul>
                        <li className="green">Eu, como usuário, desejo cadastrar um cliente (nome completo, idade, cpf, telefone e e-mail). Todos os campos são obrigatórios;</li>
                        <li className="green">Eu, como usuário, desejo ver a listagem dos clientes (primeiro nome, telefone, e-mail);</li>
                        <li className="green">Eu, como usuário, desejo ver uma mensagem amigável quando não houver nenhum cliente cadastrado;</li>
                        <li className="green">Eu, como usuário, desejo buscar por um cliente pelo Nome ou CPF;</li>
                        <li className="green">Eu, como usuário, desejo ver os detalhes desse usuário que foi buscado (nome completo, idade, cpf, telefone e e-mail);</li>
                        <li className="green">Eu, como usuário, desejo poder alterar os dados do cliente;</li>
                        <li className="green">Eu, como usuário, desejo poder apagar um cliente (confirmando o cpf do mesmo);</li>
                    </ul>
                    <h3><strong>Requisitios técnicos</strong></h3>
                    <ul>
                        <li className="green">Responsividade (resolucão mínima de 460x)</li>
                        <li className="green">Consumir e Persistir os dados localmente</li>
                        <li className="red">Desenvolver testes unitários</li>
                        <li className="green">Uso de rotas</li>
                        <li className="green">Validacão de formulário com tratamento de erro</li>
                        <li className="orange">Suporte IE11+, Chrome, Safari, Firefox.</li>
                    </ul>
                    <h3><strong>Stack</strong></h3>
                    <ul>
                        <li className="green">Utilizar um framework SPA de sua escolha, mas recomendamos - <u className="green">React.js</u>, Angular, Vue.js.</li>
                        <li className="green">Utilizar um framework CSS de sua escolha, como <u className="green">bootstrap</u> ou Materialize.</li>
                        <li className="orange">Utilizar automatizador de tarefas de sua escolha, como Gulp , Grunt ou <u className="orange"> Webpack </u>.</li>
                    </ul>
                    <hr />

                    <b>Legenda:</b>
                    <ul>
                        <li className="green">Implementado</li>
                        <li className="red">Não implementado</li>
                        <li className="orange">Talvez / Em partes</li>
                    </ul>
                </div>
            </Grid>
                </div>
                <div className="tab-pane fade" id="consideracoes">
                <Grid cols="6"> <br />
                <h2>Observações e Considerações</h2>
                <p>Para realização do projeto foram utilizadas algumas ferramentas extras para dar apoio ao Front-end servindo as informações, um back-end foi criado para isso utilizando: </p>
                <ul>
                    <li>Express</li>
                    <li>Sequelize</li>
                    <li>Body-Parser</li>
                    <li>UUID</li>
                    <li>DOTENV</li>
                    <li><s>TokenJWT</s></li>
                </ul>

                <b>OBS¹: Caso não seja possível a inicialização do back-end local pode se utilizar a API rodando no Heroku pelo arquivo API.JS</b> <br />
                <b>OBS²: Não foi possível realizar todos os cenários de testes, principalmente nos input</b> <br />
                <b>OBS³: IE não foi testado</b>
                <br />
                <br />
                <h3>A API e o projeto está sendo executado no Heroku, <a href="https://desafio-accenture-k.herokuapp.com/"> link </a>: </h3>
                <p>Uma simples definição das rotas presentes em: https://desafio-accenture-k.herokuapp.com/</p>
                <h4>API</h4>
                <ul>
                    <li>post('cliente/')</li>
                    <li>get('cliente/')</li>
                    <li>get('cliente/:id')</li>
                    <li>get('cliente/search/:criteria')</li>
                    <li>put('cliente/:id')</li>
                    <li>delete('cliente/:id')</li>
                </ul>
                <h4>React Web</h4>
                <ul>
                    <li>/ [LoginPage]</li>
                    <li>/inicio [Página Inicial]</li>
                    <li>/clientes[Lista de Clientes]</li>
                    <li>/clientes/:id [Perfil do Cliente]</li>
                </ul>

            </Grid>
                </div>
            </div>
    </Grid>
)
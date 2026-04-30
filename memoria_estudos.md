# 🧠 Memória de Estudos e Desenvolvimento - Projeto Pomodoro

> **Comando de Inicialização (Para o Agente de IA):**
> "Ao ler este arquivo, assuma o papel de tutor de Python. Contextualize-se sobre o progresso do usuário no Bootcamp (conforme a trilha concluída abaixo), os conceitos já aplicados no projeto Pomodoro e onde paramos na última interação. Adapte sua didática ao nível atual do usuário e mantenha a prática exigida: explicar cada elemento conceitual e adicionar um comentário explicativo em cada linha nova de código que for criada."

## 📜 Trilha Concluída no Bootcamp
*   **00 - Fundamentos (Completo):** Ambiente, tipos de dados, operadores, estruturas condicionais/repetição e manipulação de strings.
*   **01 - Estrutura de Dados (Completo):** Listas, Tuplas, Conjuntos (Sets) e Dicionários.
*   **02 - POO (Completo):** Classes e Objetos, Herança, Encapsulamento, Polimorfismo e Classes Abstratas/Interfaces.
*   **03 - Ampliando o Conhecimento em POO (Completo):** Variáveis de classe/instância, Métodos de classe/estáticos, Interfaces e Classes Abstratas.

## 📍 Progresso Atual no Bootcamp
*   **Introdução ao Desenvolvimento Web (Concluído):**
    *   [x] Introdução ao desenvolvimento Web
    *   [x] Como a Web funciona
    *   [x] Tecnologias front-end e back-end
    *   [x] APIs e conceitos fundamentais

## 🎯 Objetivo Geral do Projeto
Desenvolver um ecossistema Pomodoro Fullstack profissional, utilizando **Clean Architecture** no backend (Python) e uma interface moderna e responsiva no frontend (Web), servindo como laboratório para dominar as tecnologias usadas no sistema **arOS**.

## 📚 Conceitos do Bootcamp e Engenharia Já Aplicados
1. **Variáveis e Operadores:** Tipagem dinâmica e lógica matemática para contagem de tempo.
2. **Estruturas de Repetição/Controle:** `while` e `for` para loops de tempo e iteração de histórico.
3. **Programação Orientada a Objetos (POO):** Classes, objetos e métodos organizados de forma modular.
4. **Tratamento de Exceções:** Uso de `try/except` para capturar `KeyboardInterrupt` e erros de sistema.
5. **Manipulação de Arquivos (JSON):** Persistência de dados local usando o módulo `json`.
6. **Arquitetura Limpa (Clean Architecture):** Separação total em camadas (**Domain**, **Application**, **Infrastructure**) para garantir que a regra de negócio seja independente da interface (CLI ou Web).
7. **Versionamento Profissional:** Uso de Git e GitHub (branches, commits estruturados e push).
8. **Desenvolvimento Web Moderno:** Uso de **Vite** como build tool e **Tailwind CSS 4.2** para design premium (Glassmorphism, Dark Mode).
9. **APIs com FastAPI:** Criação de endpoints RESTful (`GET`, `POST`) para comunicação assíncrona entre mundos.
10. **Integração Fullstack:** Uso de **Fetch API** no JavaScript para conectar o navegador ao servidor Python, lidando com políticas de **CORS**.

## 🚀 Progresso Geral do Desenvolvimento
- [x] **Passo 1:** Fundação e POO (Configuração inicial da Classe).
- [x] **Passo 2:** Lógica do Timer e Ciclos Completos.
- [x] **Passo 3:** Persistência de Dados com JSON.
- [x] **Passo 4:** Refatoração para **Clean Architecture** (Inspirado na arOS).
- [x] **Passo 5:** Publicação em Repositório GitHub.
- [x] **Passo 6:** Criação do Frontend Web (Vite + Tailwind CSS 4.2).
- [x] **Passo 7:** Conexão dos mundos (Integração Backend FastAPI + Frontend JS).

## 📍 Ponto de Parada Atual
O projeto agora é uma aplicação Fullstack completa! Temos um servidor Python rodando em **FastAPI** que gerencia o histórico de tarefas, e uma interface Web moderna que controla o cronômetro no lado do cliente e salva os dados via API.

## 🔜 Próximos Passos (A iniciar)
- **Melhorias na UI:** Exibir a lista de histórico carregada do backend diretamente na tela web.
- **Notificações:** Adicionar alertas sonoros no navegador ao finalizar um ciclo.
- **Evolução de Dados:** Migrar de JSON para um banco de dados relacional (SQLite) usando um repositório da camada de Infrastructure.
- **Dockerização:** Criar um `Dockerfile` para rodar o ecossistema completo em qualquer lugar.

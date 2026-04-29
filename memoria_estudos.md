# 🧠 Memória de Estudos e Desenvolvimento - Projeto Pomodoro

> **Comando de Inicialização (Para o Agente de IA):**
> "Ao ler este arquivo, assuma o papel de tutor de Python. Contextualize-se sobre o progresso do usuário no Bootcamp (conforme a trilha concluída abaixo), os conceitos já aplicados no projeto Pomodoro e onde paramos na última interação. Adapte sua didática ao nível atual do usuário e mantenha a prática exigida: explicar cada elemento conceitual e adicionar um comentário explicativo em cada linha nova de código que for criada."

## 📜 Trilha Concluída no Bootcamp
*   **00 - Fundamentos (Completo):** Ambiente, tipos de dados, operadores, estruturas condicionais/repetição e manipulação de strings.
*   **01 - Estrutura de Dados (Completo):** Listas, Tuplas, Conjuntos (Sets) e Dicionários.
*   **02 - POO (Completo):** Classes e Objetos, Herança, Encapsulamento, Polimorfismo e Classes Abstratas/Interfaces.
*   **03 - Ampliando o Conhecimento em POO (Completo):** Variáveis de classe/instância, Métodos de classe/estáticos, Interfaces e Classes Abstratas.

## 📍 Progresso Atual no Bootcamp
*   **Introdução ao Desenvolvimento Web (Em andamento):**
    *   [x] Introdução ao desenvolvimento Web (09:05)
    *   [x] Como a Web funciona (12:27)
    *   [x] Tecnologias front-end e back-end (09:44)
    *   [ ] APIs e conceitos fundamentais (Ponto atual)


## 🎯 Objetivo Geral do Projeto
Desenvolver um programa Pomodoro em Python partindo de uma interface de linha de comando (CLI) baseada nos conhecimentos do Bootcamp e, futuramente, evoluir para um aplicativo nativo para MacBook.

## 📚 Conceitos do Bootcamp Já Aplicados no Código
1. **Variáveis e Operadores:** Uso de tipagem dinâmica, cálculos matemáticos (`//` para divisão inteira, `%` para resto, `-=` para decremento).
2. **Estruturas de Repetição:** 
   - `while`: Responsável por manter a contagem regressiva rodando enquanto o tempo for maior que zero.
   - `for`: Utilizado para iterar na quantidade de ciclos (1 a 4) e para ler a lista de histórico no relatório.
3. **Estruturas Condicionais:** 
   - `if/else`: Utilizado para identificar quando é o momento de fazer uma pausa curta ou exibir o final dos ciclos.
   - Verificação `if __name__ == "__main__":` para proteger a execução direta do arquivo.
4. **Manipulação de Strings:** Coleta de dados com `input()`, formatação de saídas com f-strings, conversão para maiúsculas (`.upper()`) e centralização de texto (`.center()`).
5. **Estruturas de Dados (Listas):** Criação de lista `self.historico = []`, inserção de elementos com `.append()` e varredura elegante com `enumerate()`.
6. **Programação Orientada a Objetos (POO):** 
   - Criação da classe base `Pomodoro`.
   - Método construtor `__init__` para definir atributos padrão.
   - Métodos de manipulação (`executar`, `iniciar_status`, `exibir_relatorio`).
   - Uso intensivo do `self` para acessar o contexto do objeto.
7. **Tratamento de Exceções:** Uso de blocos `try/except` e captura específica de `KeyboardInterrupt` para lidar com interrupções do usuário (`Ctrl+C`) de forma elegante.
8. **Manipulação de Arquivos (JSON):** Uso da biblioteca `json` (`dump` e `load`) combinada com o gerenciador de contexto `with open()` para salvar e carregar dados de forma persistente em arquivos de texto.



## 🚀 Progresso Geral do Desenvolvimento
- [x] **Passo 1:** Fundação e POO (Configuração inicial da Classe).
- [x] **Passo 2:** Lógica do Timer (Contagem regressiva no terminal).
- [x] **Passo 3:** Sistema de Ciclos Completos (Automatizando as transições foco/pausa).
- [x] **Passo 4:** Registro de Atividades e Histórico (Guardar tarefas e exibir relatório).
- [x] **Passo 5:** Modos de Operação com Dicionários (Configurações flexíveis).
- [x] **Passo 6:** Tratamento de Erros e Robustez (Escudo contra interrupções).
- [x] **Passo 7:** Persistência de Dados com JSON (Salvar tarefas em arquivo).


## 📍 Ponto de Parada Atual
Implementamos a **Persistência de Dados com JSON**. O app agora salva o histórico de tarefas automaticamente a cada ciclo no arquivo `historico.json` e o recupera ao ser iniciado.

## 🔜 Próximos Passos (A iniciar)
- **Interface Visual (Futuro):** Começar a desenhar os primeiros rascunhos da interface para macOS ou integrá-lo a uma interface Web moderna.
- **Refatoração/Melhorias:** Permitir limpar o histórico de tarefas se necessário.



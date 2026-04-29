import time # Importa o módulo 'time' embutido no Python, que usaremos mais tarde para fazer o relógio "passar".
import json # Importa o módulo 'json' nativo para trabalhar com arquivos de dados estruturados.

class Pomodoro: # Cria a classe Pomodoro (Programação Orientada a Objetos). Funciona como um "molde" para o nosso cronômetro.
    
    # O método construtor (__init__) é chamado automaticamente quando criamos um objeto desta classe.
    def __init__(self, tempo_foco=1, tempo_pausa=0): 
        # 'self' faz referência ao próprio objeto que está sendo criado.
        self.tempo_foco = tempo_foco # Define o atributo de tempo de foco (em minutos). Se não passarmos nada, o padrão é 25.
        self.tempo_pausa = tempo_pausa # Define o atributo de tempo de pausa (em minutos). Se não passarmos nada, o padrão é 5.
        self.ciclos_completos = 0 # Variável (atributo) para contar quantos Pomodoros já terminamos. Começa em 0.
        self.historico = [] # Cria uma lista vazia que guardará os nomes das tarefas executadas.
        self.carregar_historico() # Executa a busca por tarefas antigas salvas no computador logo na inicialização.


        # Criamos um dicionário onde a CHAVE é o número da opção e o VALOR é outro dicionário com os tempos.
        # Isso é um exemplo de dicionário aninhado (nested dict), muito comum em configurações.
        self.modos = {
            "1": {"nome": "Padrão", "foco": 25, "pausa": 5},
            "2": {"nome": "Focado", "foco": 50, "pausa": 10},
            "3": {"nome": "Leitura", "foco": 15, "pausa": 3},
            "4": {"nome": "Teste", "foco": 1, "pausa": 1}
        }
        
    def exibir_status(self): # Método (função dentro da classe) para mostrar a configuração atual do Pomodoro.
        # Exibe (print) uma string formatada (f-string) misturando texto com as variáveis (atributos) do objeto.
        print(f"Pomodoro configurado: {self.tempo_foco} min de foco e {self.tempo_pausa} min de pausa.") 

    def salvar_historico(self): # Método responsável por gravar o histórico de tarefas em disco.
        try:
            # Abre o arquivo historico.json no modo escrita ('w'). O 'with' fecha o arquivo automaticamente depois.
            with open("historico.json", "w", encoding="utf-8") as arquivo: 
                # Converte a lista 'self.historico' em uma string JSON e salva no arquivo com indentação.
                json.dump(self.historico, arquivo, indent=4, ensure_ascii=False) 
            print("[Sistema] Histórico salvo com sucesso!")
        except Exception as e:
            print(f"\n[Erro] Falha ao gravar arquivo de histórico: {e}")

    def carregar_historico(self): # Método responsável por ler as tarefas salvas em disco ao iniciar.
        try:
            # Tenta abrir o arquivo no modo leitura ('r').
            with open("historico.json", "r", encoding="utf-8") as arquivo: 
                # Transforma o texto JSON de volta em uma lista utilizável no Python.
                self.historico = json.load(arquivo) 
        except FileNotFoundError: # Captura o erro específico de 'Arquivo Não Encontrado'.
            self.historico = [] # Se o arquivo não existe ainda, apenas iniciamos a lista vazia sem alarmes.
        except Exception as e:
            print(f"\n[Aviso] Falha ao recuperar histórico anterior: {e}")


    def selecionar_modo(self): # Novo método para gerenciar a escolha do usuário.
        print("\n" + " ESCOLHA SEU MODO ".center(40, "-"))
        # O método .items() nos permite percorrer CHAVE e VALOR do dicionário ao mesmo tempo.
        for chave, info in self.modos.items():
            print(f"{chave} - {info['nome']} ({info['foco']}m foco / {info['pausa']}m pausa)")
        
        escolha = input("\nDigite o número do modo desejado: ")
        
        # Verificamos se a 'escolha' digitada existe como uma CHAVE no nosso dicionário de modos.
        if escolha in self.modos:
            modo_escolhido = self.modos[escolha] # Acessamos o dicionário interno pela chave.
            self.tempo_foco = modo_escolhido["foco"] # Atualizamos o atributo de foco da classe.
            self.tempo_pausa = modo_escolhido["pausa"] # Atualizamos o atributo de pausa da classe.
            print(f"Modo '{modo_escolhido['nome']}' aplicado com sucesso!")
        else:
            print("Opção inválida! Usando configuração padrão.")

    def iniciar_status(self, minutos): # Define o método para começar o cronômetro, recebendo a quantidade de minutos.
        segundos = minutos * 60 # Converte os minutos passados para o total de segundos (operador de multiplicação).
        while segundos > 0: # Inicia um laço de repetição que durará enquanto houver segundos restantes.
            minutos_restantes = segundos // 60 # Usa a divisão inteira para descobrir quantos minutos faltam.
            segundos_restantes = segundos % 60 # Usa o operador de módulo para pegar o resto (os segundos que sobram).
            # Exibe o tempo formatado (02d coloca um zero à esquerda se necessário) e volta o cursor ao início (\r).
            print(f"{minutos_restantes:02d}:{segundos_restantes:02d}", end="\r") 
            time.sleep(1) # Faz o programa "dormir" por 1 segundo para simular a passagem de tempo real.
            segundos -= 1 # Subtrai 1 segundo do contador (operador de atribuição com subtração).
        print("Tempo esgotado!") # Exibe uma mensagem final quando o laço 'while' termina.

    def exibir_relatorio(self):
        print("\n" + " RELATÓRIO FINAL ".center(40, "="))
        # 'enumerate' nos dá o índice (pos) e o valor (tarefa) ao mesmo tempo.
        for pos, tarefa in enumerate(self.historico, 1):
            print(f"Ciclo {pos}: {tarefa.upper()}")
        print("=" * 40)
    
    def executar(self):
        self.selecionar_modo() # Chama a nossa nova lógica de seleção de dicionários.
        # ... o restante do seu loop 'for' continua igual ...
        for i in range(1, 5): # Define que faremos 4 ciclos (de 1 até 4).
            tarefa = input("\nO que você vai produzir agora? ")
            self.historico.append(tarefa)
            self.salvar_historico() # Salva automaticamente no arquivo a cada nova tarefa adicionada.

            print(f"\n--- Ciclo {i} iniciou! FOCO total! ---")
            self.iniciar_status(self.tempo_foco)
            self.ciclos_completos += 1
            if i < 4:
                print("Hora da pausa!")
                self.iniciar_status(self.tempo_pausa)
        print(f"\nParabéns! Você completou {self.ciclos_completos} ciclos de Pomodoro.")

# Parte principal do programa, onde vamos testar o nosso "molde".
if __name__ == "__main__": # Esta estrutura if garante que o código abaixo só rode se executarmos este arquivo diretamente.
    
    # Cria um objeto real chamado 'meu_pomodoro' a partir da classe 'Pomodoro'.
    meu_pomodoro = Pomodoro() 
    
    try:
        # Usamos o objeto criado e chamamos o método 'exibir_status' para ver ele funcionando.
        meu_pomodoro.exibir_status()
        
        # Chama o método que você criou, passando o atributo 'tempo_foco' do próprio objeto.
        meu_pomodoro.executar()

        meu_pomodoro.exibir_relatorio()
    except KeyboardInterrupt: # Captura quando o usuário aperta Ctrl+C para encerrar o programa.
        print("\n\n[Aviso] Pomodoro interrompido pelo usuário. Até a próxima! 🍅")
    except Exception as e: # Captura qualquer outro erro inesperado (boa prática).
        print(f"\nOcorreu um erro inesperado: {e}")

     
from src.domain.entities import PomodoroSession
from src.application.use_cases.run_session_use_case import RunSessionUseCase

class CLIApp:
    """A 'Cara' do App no Terminal. Recebe o input inicial do usuário e delega para o Use Case."""
    
    MODES = {
        "1": {"nome": "Padrão", "foco": 25, "pausa": 5},
        "2": {"nome": "Focado", "foco": 50, "pausa": 10},
        "3": {"nome": "Leitura", "foco": 15, "pausa": 3},
        "4": {"nome": "Teste", "foco": 1, "pausa": 1}
    }

    def __init__(self, run_session_use_case: RunSessionUseCase):
        self.run_session_use_case = run_session_use_case

    def show_menu_and_start(self):
        print("\n" + " ESCOLHA SEU MODO ".center(40, "-"))
        for key, info in self.MODES.items():
            print(f"{key} - {info['nome']} ({info['foco']}m foco / {info['pausa']}m pausa)")
        
        escolha = input("\nDigite o número do modo desejado: ")
        
        if escolha in self.MODES:
            modo_escolhido = self.MODES[escolha]
            print(f"Modo '{modo_escolhido['nome']}' aplicado com sucesso!")
        else:
            print("Opção inválida! Usando configuração padrão.")
            modo_escolhido = self.MODES["1"]

        # Cria a entidade de Domínio com os dados escolhidos
        session = PomodoroSession(
            mode_name=modo_escolhido["nome"],
            focus_time_mins=modo_escolhido["foco"],
            pause_time_mins=modo_escolhido["pausa"]
        )

        # Entrega a entidade para o Application Layer fazer a mágica
        self.run_session_use_case.execute(session)

        # Quando termina, podemos exibir um relatório final baseando-se no histórico da sessão
        self._show_report(session.history)

    def _show_report(self, history: list):
        print("\n" + " RELATÓRIO FINAL ".center(40, "="))
        for pos, tarefa in enumerate(history, 1):
            print(f"Ciclo {pos}: {tarefa.upper()}")
        print("=" * 40)

from src.domain.entities import PomodoroSession
from src.domain.exceptions import SessionInterruptedError
from src.application.ports.repositories import ISessionRepository
from src.application.ports.notifiers import INotifierService

class RunSessionUseCase:
    """
    Orquestra a regra de execução de um ciclo completo de Pomodoros.
    Usa injeção de dependência para se comunicar com o mundo externo (ports).
    """
    def __init__(self, repository: ISessionRepository, notifier: INotifierService):
        self.repository = repository
        self.notifier = notifier

    def execute(self, session: PomodoroSession):
        self.notifier.notify(f"Pomodoro configurado: {session.focus_time_mins} min de foco e {session.pause_time_mins} min de pausa.")
        
        # Tenta recuperar histórico antigo
        session.history = self.repository.load_history()

        try:
            for i in range(1, 5):
                task_name = self.notifier.ask_for_input("\nO que você vai produzir agora? ")
                session.add_task(task_name)
                
                # Salva o estado atual no repositório
                self.repository.save_history(session.history)
                self.notifier.notify("[Sistema] Histórico salvo com sucesso!")

                self.notifier.notify(f"\n--- Ciclo {i} iniciou! FOCO total! ---")
                self.notifier.run_timer(session.focus_time_mins)
                session.complete_cycle()

                if i < 4:
                    self.notifier.notify("Hora da pausa!")
                    self.notifier.run_timer(session.pause_time_mins)
            
            self.notifier.notify(f"\nParabéns! Você completou {session.completed_cycles} ciclos de Pomodoro.")
            
        except KeyboardInterrupt:
            # Transforma uma exceção de sistema em uma exceção de domínio
            raise SessionInterruptedError()

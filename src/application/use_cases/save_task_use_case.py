from src.application.ports.repositories import ISessionRepository

class SaveTaskUseCase:
    """Caso de uso responsável por salvar uma tarefa no histórico."""
    def __init__(self, repository: ISessionRepository):
        self.repository = repository

    def execute(self, task_name: str, cycle: int = 0):
        # Na versão CLI, salvávamos apenas o nome (em strings) na lista.
        # Para compatibilidade (ou se quisermos evoluir depois), faremos o mesmo.
        history = self.repository.load_history()
        history.append(task_name)
        self.repository.save_history(history)
        return {"status": "success", "message": "Tarefa salva com sucesso!"}

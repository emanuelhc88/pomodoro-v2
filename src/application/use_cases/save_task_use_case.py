from src.application.ports.repositories import ISessionRepository

class SaveTaskUseCase:
    """Caso de uso responsável por salvar uma tarefa no histórico."""
    def __init__(self, repository: ISessionRepository):
        self.repository = repository

    def execute(self, task_name: str, cycles: int = 1):
        self.repository.save_task(task_name, cycles)
        return {"status": "success", "message": "Tarefa salva com sucesso!"}

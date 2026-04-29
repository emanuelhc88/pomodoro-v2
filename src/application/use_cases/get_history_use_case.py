from src.application.ports.repositories import ISessionRepository

class GetHistoryUseCase:
    """Caso de uso responsável por buscar as tarefas concluídas."""
    def __init__(self, repository: ISessionRepository):
        self.repository = repository

    def execute(self) -> list:
        return self.repository.load_history()

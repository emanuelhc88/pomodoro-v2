from abc import ABC, abstractmethod

class ISessionRepository(ABC):
    """Contrato que define como o histórico deve ser salvo/carregado, sem saber se é BD ou Arquivo."""
    
    @abstractmethod
    def save_history(self, history: list):
        pass

    @abstractmethod
    def load_history(self) -> list:
        pass

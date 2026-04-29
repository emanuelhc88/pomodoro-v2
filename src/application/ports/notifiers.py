from abc import ABC, abstractmethod

class INotifierService(ABC):
    """Contrato que define as ações de notificação (print, bip) e contagem do tempo."""
    
    @abstractmethod
    def notify(self, message: str):
        pass
        
    @abstractmethod
    def ask_for_input(self, prompt_message: str) -> str:
        pass

    @abstractmethod
    def run_timer(self, minutes: int):
        pass

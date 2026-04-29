import time
from src.application.ports.notifiers import INotifierService

class CLINotifierService(INotifierService):
    """Implementação real do serviço de notificação, que usa prints no Terminal do macOS/Linux."""
    
    def notify(self, message: str):
        print(message)
        
    def ask_for_input(self, prompt_message: str) -> str:
        return input(prompt_message)

    def run_timer(self, minutes: int):
        segundos = minutes * 60
        while segundos > 0:
            minutos_restantes = segundos // 60
            segundos_restantes = segundos % 60
            print(f"{minutos_restantes:02d}:{segundos_restantes:02d}", end="\r")
            time.sleep(1)
            segundos -= 1
        print("Tempo esgotado!")

import json
from src.application.ports.repositories import ISessionRepository

class JsonSessionRepository(ISessionRepository):
    """Implementação real do repositório, que salva em um arquivo JSON no disco."""
    def __init__(self, file_path: str = "historico.json"):
        self.file_path = file_path

    def save_task(self, task_name: str, cycles: int):
        try:
            history = self.load_history()
            history.append(f"{task_name} ({cycles} cycles)")
            with open(self.file_path, "w", encoding="utf-8") as arquivo:
                json.dump(history, arquivo, indent=4, ensure_ascii=False)
        except Exception as e:
            print(f"\n[Erro Interno] Falha ao gravar arquivo de histórico: {e}")

    def load_history(self) -> list:
        try:
            with open(self.file_path, "r", encoding="utf-8") as arquivo:
                return json.load(arquivo)
        except FileNotFoundError:
            return []
        except Exception as e:
            print(f"\n[Aviso Interno] Falha ao recuperar histórico anterior: {e}")
            return []

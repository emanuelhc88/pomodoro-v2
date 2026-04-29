import uvicorn
from src.infrastructure.repositories.json_repository import JsonSessionRepository
from src.application.use_cases.save_task_use_case import SaveTaskUseCase
from src.application.use_cases.get_history_use_case import GetHistoryUseCase
from src.infrastructure.entrypoints import api

def main():
    # 1. Instanciamos a Infraestrutura (Mundo Real)
    repository = JsonSessionRepository("historico.json")

    # 2. Instanciamos os Casos de Uso (Application)
    api.save_task_use_case = SaveTaskUseCase(repository)
    api.get_history_use_case = GetHistoryUseCase(repository)

    # 3. Rodamos o Servidor Web FastAPI
    print("🚀 Iniciando o Backend Python na porta 8000...")
    uvicorn.run(api.app, host="127.0.0.1", port=8000)

if __name__ == "__main__":
    main()

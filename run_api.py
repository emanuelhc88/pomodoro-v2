import os
import uvicorn
from dotenv import load_dotenv
from src.infrastructure.repositories.json_repository import JsonSessionRepository
from src.infrastructure.repositories.postgres_repository import PostgresSessionRepository
from src.application.use_cases.save_task_use_case import SaveTaskUseCase
from src.application.use_cases.get_history_use_case import GetHistoryUseCase
from src.infrastructure.entrypoints import api

def main():
    # 0. Carrega as variáveis de ambiente do arquivo .env
    load_dotenv()
    database_url = os.environ.get("DATABASE_URL")

    # 1. Instanciamos a Infraestrutura (Mundo Real)
    if database_url:
        print("🔧 Conectando ao PostgreSQL (Render)...")
        # Substitui postgres:// por postgresql:// (Exigência do SQLAlchemy)
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql://", 1)
        repository = PostgresSessionRepository(database_url)
    else:
        print("⚠️ DATABASE_URL não encontrada no .env. Usando arquivo JSON local.")
        repository = JsonSessionRepository("historico.json")

    # 2. Instanciamos os Casos de Uso (Application)
    api.save_task_use_case = SaveTaskUseCase(repository)
    api.get_history_use_case = GetHistoryUseCase(repository)

    # 3. Rodamos o Servidor Web FastAPI
    # Em produção (Render), precisamos escutar no 0.0.0.0 e pegar a porta que o Render nos der.
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Iniciando o Backend Python na porta {port}...")
    uvicorn.run(api.app, host="0.0.0.0", port=port)

if __name__ == "__main__":
    main()

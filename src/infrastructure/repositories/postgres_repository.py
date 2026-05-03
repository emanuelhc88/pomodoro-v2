from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.application.ports.repositories import ISessionRepository
from src.infrastructure.database.models import Base, TaskRecord

class PostgresSessionRepository(ISessionRepository):
    """
    Implementação real do repositório para o banco de dados PostgreSQL.
    """
    def __init__(self, database_url: str):
        # Cria a conexão com o banco
        self.engine = create_engine(database_url)
        
        # Cria as tabelas se elas não existirem
        Base.metadata.create_all(self.engine)
        
        # Prepara a fábrica de sessões (transações)
        self.Session = sessionmaker(bind=self.engine)

    def save_history(self, history: list):
        # Pela nossa lógica antiga, o history é uma lista de strings.
        # Mas no DB, nós adicionamos um registro de cada vez.
        # Para manter o contrato ISessionRepository sem quebrar o RunSessionUseCase antigo,
        # vamos apenas pegar a última tarefa adicionada na lista (que foi o append feito no use case).
        # Em uma refatoração melhor, o Use Case enviaria apenas a tarefa individual, 
        # mas faremos isso para respeitar a Clean Architecture e trocar a peça perfeitamente.
        if not history:
            return
            
        last_task_name = history[-1]

        with self.Session() as session:
            new_record = TaskRecord(task_name=last_task_name)
            session.add(new_record)
            session.commit()

    def load_history(self) -> list:
        # Carrega os registros do banco e converte de volta para lista de strings
        # assim a aplicação não percebe que os dados vieram de um banco real.
        with self.Session() as session:
            records = session.query(TaskRecord).order_by(TaskRecord.created_at.asc()).all()
            return [record.task_name for record in records]

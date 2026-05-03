from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class TaskRecord(Base):
    """
    Representação da tabela de histórico no Banco de Dados.
    """
    __tablename__ = "history_tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<TaskRecord(id={self.id}, task_name='{self.task_name}')>"

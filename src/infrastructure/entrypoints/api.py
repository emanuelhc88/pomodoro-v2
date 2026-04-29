from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Injeção manual (Para simplificar, instanciaremos no run_api.py, mas as rotas ficarão aqui)
# Em uma aplicação arOS real, usaríamos um Container de Injeção de Dependência.

app = FastAPI(title="Pomodoro API", description="API do backend Python para o Frontend Web")

# Configuração CORS: Permitir que o Vite (localhost:5173) converse com a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Na arOS em produção, colocaríamos apenas o domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskRequest(BaseModel):
    task_name: str

# Estas variáveis globais serão injetadas pelo run_api.py
get_history_use_case = None
save_task_use_case = None

@app.get("/tasks")
def get_tasks():
    history = get_history_use_case.execute()
    return {"history": history}

@app.post("/tasks")
def save_task(request: TaskRequest):
    result = save_task_use_case.execute(request.task_name)
    return result

class PomodoroSession:
    """
    Entidade de negócio que representa a sessão de Pomodoro.
    Ela carrega as regras e os dados, mas não sabe como salvar ou notificar.
    """
    def __init__(self, mode_name: str, focus_time_mins: int, pause_time_mins: int):
        self.mode_name = mode_name
        self.focus_time_mins = focus_time_mins
        self.pause_time_mins = pause_time_mins
        self.completed_cycles = 0
        self.history = []

    def add_task(self, task_name: str):
        self.history.append(task_name)
        
    def complete_cycle(self):
        self.completed_cycles += 1

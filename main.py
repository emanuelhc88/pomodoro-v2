from src.infrastructure.repositories.json_repository import JsonSessionRepository
from src.infrastructure.adapters.cli_notifier import CLINotifierService
from src.application.use_cases.run_session_use_case import RunSessionUseCase
from src.infrastructure.entrypoints.cli import CLIApp
from src.domain.exceptions import SessionInterruptedError

def main():
    # 1. Instanciamos a Infraestrutura (Mundo Real)
    repository = JsonSessionRepository("historico.json")
    notifier = CLINotifierService()

    # 2. Injetamos a Infraestrutura no Caso de Uso (Application)
    run_session_use_case = RunSessionUseCase(repository=repository, notifier=notifier)

    # 3. Injetamos o Caso de Uso no Entrypoint (A interface com o usuário)
    app = CLIApp(run_session_use_case=run_session_use_case)

    try:
        # 4. Damos o "play"
        app.show_menu_and_start()
    except SessionInterruptedError:
        print("\n\n[Aviso] Pomodoro interrompido pelo usuário. Até a próxima! 🍅")
    except Exception as e:
        print(f"\nOcorreu um erro inesperado: {e}")

if __name__ == "__main__":
    main()

class InvalidModeError(Exception):
    """Lançada quando o usuário seleciona um modo de pomodoro inexistente."""
    pass

class SessionInterruptedError(Exception):
    """Lançada quando a sessão é interrompida forçadamente (ex: Ctrl+C)."""
    pass

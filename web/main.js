const timerDisplay = document.getElementById('timer-display');
const statusLabel = document.getElementById('status-label');
const startBtn = document.getElementById('start-btn');
const taskInput = document.getElementById('task-input');
const modeBtns = document.querySelectorAll('.mode-btn');

let currentFocusTime = 25;
let currentPauseTime = 5;
let timerInterval = null;
let secondsRemaining = 0;
let isFocusing = false;
let currentTask = "";

// A URL da nossa API Python (FastAPI) rodando localmente
const API_URL = "http://localhost:8000/tasks";

// Change Mode Logic
modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (timerInterval) return; // Prevent changing mode while running
        
        modeBtns.forEach(b => {
            b.classList.remove('active', 'bg-indigo-500/20', 'text-indigo-300', 'border-indigo-500/50');
            b.classList.add('bg-white/5', 'text-slate-300', 'border-transparent');
        });
        
        const clickedBtn = e.target;
        clickedBtn.classList.remove('bg-white/5', 'text-slate-300', 'border-transparent');
        clickedBtn.classList.add('active', 'bg-indigo-500/20', 'text-indigo-300', 'border-indigo-500/50');
        
        currentFocusTime = parseInt(clickedBtn.dataset.foco);
        currentPauseTime = parseInt(clickedBtn.dataset.pausa);
        
        updateTimerDisplay(currentFocusTime * 60);
        statusLabel.textContent = "READY TO FOCUS";
    });
});

function updateTimerDisplay(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 🌐 1. Busca os dados no Backend (Python/FastAPI) via GET
async function fetchHistory() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Histórico carregado do Backend Python:", data.history);
        // Desafio futuro: Mostrar essa lista de histórico na tela!
    } catch(e) {
        console.error("Backend Python indisponível. Lembre-se de rodar: python3 run_api.py", e);
    }
}

// 🌐 2. Envia os dados para o Backend (Python/FastAPI) via POST
async function saveTaskToBackend(taskName) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_name: taskName })
        });
        console.log(`Tarefa '${taskName}' enviada e salva com sucesso no Backend!`);
        fetchHistory(); // Atualiza o console com a nova lista
    } catch(e) {
        console.error("Falha ao salvar no backend Python", e);
    }
}

startBtn.addEventListener('click', () => {
    if (timerInterval) {
        // Stop timer logic (Cancel session)
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.textContent = "Start Session";
        startBtn.classList.remove('from-red-500', 'to-orange-500');
        startBtn.classList.add('from-indigo-500', 'to-fuchsia-500');
        statusLabel.textContent = "SESSION CANCELLED";
        updateTimerDisplay(currentFocusTime * 60);
        return;
    }

    currentTask = taskInput.value.trim();
    if(!currentTask) {
        alert("Please enter a task first!");
        return;
    }
    
    // Start session
    isFocusing = true;
    secondsRemaining = currentFocusTime * 60;
    
    startBtn.textContent = "Cancel Session";
    startBtn.classList.remove('from-indigo-500', 'to-fuchsia-500');
    startBtn.classList.add('from-red-500', 'to-orange-500');
    
    statusLabel.textContent = "FOCUSING ON: " + currentTask.toUpperCase();
    statusLabel.classList.add('text-indigo-400');
    statusLabel.classList.remove('text-slate-400');

    // Motor do relógio no Frontend
    timerInterval = setInterval(() => {
        secondsRemaining--;
        updateTimerDisplay(secondsRemaining);
        
        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            if (isFocusing) {
                // Focus acabou! Salva a tarefa conectando com a API Python
                saveTaskToBackend(currentTask);
                alert("Foco Completo! A sua tarefa foi salva no Backend. Hora da pausa!");
                
                // Reseta a interface
                startBtn.textContent = "Start Session";
                startBtn.classList.remove('from-red-500', 'to-orange-500');
                startBtn.classList.add('from-indigo-500', 'to-fuchsia-500');
                statusLabel.textContent = "READY TO FOCUS";
                statusLabel.classList.remove('text-indigo-400');
                statusLabel.classList.add('text-slate-400');
                updateTimerDisplay(currentFocusTime * 60);
                taskInput.value = "";
            }
        }
    }, 1000);
});

// Carrega o histórico ao abrir a página
fetchHistory();

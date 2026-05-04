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

// A URL da nossa API Python (FastAPI) rodando no Render
const API_URL = "https://toma-api.onrender.com/tasks";

// Change Mode Logic
modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (timerInterval) return; // Prevent changing mode while running
        
        // Reset styles for all
        modeBtns.forEach(b => {
            b.classList.remove('active', 'bg-toma-elevated', 'text-toma-primary', 'border-toma-border');
            b.classList.add('bg-transparent', 'text-toma-muted', 'border-transparent');
        });
        
        // Add active style to clicked
        const clickedBtn = e.target;
        clickedBtn.classList.remove('bg-transparent', 'text-toma-muted', 'border-transparent');
        clickedBtn.classList.add('active', 'bg-toma-elevated', 'text-toma-primary', 'border-toma-border');
        
        currentFocusTime = parseInt(clickedBtn.dataset.foco);
        currentPauseTime = parseInt(clickedBtn.dataset.pausa);
        
        updateTimerDisplay(currentFocusTime * 60);
        statusLabel.textContent = "Ready.";
    });
});

function updateTimerDisplay(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const historyList = document.getElementById('history-list');

async function fetchHistory() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        historyList.innerHTML = ''; // Limpa a lista
        
        if (!data.history || data.history.length === 0) {
            historyList.innerHTML = '<li class="text-[13px] text-toma-muted">No sessions recorded yet.</li>';
            return;
        }

        // Renderiza as tarefas (da mais recente para a mais antiga)
        data.history.reverse().forEach(task => {
            const li = document.createElement('li');
            li.className = 'text-[13px] text-toma-primary bg-toma-elevated px-3 py-2 rounded-[4px] border-hairline border-toma-border flex items-center before:content-[""] before:w-1.5 before:h-1.5 before:bg-toma-brand before:rounded-full before:mr-2';
            li.textContent = task;
            historyList.appendChild(li);
        });
        
    } catch(e) {
        console.error("Backend offline.", e);
        historyList.innerHTML = '<li class="text-[13px] text-toma-brand">Failed to load history.</li>';
    }
}

async function saveTaskToBackend(taskName) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_name: taskName })
        });
        console.log(`Task saved: ${taskName}`);
        fetchHistory(); 
    } catch(e) {
        console.error("Failed to save task.", e);
    }
}

function setButtonToStart() {
    startBtn.textContent = "Start session";
    startBtn.classList.remove('bg-toma-elevated', 'text-toma-primary', 'border-hairline', 'border-toma-border');
    startBtn.classList.add('bg-toma-brand', 'text-toma-bg', 'hover:bg-toma-accent');
}

function setButtonToStop() {
    startBtn.textContent = "Stop session";
    startBtn.classList.remove('bg-toma-brand', 'text-toma-bg', 'hover:bg-toma-accent');
    startBtn.classList.add('bg-toma-elevated', 'text-toma-primary', 'border-hairline', 'border-toma-border');
}

startBtn.addEventListener('click', () => {
    if (timerInterval) {
        // Stop timer logic
        clearInterval(timerInterval);
        timerInterval = null;
        setButtonToStart();
        statusLabel.textContent = "Session cancelled.";
        statusLabel.classList.remove('text-toma-accent');
        statusLabel.classList.add('text-toma-muted');
        updateTimerDisplay(currentFocusTime * 60);
        return;
    }

    currentTask = taskInput.value.trim();
    if(!currentTask) {
        statusLabel.textContent = "Input required. Enter a task.";
        return;
    }
    
    // Start session
    isFocusing = true;
    secondsRemaining = currentFocusTime * 60;
    
    setButtonToStop();
    
    statusLabel.textContent = "Focusing: " + currentTask;
    statusLabel.classList.remove('text-toma-muted');
    statusLabel.classList.add('text-toma-accent');

    // Engine
    timerInterval = setInterval(() => {
        secondsRemaining--;
        updateTimerDisplay(secondsRemaining);
        
        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            if (isFocusing) {
                saveTaskToBackend(currentTask);
                statusLabel.textContent = "Session complete. Data saved.";
                setButtonToStart();
                statusLabel.classList.remove('text-toma-accent');
                statusLabel.classList.add('text-toma-muted');
                updateTimerDisplay(currentFocusTime * 60);
                taskInput.value = "";
            }
        }
    }, 1000);
});

fetchHistory();

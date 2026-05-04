const timerDisplay = document.getElementById('timer-display');
const statusLabel = document.getElementById('status-label');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const taskInput = document.getElementById('task-input');
const cyclesInput = document.getElementById('cycles-input');
const modeBtns = document.querySelectorAll('.mode-btn');

const customSettings = document.getElementById('custom-settings');
const customFocusInput = document.getElementById('custom-focus-input');
const customBreakInput = document.getElementById('custom-break-input');

let currentFocusTime = 25;
let currentPauseTime = 5;
let timerInterval = null;
let secondsRemaining = 0;
let currentState = 'IDLE'; // IDLE, FOCUSING, BREAKING
let currentTask = "";
let totalCycles = 1;
let currentCycle = 1;

// A URL da nossa API Python (FastAPI) rodando no Render
const API_URL = "https://toma-api.onrender.com/tasks";

// Change Mode Logic
modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (currentState !== 'IDLE') return; // Prevent changing mode while active
        
        // Reset styles for all
        modeBtns.forEach(b => {
            b.classList.remove('active', 'bg-toma-elevated', 'text-toma-primary', 'border-toma-border');
            b.classList.add('bg-transparent', 'text-toma-muted', 'border-transparent');
        });
        
        // Add active style to clicked
        const clickedBtn = e.target;
        clickedBtn.classList.remove('bg-transparent', 'text-toma-muted', 'border-transparent');
        clickedBtn.classList.add('active', 'bg-toma-elevated', 'text-toma-primary', 'border-toma-border');
        
        const foco = clickedBtn.dataset.foco;
        if (foco === 'custom') {
            customSettings.classList.remove('hidden');
            currentFocusTime = parseInt(customFocusInput.value) || 25;
            currentPauseTime = parseInt(customBreakInput.value) || 5;
        } else {
            customSettings.classList.add('hidden');
            currentFocusTime = parseInt(foco);
            currentPauseTime = parseInt(clickedBtn.dataset.pausa);
        }
        
        updateTimerDisplay(currentFocusTime * 60);
        statusLabel.textContent = "Ready.";
        statusLabel.className = "text-[12px] text-toma-muted mt-2";
    });
});

// Update custom inputs live
[customFocusInput, customBreakInput].forEach(input => {
    input.addEventListener('input', () => {
        if (currentState !== 'IDLE') return;
        currentFocusTime = parseInt(customFocusInput.value) || 25;
        currentPauseTime = parseInt(customBreakInput.value) || 5;
        updateTimerDisplay(currentFocusTime * 60);
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

async function saveTaskToBackend(taskName, cycles) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_name: taskName, cycles: cycles })
        });
        console.log(`Task saved: ${taskName} with ${cycles} cycles`);
        fetchHistory(); 
    } catch(e) {
        console.error("Failed to save task.", e);
    }
}

function setUIActive() {
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    stopBtn.classList.remove('hidden');
    pauseBtn.textContent = "Pause";
    
    taskInput.disabled = true;
    cyclesInput.disabled = true;
    taskInput.classList.add('opacity-50');
    cyclesInput.classList.add('opacity-50');
    modeBtns.forEach(b => b.classList.add('opacity-50', 'pointer-events-none'));
}

function setUIIdle() {
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    stopBtn.classList.add('hidden');
    
    taskInput.disabled = false;
    cyclesInput.disabled = false;
    taskInput.classList.remove('opacity-50');
    cyclesInput.classList.remove('opacity-50');
    modeBtns.forEach(b => b.classList.remove('opacity-50', 'pointer-events-none'));
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondsRemaining--;
        updateTimerDisplay(secondsRemaining);
        
        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            
            if (currentState === 'FOCUSING') {
                if (currentCycle < totalCycles) {
                    // Go to Break
                    currentState = 'BREAKING';
                    secondsRemaining = currentPauseTime * 60;
                    statusLabel.textContent = `Break (${currentCycle}/${totalCycles}). Relax.`;
                    statusLabel.className = "text-[12px] text-toma-brand mt-2";
                    updateTimerDisplay(secondsRemaining);
                    startTimer(); // auto-start break
                } else {
                    // Session completely done
                    currentState = 'IDLE';
                    saveTaskToBackend(currentTask, totalCycles);
                    statusLabel.textContent = "Session complete. Data saved.";
                    statusLabel.className = "text-[12px] text-toma-muted mt-2";
                    setUIIdle();
                    updateTimerDisplay(currentFocusTime * 60);
                    taskInput.value = "";
                }
            } else if (currentState === 'BREAKING') {
                // Go to next Focus
                currentCycle++;
                currentState = 'FOCUSING';
                secondsRemaining = currentFocusTime * 60;
                statusLabel.textContent = `Focusing: ${currentTask} (${currentCycle}/${totalCycles})`;
                statusLabel.className = "text-[12px] text-toma-accent mt-2";
                updateTimerDisplay(secondsRemaining);
                startTimer(); // auto-start next focus
            }
        }
    }, 1000);
}

startBtn.addEventListener('click', () => {
    currentTask = taskInput.value.trim();
    if(!currentTask) {
        statusLabel.textContent = "Input required. Enter a task.";
        return;
    }
    
    totalCycles = parseInt(cyclesInput.value) || 1;
    currentCycle = 1;
    
    currentState = 'FOCUSING';
    secondsRemaining = currentFocusTime * 60;
    
    setUIActive();
    
    statusLabel.textContent = `Focusing: ${currentTask} (${currentCycle}/${totalCycles})`;
    statusLabel.className = "text-[12px] text-toma-accent mt-2";
    
    startTimer();
});

pauseBtn.addEventListener('click', () => {
    if (timerInterval) {
        // Pause
        clearInterval(timerInterval);
        timerInterval = null;
        pauseBtn.textContent = "Resume";
        statusLabel.textContent += " (Paused)";
    } else {
        // Resume
        startTimer();
        pauseBtn.textContent = "Pause";
        statusLabel.textContent = statusLabel.textContent.replace(" (Paused)", "");
    }
});

stopBtn.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    currentState = 'IDLE';
    setUIIdle();
    statusLabel.textContent = "Session cancelled.";
    statusLabel.className = "text-[12px] text-toma-muted mt-2";
    updateTimerDisplay(currentFocusTime * 60);
});

fetchHistory();

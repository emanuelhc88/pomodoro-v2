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

const API_URL = "http://localhost:8000/tasks";

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

async function fetchHistory() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("History loaded:", data.history);
    } catch(e) {
        console.error("Backend offline. Run: python3 run_api.py", e);
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

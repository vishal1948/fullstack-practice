// Define the function to play audio once
function playAudio() {
    var audio = new Audio('borrowed_tim.mp3');
    
    audio.addEventListener('error', () => {
        console.error('Failed to load audio file');
    });
    
    audio.play().catch(error => {
        console.error('Audio playback failed:', error);
    });
}

// Play audio once after 10 seconds (10000 milliseconds)
const timeoutId = setTimeout(playAudio, 3600000);

// To cancel before it plays: clearTimeout(timeoutId);
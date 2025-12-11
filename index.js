const siteWrapper = document.getElementById('site-wrapper');
const headlineText = document.getElementById('headline-text');
const soundReminder = document.getElementById('sound-reminder');
const pageContent = document.getElementById('page-content');
const phone = document.getElementById('phone');
const phoneContainer = document.getElementById('phone-container');
const phoneSubtext = document.getElementById('phone-subtext');
const ringtoneAudio = document.getElementById('ringtone-audio');
const kaiAudio = document.getElementById('kai-audio');
const audioVisualizer = document.getElementById('audio-visualizer');
const unlockInputLabel = document.getElementById('unlock-input-label');
const unlockInput = document.getElementById('unlock-input');
const clueAreaContainer = document.getElementById('clue-area-container');
const navButtons = document.querySelectorAll('.clue-nav-button');
const clueContainer = document.getElementById('clues');
const allClues = clueContainer.querySelectorAll('.clue');

let introIsDone = false;
let audioEnded = true;
unlockInput.value = '';

document.addEventListener('click', (event) => {
    if(!introIsDone){
        soundReminder.classList.add('intro-done');
        siteWrapper.classList.remove('intro-done');
        siteWrapper.classList.add('intro-done');
        headlineText.style.fontSize = '1.2rem';
        introIsDone = true;

        setTimeout(startPhoneCall, 2000);
    }
});

function startPhoneCall(){
    soundReminder.hidden = true;
    phone.classList.add('intro-done');
    pageContent.style.display = 'flex';
    ringtoneAudio.play();
}

phoneContainer.addEventListener('click', (event) => {
    if(!audioEnded) return; 
    audioEnded = false
    phone.style.animationPlayState = 'paused';
    phone.style.transform = 'rotate(0deg)';
    ringtoneAudio.pause();
    kaiAudio.play();
    audioVisualizer.style.display = 'flex';
    phoneSubtext.hidden = true;
});

kaiAudio.addEventListener('ended', (event) => {
    audioEnded = true;
    audioVisualizer.style.display = 'none';
    phoneSubtext.innerText = "Nachricht erneut abspielen?";
    phoneSubtext.hidden = false;
    unlockInputLabel.hidden = false;
    unlockInput.hidden = false;
});

unlockInput.addEventListener('input', (event) => {
    const inputHash = hashCode(unlockInput.value.trim().toLowerCase());
    if(inputHash === 676886464){
        phone.style.display = 'none';
        phoneContainer.style.display = 'none';
        phoneSubtext.hidden = true;
        unlockInputLabel.hidden = true;
        unlockInput.hidden = true;
        clueAreaContainer.hidden = false;
    }
});

const NUMBER_OF_BARS = 20; 

for (let i = 0; i < NUMBER_OF_BARS; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    audioVisualizer.appendChild(bar);
}

const bars = document.querySelectorAll('.bar');

function updateVisualizer() {
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 40) + 10; 
        
        bar.style.height = randomHeight + 'px';
    });
}

setInterval(updateVisualizer, 80); 

updateVisualizer();

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}

navButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        navButtons.forEach(btn => {
            if(btn === button){
                btn.classList.add('active');
            } else {     
                btn.classList.remove('active');
            }
        });
        const targetClueId = button.getAttribute('data-clue');
        allClues.forEach(clue => {
            if(clue.id === targetClueId){
                console.log('showing clue:', targetClueId);
                clue.classList.remove('hidden');
            } else {
                clue.classList.add('hidden');
            }
        });
    });
});
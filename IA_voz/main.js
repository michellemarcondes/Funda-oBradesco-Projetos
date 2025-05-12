// main.js
// Configuração do reconhecimento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'pt-BR';

// Elementos da DOM
const textbox = document.getElementById("textbox");
const cameraDiv = document.getElementById("camera");
const resultDiv = document.getElementById("result"); // Corrigido para matchar seu HTML

// Configuração inicial da webcam
Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90,
    dest_width: 320,
    dest_height: 240
});

// Função para iniciar reconhecimento
function start() {
    textbox.value = ""; // Alterado para .value pois é um textarea
    recognition.start();
    Webcam.attach('#camera'); // Anexa a webcam imediatamente ao iniciar
}

// Evento de resultado do reconhecimento
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    textbox.value = transcript; // Alterado para .value
    
    if(transcript.includes("tire minha selfie")) {
        speak();
    }
}

// Função de conversão texto para fala
function speak() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Tirando sua selfie em 5 segundos");
    synth.speak(utterance);

    setTimeout(() => {
        takeSelfie();
    }, 5000);
}

// Função para capturar selfie
function takeSelfie() {
    Webcam.snap(data_uri => {
        const img = document.createElement("img");
        img.src = data_uri;
        img.classList.add('selfie-image');
        resultDiv.appendChild(img); // Usando o container correto do seu HTML
    });
}

// Inicialização da webcam ao carregar a página
window.addEventListener('load', () => {
    Webcam.attach('#camera');
});
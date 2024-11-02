// Falling Potato Animation
const canvas = document.getElementById('falling-potatoes');
const ctx = canvas.getContext('2d');
let potatoes = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createPotato() {
    return {
        x: Math.random() * canvas.width,
        y: -50,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        size: Math.random() * 30 + 20
    };
}

function drawPotato(potato) {
    ctx.save();
    ctx.translate(potato.x, potato.y);
    ctx.rotate(potato.rotation * Math.PI / 180);
    ctx.drawImage(potatoImage, -potato.size / 2, -potato.size / 2, potato.size, potato.size);
    ctx.restore();
}

let potatoImage = new Image();
potatoImage.src = 'Users/richardperalta/Downloads/potatoe.png'; // Add path to realistic potato image

function animatePotatoes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    potatoes.forEach(potato => {
        potato.y += potato.speed;
        potato.rotation += 1;
        if (potato.y > canvas.height) potato.y = -50;
        drawPotato(potato);
    });
    requestAnimationFrame(animatePotatoes);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
for (let i = 0; i < 50; i++) potatoes.push(createPotato());
potatoImage.onload = animatePotatoes;

// Command Handling
const outputElement = document.getElementById('output');
const commandInput = document.getElementById('command-input');

const commands = {
    hello: ["Greetings, Earth Potato!", "Cosmic tuber says hello!", "Spacey salutations!"],
    galaxy: ["Stars are twinkling just for you.", "The universe is vast, and so are the potatoes.", "Potatoes in space are boundless!"]
    // Add more commands as needed
};

commandInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const command = commandInput.value.trim().toLowerCase();
        commandInput.value = '';
        if (commands[command]) {
            const response = commands[command][Math.floor(Math.random() * commands[command].length)];
            outputElement.innerHTML += `<p>${response}</p>`;
        } else {
            outputElement.innerHTML += `<p>Unknown cosmic command: ${command}</p>`;
        }
        outputElement.scrollTop = outputElement.scrollHeight;
    }
});

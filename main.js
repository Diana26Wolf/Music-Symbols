x = 0;
y = 0;
music = ""
to_number = ""
screen_width = 0
screen_height = 0
draw_music = ""
speak_data = ""

function preload() {
    music = loadImage("Music.png")
}
var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "Speak Now"
    recognition.start()
}

recognition.onresult = function (event) {

    console.log(event);

    content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "I heard you say: " + content;

    to_number = Number(content)
    console.log(to_number)
    if (Number.isInteger(to_number)) {
        document.getElementById("status").innerHTML = "The music symbol is being presented to you";
        draw_music = "set";
    } else {
        document.getElementById("status").innerHTML = "I did not recognize a number";
    }
}

function setup() {
    screen_width = window.innerWidth
    screen_height = window.innerHeight
    canvas = createCanvas(screen_width - 550, screen_height - 150)
}

function draw() {
    if (draw_music == "set") {
        for (var i = 1; i <= to_number; i++) {
            x = Math.floor(Math.random() * 700);
            y = Math.floor(Math.random() * 400);
            image(music, x, y, 50, 50)
        }
        document.getElementById("status").innerHTML = to_number + " Music Symbols have been presented";
        speak_data = to_number + " Music Symbols have been presented"
        speak()
        draw_music = ""
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}
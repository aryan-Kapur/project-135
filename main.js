let synth = new SpeechSynthesisUtterance("The objects are the same");
let synth2 = new SpeechSynthesisUtterance("The objects not the same");
let inputObject = document.getElementById("input1");
let previousResult = "";
let objectResult = document.getElementById("objectresult");
let form = document.getElementById("form1");


function setup() {
    canvas = createCanvas(300, 300);
    canvas.position(500, 600);
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}


function start() {
    document.querySelector('.status').innerHTML += "Finding results...";
}

function modelLoaded() {
    console.log("Model has Loaded!");
}

function draw() {
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
}

function submit() {
    document.getElementById("form1").innerHTML = inputObject.value;
}

function gotResult(error, result) {
    if(error) {
        console.error(error);
    }
    else if((result[0].confidence > 0.5) && (previousResult != result[0].label)) {
        console.log(result[0].label);
        previousResult = result[0].label;
        objectResult.innerHTML = result[0].label;
        if(form.innerHTML == objectResult.innerHTML) {
            console.log("The objects are the same");
            speechSynthesis.speak(synth);
        }
    }
}

// function gotResult(error, results) {
//     if(error) {
//         console.error(error);
//     }
    
// else {
//    if ((results[0].confidence > 0.5) && (previousResult != results[0].label)) {    
//         console.log(results);
//         previousResult = results[0].label;
//         document.getElementById("objectresult").innerHTML = results[0].label;    
//         }
//     if (results[0].label == inputObject.value) {
//         console.log("helloworld");
//         speechSynthesis.speak(synth);
//     }
//     if (results[0].label != inputObject.value) {
//         console.log("byeworld");
//         speechSynthesis.speak(synth2);
//     }
//     }
// }
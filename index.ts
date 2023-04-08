var motto: any = []
var state: any = false;
var mottoInterval: any;

fetch('https://myworldbox.github.io/resource/json/project/myworldbox.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)

    })

fetch('https://myworldbox.github.io/resource/json/motto.json')
    .then(res => res.json())
    .then(data => {

        data.chinese.map((datium: any, i: any) => {
            motto[i] = datium.text
        })

    })

var random_motto = () => {
    document.getElementsByClassName("motto")[0].innerHTML = motto[Math.floor(Math.random() * (motto.length - 1)) + 0]
}

setInterval(() => {
    state = !state
    if (state == false) {
        clearInterval(mottoInterval)
        document.getElementsByClassName("motto")[0].innerHTML = motto[Math.floor(Math.random() * (motto.length - 1)) + 0]
    } else {
        mottoInterval = setInterval(random_motto, Math.floor(Math.random() * 40) + 20)
    }
}, Math.floor(Math.random() * 2000) + 1000);


/*
(async () => {

    var config = await import(`./ config.json`);

    var element = document.getElementById("company")
    if (element) {
        element.id = element.innerText = config.project
    }
})()
*/
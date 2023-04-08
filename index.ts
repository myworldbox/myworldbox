var state: any = false;

var motto_timer: any;
var motto: any = []

var template = ["project", "bio"]

fetch('https://myworldbox.github.io/resource/json/project/myworldbox.json')
    .then(res => res.json())
    .then(data => {

        template.map((value: any) => {

            var stack = document.querySelector("[" + value + "]")!

            data[value].map((text: any, i: any) => {
                stack.innerHTML = "<a class='border-1 padding-30 color-12 font-size-20 background-6' href='" + text.link + "'>" + i + "</a>";
            })

            var card = document.querySelector("[" + value + "]")!

            console.log(card)
        })
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
        clearInterval(motto_timer)
        document.getElementsByClassName("motto")[0].innerHTML = motto[Math.floor(Math.random() * (motto.length - 1)) + 0]
    } else {
        motto_timer = setInterval(random_motto, Math.floor(Math.random() * 40) + 20)
    }
}, Math.floor(Math.random() * 2000) + 1000);

import * as config from "./config.json";

console.log("config");
console.log(config);

(async () => {

    var element = document.getElementById("company")
    if (element) {
        element.id = element.innerText = config.project
    }
})()

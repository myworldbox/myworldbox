import { description } from './../github1s/vscode-web-github1s/lib/vscode/src/vs/editor/browser/controller/coreCommands';
var users = []
var motto : any = []
var contentArr : any = [[], [], []]

var filePath: any, template: any, container: any, operator: any, mottoInterval: any

var domain = "https://myworldbox.github.io"
var jsonFile = 3
var state = true

var searchInput = document.querySelector("[search-1]")

var inject = (url: any) => {
    var element = document.getElementById("code")
    if (element) {
        var qrcodes = new QRCode({
            msg: url, dim: 256, pad: 4, mtx: -1, ecl: "H", ecb: 1, pal: ["#037", "#f2f4f8"], vrb: 0
        })
        element.append(qrcodes);
        element.id = 'qrCode'
    }
}

var fetchJson = (filePath: any, template: any, container: any, operator: any) => {

    var counter = 0
    var card: any
    fetch(filePath)
        .then(res => res.json())
        .then(data => {
            var temp = data.map((user: any) => {
                if (document.querySelector(template)) {
                    card = document.querySelector(template).content.cloneNode(true).children[0]
                    for (var j = 0; card.querySelector("[content" + j + "-" + operator + "]"); j++) {
                        contentArr[j][operator] = card.querySelector("[content" + j + "-" + operator + "]")
                    }
                }

                switch (operator) {

                    case 0: // my project

                        contentArr[0][operator].textContent = user.content0
                        contentArr[1][operator].innerHTML += "<a class='border-1 padding-30 color-12 font-size-20 background-6' href='" + user.link + "'>" + counter + "</a>"
                        contentArr[2][operator].textContent = user.description

                        break

                    case 1: // my contact

                        contentArr[0][operator].innerHTML += "<div class='div-container'><div class='padding-10 border-13' style='background:white'><div class='link' style='background: url(" + user.content1 + ")'><a href='" + user.content2 + "'></a></div></div></div>"
                        contentArr[1][operator].textContent = user.content0
                        contentArr[2][operator].innerHTML = 'inject("' + user.link + '")'

                        break

                    case 2: // motto

                        motto[counter] = (user.content0)

                        break
                }

                counter = counter + 1

                if (document.querySelector(container)) {
                    document.querySelector(container).append(card)
                    return { content0: user.content0, content1: user.content1, content2: user.content2, element: card }
                }
            })
            if (operator == 1) users = temp
        })
}

if (searchInput) {
    searchInput.addEventListener("input", e => {
    const value = (<HTMLTextAreaElement>e.target).value.toLowerCase()
    users.forEach(user => {
        const isVisible = (user.content0.toLowerCase().includes(value) || user.content2.toLowerCase().includes(value))
        user.element.classList.toggle("hide", !isVisible)
    })
})
}

var setRandomMotto = () => {
    document.getElementsByClassName("motto")[0].innerHTML = motto[Math.floor(Math.random() * (motto.length - 1)) + 0]
}

var setMotto = () => {
    state = !state
    if (state == false) {
        clearInterval(mottoInterval)
        document.getElementsByClassName("motto")[0].innerHTML = motto[Math.floor(Math.random() * (motto.length - 1)) + 0]
    } else {
        mottoInterval = setInterval(setRandomMotto, Math.floor(Math.random() * 40) + 20)
    }
}

var setCompany = () => {
    var element = document.getElementById("company")
    if (element) {
        element.id = element.innerText = "myworldbox"
        setCompany();
    }
}

fetch('https://myworldbox.github.io/resource/json/project/myworldbox.json').then(res => res.json())
.then(init => {
    console.log(init.personal_url)
    console.log(init.project)
    
})


setInterval(setMotto, Math.floor(Math.random() * 2000) + 1000)

setCompany()

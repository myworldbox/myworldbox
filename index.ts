var users = [];
var motto = [];
var contentArr = [[], [], []];

var filePath: any, template: any, container: any, operator: any;

var card: any;
var html: any;

var jsonFile = 3, jsonContent = 3;

var searchInput = document.querySelector("[search-1]");

function fetchJson(filePath: any, template: any, container: any, operator: any) {

    var counter = 0;
    fetch(filePath)
        .then(res => res.json())
        .then(data => {
            var temp = data.map((user: any) => {
                if (document.querySelector(template)) {
                    card = document.querySelector(template).content.cloneNode(true).children[0];
                    for (var j = 0; j < jsonContent; j++) {
                        if (card.querySelector("[content" + j + "-" + operator + "]")) {
                            contentArr[j][operator] = card.querySelector("[content" + j + "-" + operator + "]");
                        }
                    }
                }

                switch (operator) {

                    case 0:

                        html = "<a class='border-1 padding-1 p3-1 bg-color-6' href='" + user.content1 + "'>" + counter + "</a>";

                        contentArr[0][operator].textContent = user.content0;
                        contentArr[1][operator].innerHTML += html;
                        contentArr[2][operator].textContent = user.content2;

                        break;

                    case 1:

                        contentArr[0][operator].innerHTML += "<div class='div-container'><div class='padding-1 border-4' style='background:white;'><div class='link' style='background: url(" + user.content1 + ");'><a href='" + user.content2 + "'></a></div></div></div>";
                        contentArr[1][operator].textContent = user.content0;

                        break;

                    case 2:

                        motto[counter] = (user.content0);

                        break;
                }

                counter = counter + 1

                if (document.querySelector(container)) {
                    document.querySelector(container).append(card);
                    return { content0: user.content0, content1: user.content1, content2: user.content2, element: card };
                }
            })
            if (operator == 1) users = temp;
        })
}

for (var i = 0; i < jsonFile; i++) {
    fetchJson("./json/VL-" + i + ".json", "[template-" + i + "]", "[container-" + i + "]", i);
}

searchInput.addEventListener("input", e => {
    const value = (<HTMLTextAreaElement>e.target).value.toLowerCase();
    users.forEach(user => {
        const isVisible = (user.content0.toLowerCase().includes(value) || user.content2.toLowerCase().includes(value));
        user.element.classList.toggle("hide", !isVisible);
    })
})
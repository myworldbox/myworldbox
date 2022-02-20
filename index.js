const searchInput = document.querySelector("[data-search]")

let users = []
let motto = []

let filePath, template, container, operator

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible = (user.content0.toLowerCase().includes(value) || user.content2.toLowerCase().includes(value))
    user.element.classList.toggle("hide", !isVisible)
  })
})

function fetchJson(filePath, template, container, operator) {
  let counter = 0
  fetch(filePath)
    .then(res => res.json())
    .then(data => {
      users = data.map(user => {
        let card;
        if (template != "") {
          card = document.querySelector(template).content.cloneNode(true).children[0]
        }
        switch (operator) {

          case 0:
            const header1 = card.querySelector("[data-header-1]")

            const body1 = card.querySelector("[data-body-1]")

            const body2 = card.querySelector("[data-body-2]")

            header1.textContent = user.content0

            let html = "<a class='border-1 padding-1 p3-1 bg-color-6' href='" + user.content1 + "'>" + counter + "</a>"
            body1.innerHTML += html

            body2.textContent = user.content2

            break;

          case 1:

            motto[counter] = (user.content0)
            break;

          case 2:

            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")

            header.innerHTML += "<div class='div-container'><div class='padding-1 border-4' style='background:white;'><div class='link' style='background: url(" + user.content1 + ");'><a href='" + user.content2 + "'></a></div></div></div>"

            body.textContent = user.content0

            break;
        }

        counter = counter + 1

        if (container != "") {
          document.querySelector(container).append(card)
          return { content0: user.content0, content1: user.content1, content2: user.content2, element: card }
        }
      })
    })
}

fetchJson("./json/VL-project.json", "[data-user-template-1]", "[data-user-cards-container-1]", 0)
fetchJson("./json/VL-motto.json", "", "", 1)
fetchJson("./json/VL-link.json", "[data-user-template]", "[data-user-cards-container]", 2)

async function flash() {
  for (var i = 1; i >= 1; i++) {
    document.getElementsByClassName("absolute-style")[0].innerHTML = motto[Math.floor(Math.random() * motto.length) + 0];
    await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 50) + 10));

    if (!(i % 10)) {
      document.getElementsByClassName("absolute-style")[0].innerHTML = motto[Math.floor(Math.random() * motto.length) + 0];
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

window.onload = () => {
  flash();
}
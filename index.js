document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterDiv = document.getElementById("create-monster");
    const backBtn = document.getElementById("back");
    const forwardBtn = document.getElementById("forward");
    let page = 1;
    const limit = 50;

    function fetchMonsters(page) {
        fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsterContainer.innerHTML = "";
                monsters.forEach(monster => renderMonster(monster));
            });
    }

    function renderMonster(monster) {
        const div = document.createElement("div");
        div.innerHTML = `<h2>${monster.name}</h2>
                         <h4>Age: ${monster.age}</h4>
                         <p>${monster.description}</p>`;
        monsterContainer.appendChild(div);
    }

    function createMonsterForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <input id="name" type="text" placeholder="Name" required />
            <input id="age" type="number" placeholder="Age" required />
            <input id="description" type="text" placeholder="Description" required />
            <button type="submit">Create Monster</button>
        `;
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const age = document.getElementById("age").value;
            const description = document.getElementById("description").value;
            createMonster({ name, age, description });
            form.reset();
        });
        createMonsterDiv.appendChild(form);
    }

    function createMonster(monster) {
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(monster)
        })
        .then(response => response.json())
        .then(newMonster => renderMonster(newMonster));
    }

    backBtn.addEventListener("click", () => {
        if (page > 1) {
            page--;
            fetchMonsters(page);
        }
    });

    forwardBtn.addEventListener("click", () => {
        page++;
        fetchMonsters(page);
    });

    createMonsterForm();
    fetchMonsters(page);
});

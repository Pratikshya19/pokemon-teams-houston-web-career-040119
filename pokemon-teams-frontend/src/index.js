const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetch(TRAINERS_URL)
.then(res => res.json())
.then((data) => {
  data.forEach( function(elem) {
    let cardDiv = document.createElement("div");
    document.querySelector("main").append(cardDiv);
    cardDiv.className = "card";
    cardDiv.setAttribute("data-id", elem.id);
    let nameP = document.createElement("p");
    cardDiv.append(nameP);
    nameP.innerText = elem.name;
    let addButton = document.createElement("button");
    addButton.setAttribute("data-trainer-id", elem.id);
addButton.innerText = "Add Pokemon";

    addButton.addEventListener("click", function(e) {
      let id = parseInt(e.target.getAttribute("data-trainer-id"));
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "trainer_id": id
        })
      }).then( (res) => res.json() )
      .then ( (pokemon) => {
        if(!pokemon.error) {
          let ul = document.querySelector(`ul#trainer-${id}`);

          let li = document.createElement("li");
          ul.append(li);
          let button = document.createElement('button');
          li.innerText = `${pokemon.nickname} (${pokemon.species}) `;
          li.append(button);
          button.className = "release";
          button.setAttribute('data-pokemon-id', pokemon.id);
        button.innerText = "release";
        
        
        button.addEventListener("click", function(e){
          let id = e.target.getAttribute("data-pokemon-id");
          let r = fetch(`${POKEMONS_URL}/${id}`, {
            method: "DELETE" 
          }).then( console.log );
          e.target.parentElement.style.display = "none";
        });
      }


      });
    });


cardDiv.append(addButton);
let ul = document.createElement("ul");

ul.id = `trainer-${elem.id}`;

cardDiv.append(ul);
elem.pokemons.forEach(pokemon => {
  let li = document.createElement("li");
  ul.append(li);
  let button = document.createElement('button');
  li.innerText = `${pokemon.nickname} (${pokemon.species}) `;
  li.append(button);
  button.className = "release";
  button.setAttribute('data-pokemon-id', pokemon.id);
button.innerText = "release";


button.addEventListener("click", function(e){
  let id = e.target.getAttribute("data-pokemon-id");
  let r = fetch(`${POKEMONS_URL}/${id}`, {
    method: "DELETE" 
  }).then( console.log );
  e.target.parentElement.style.display = "none";
});

});





  });
});




// <div class="card" data-id="1"><p>Prince</p>
//   <button data-trainer-id="1">Add Pokemon</button>
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
// </div>
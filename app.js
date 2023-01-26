let response;
let jsonData; 
let response2;
let jsonData2;


const fetchPokemon = async () => {

    document.querySelector("#feedback").textContent = ""
    const image = document.querySelector("#pokemon-image");
    // console.log("pokemon");
    const dexId = Math.floor(Math.random() * 905) + 1;
    

    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexId}`);
    jsonData = await response.json();
    // console.log(jsonData);
    image.src = jsonData.sprites.other["official-artwork"]["front_default"];
    image.classList.add("notFound");

    response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexId}`)
    jsonData2 = await response2.json();

    console.log(jsonData2)

}

const button = document.querySelector("#generate");

button.addEventListener("click", fetchPokemon);

const guessForm = document.querySelector("#guess");

const handleGuess = (event) => {
    event.preventDefault();

    const input = event.target.guess.value.toLowerCase();
    
    if (input !== "") {
        if (input === jsonData2.name){
            console.log("correct");
            document.querySelector("#pokemon-image").classList.remove("notFound");
            document.querySelector("#feedback").textContent = `That's right!`
        }
        else {
            document.querySelector("#feedback").textContent = "Wrong - try again"
        }
    }
    else if (input === "" && document.querySelector("#feedback").textContent === "That's right!") {
        fetchPokemon();
    }

    event.target.guess.value = null;
    console.log(jsonData);
}

guessForm.addEventListener('submit', handleGuess);

fetchPokemon();
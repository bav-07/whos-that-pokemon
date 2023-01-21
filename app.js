let response;
let jsonData; 


const fetchPokemon = async () => {

    document.querySelector("#feedback").textContent = ""

    // console.log("pokemon");
    const dexId = Math.floor(Math.random() * 905) + 1;

    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexId}`);
    jsonData = await response.json();
    // console.log(jsonData);
    const image = document.querySelector("#pokemon-image");
    image.src = await jsonData.sprites.other["official-artwork"]["front_default"];
    image.classList.add("notFound");

}

const button = document.querySelector("#generate");

button.addEventListener("click", fetchPokemon);

const guessForm = document.querySelector("#guess");

const handleGuess = (event) => {
    event.preventDefault();

    const input = event.target.guess.value.toLowerCase();
    
    if (input !== "") {
        if (input === jsonData.name){
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
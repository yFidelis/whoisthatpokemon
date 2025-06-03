const pokemonImage = document.getElementById("pokemon-image");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const attemptsEl = document.getElementById("attempts");
const feedbackEl = document.getElementById("feedback");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

const pokemons = [
  { name: "pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { name: "bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
  { name: "charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
  { name: "squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
  { name: "meowth", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png" },
];

let currentPokemon = {};
let usedIndexes = [];
let score = 0;
let attempts = 0;

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function escolherNovoPokemon() {
  feedbackEl.textContent = "";
  if (usedIndexes.length === pokemons.length) {
    alert("Você já adivinhou todos os Pokémons! Reiniciando...");
    usedIndexes = [];
    score = 0;
    attempts = 0;
    atualizarPontuacao();
  }

  let index;
  do {
    index = Math.floor(Math.random() * pokemons.length);
  } while (usedIndexes.includes(index));

  usedIndexes.push(index);
  currentPokemon = pokemons[index];
  mostrarPokemon(currentPokemon);
}

function mostrarPokemon(pokemon) {
  pokemonImage.src = pokemon.image;
  pokemonImage.classList.remove("revealed");
  guessInput.value = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  nextBtn.disabled = true;
}

function verificarPalpite() {
  const palpite = normalizarTexto(guessInput.value);
  const resposta = normalizarTexto(currentPokemon.name);
  attempts++;
  atualizarPontuacao();

  if (palpite === resposta) {
    score++;
    feedbackEl.textContent = "✅ Acertou!";
    feedbackEl.style.color = "green";
    correctSound.play();
    pokemonImage.classList.add("revealed");
    guessInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = false;
  } else {
    feedbackEl.textContent = "❌ Errou! Tente novamente.";
    feedbackEl.style.color = "red";
    wrongSound.play();
  }

  atualizarPontuacao();
}

function atualizarPontuacao() {
  scoreEl.textContent = `Pontos: ${score}`;
  attemptsEl.textContent = `Tentativas: ${attempts}`;
}

submitBtn.addEventListener("click", verificarPalpite);
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") verificarPalpite();
});
nextBtn.addEventListener("click", escolherNovoPokemon);

// Inicializar
escolherNovoPokemon();

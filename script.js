const apiKey = "cefa28a1"; 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");


searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }


  resultsContainer.innerHTML = "<p>Loading...</p>";


  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();


    if (data.Response === "False") {
      resultsContainer.innerHTML = `<p>${data.Error}</p>`;
      return;
    }


    resultsContainer.innerHTML = "";


    for (const movie of data.Search) {
      const details = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
      const movieData = await details.json();


      const card = document.createElement("div");
      card.className = "card";


      card.innerHTML = `
        <img src="${movieData.Poster !== "N/A" ? movieData.Poster : "https://via.placeholder.com/300x445?text=No+Image"}" alt="${movieData.Title} poster" />
        <div class="card-content">
          <h2>${movieData.Title} (${movieData.Year})</h2>
          <p><strong>Genre:</strong> ${movieData.Genre}</p>
          <p><strong>Director:</strong> ${movieData.Director}</p>
          <p><strong>Actors:</strong> ${movieData.Actors}</p>
          <p><strong>Plot:</strong> ${movieData.Plot}</p>
          <p><strong>IMDB Rating:</strong> ${movieData.imdbRating}</p>
        </div>
      `;
      resultsContainer.appendChild(card);
    }


  } catch (err) {
    resultsContainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    console.error(err);
  }
});

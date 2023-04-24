const apiKey = 'f213df7f733ca1597876cede6a9abd5c'

const global = {
    currentPage: window.location.pathname
}


// fetch data from tmdb API
async function fetchData(url){
    const response = await fetch(`${url}api_key=${apiKey}&language=en-US&page=1`)
    return response.json()
}

//highlight active link
function highlightActiveLink(item){
    const links = document.querySelectorAll('.nav-link')
    links.forEach(item => {
        if (item.getAttribute('href') === global.currentPage) {
            item.classList.add('active')
        }
    })

}

// get popular movies
async function displayPopularMovies(){
    const url = `https://api.themoviedb.org/3/movie/popular?`
    const { results } = await fetchData(url)
    const popular = document.querySelector('#popular-movies')
    console.log(results);
    results.forEach(movie => {
        console.log(movie.popular);
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = 
        `
        <a href="movie-details.html?id=${movie.id}">
        ${movie.poster_path ? 
            `
                <img
                src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                class="card-img-top"
                alt="${movie.original_title}"/>
            `: 
            `
                <img
                src="..images/no-image.jpg"
                class="card-img-top"
                alt="${movie.original_title}"/>

            `
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `

        popular.appendChild(div)

    })
}



//init app
function init(){
    if (global.currentPage === '/' || global.currentPage === '/index.html') {
        console.log('home');
        displayPopularMovies()
    }
    if (global.currentPage === '/shows.html') {
        console.log('shows');
    }
    if(global.currentPage ==='/movie-details.html'){
        console.log('movie detail');
    }
    if(global.currentPage ==='/tv-details.html'){
        console.log('tv detail');
    }
    if(global.currentPage ==='/search.html'){
        console.log('search');
    }
    highlightActiveLink()
}


document.addEventListener('DOMContentLoaded', init)
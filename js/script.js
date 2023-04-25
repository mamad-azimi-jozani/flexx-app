const apiKey = 'f213df7f733ca1597876cede6a9abd5c'

const global = {
    currentPage: window.location.pathname
}


// fetch data from tmdb API
async function fetchData(url){
    showSpinner()
    const response = await fetch(`${url}api_key=${apiKey}&language=en-US&page=1`)
    hideSpinner()
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
    // console.log(results);
    results.forEach(movie => {
        // console.log(movie.popular);
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


// get popular tv series
async function displayPopularShows(){
    const url = `https://api.themoviedb.org/3/tv/popular?`
    
    const { results } = await fetchData(url)
    
    const popular = document.querySelector('#popular-shows')
    console.log(results);
    results.forEach(show => {
        console.log(show.popular);
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = 
        `
        <a href="tv-details.html?id=${show.id}">
        ${show.poster_path ? 
            `
                <img
                src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
                class="card-img-top"
                alt="${show.original_name}"/>
            `: 
            `
                <img
                src="..images/no-image.jpg"
                class="card-img-top"
                alt="${show.original_name}"/>

            `
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.original_title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
        </div>
        `

        popular.appendChild(div)

    })
}


async function dispplayBackgroundImage(type, backgroundPath){
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    overlayDiv.style.backgroundSize = 'cover'
    overlayDiv.style.backgroundPosition = 'center'
    overlayDiv.style.backgroundRepeat = 'no-repeat'
    overlayDiv.style.height = '100vh'
    overlayDiv.style.width = '100vw'
    overlayDiv.style.position = 'absolute'
    overlayDiv.style.top = '0'
    overlayDiv.style.left = '0'
    overlayDiv.style.zIndex = '-1'
    overlayDiv.style.opacity = '0.1'


    if (type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv)

    } else{
        document.querySelector('#show-details').appendChild(overlayDiv)

    }
}




// get movie detail
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1]
    const movie = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}?`)


    // overlay for background img
    dispplayBackgroundImage('movie', movie.backdrop_path)


    const div = document.createElement('div')
    div.innerHTML = 
    `
        <div class="details-top">
        <div>
        <a href="tv-details.html?id=${movie.id}">
        ${movie.poster_path ? 
            `
                <img
                src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                class="card-img-top"
                alt="${movie.original_name}"/>
            `: 
            `
                <img
                src="..images/no-image.jpg"
                class="card-img-top"
                alt="${movie.original_name}"/>

            `
        }
        </div>
        <div>
        <h2>${movie.original_title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
            ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
        <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
        <li><span class="text-secondary">Status:</span> ${movie.budget}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies.map(company => `${company.name}`).join(' ')}</div>
    </div>
    `
    document.querySelector('#movie-details').appendChild(div)

}


// get show detail
async function displayShowDetails(){
    const showId = window.location.search.split('=')[1]
    const show = await fetchData(`https://api.themoviedb.org/3/tv/${showId}?`)
    console.log(show);

    // overlay for background img
    dispplayBackgroundImage('show', show.backdrop_path)


    const div = document.createElement('div')
    div.innerHTML = 
    `
        <div class="details-top">
        <div>
        <a href="tv-details.html?id=${show.id}">
        ${show.poster_path ? 
            `
                <img
                src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"/>
            `: 
            `
                <img
                src="..images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"/>

            `
        }
        </div>
        <div>
        <h2>${show.name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${show.first_air_date}</p>
        <p>
            ${show.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Number of Episode:</span> ${show.number_of_episodes}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${show.production_companies.map(company => `${company.name}`).join(' ')}</div>
    </div>
    `
    document.querySelector('#show-details').appendChild(div)

}



//add spinner
function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')

}



//init app
function init(){
    if (global.currentPage === '/' || global.currentPage === '/index.html') {
        // console.log('home');
        displayPopularMovies()
    }
    if (global.currentPage === '/shows.html') {
        // console.log('shows');
        displayPopularShows()
    }
    if(global.currentPage ==='/movie-details.html'){
        // console.log('movie detail');
        displayMovieDetails()
    }
    if(global.currentPage ==='/tv-details.html'){
        console.log('tv detail');
        displayShowDetails()
    }
    if(global.currentPage ==='/search.html'){
        console.log('search');
    }

    highlightActiveLink()
}


document.addEventListener('DOMContentLoaded', init)
const app = {


   
    init: () =>{
          document.addEventListener('DOMContentLoaded',app.load)
          console.log("Loaded")
    },

    load: () =>{
        app.getData()
    },
    
    getData : ()=>{
         let page = document.body.id

        switch(page){
            case "page-1" :
                app.getPopularMovies()
                app.getMostPopularSeries()
                app.getDiscoverData()
                app.getLatest()
                app.pagination()
               break
            case "page-2" : 

           app.getSelectedMovie()
                break     
         }      
   },
  
   pagination : () =>{
    
    let page = 1


     document.querySelectorAll(".esq").forEach(btn =>{
      btn.addEventListener("click",() =>{
       page = page - 1
      
      if(page < 1)
       {return}
      
        if(btn.dataset.container === "show"){
          app.getMostPopularSeries(page)
        }
        if(btn.dataset.container === "movie"){
          app.getPopularMovies(page)
        }
        if(btn.dataset.container === "discover"){
          app.getDiscoverData(page)
        }
        console.log(page)
      })
    })

    
     document.querySelectorAll(".dir").forEach(btn =>{
      btn.addEventListener("click",() =>{
       page = page + 1
      
      if(page > 10)
       {return}
      
        if(btn.dataset.container === "show"){
          app.getMostPopularSeries(page)
        }
        if(btn.dataset.container === "movie"){
          app.getPopularMovies(page)
        }
        if(btn.dataset.container === "discover"){
          app.getDiscoverData(page)
        }
        console.log(page)
      
      
     
      })
    })

   },

   getLatest : () =>{
    let newUrl = `https://api.themoviedb.org/3/movie/popular?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=1`

    let req = new Request(newUrl,{
      method:"GET",
      mode:"cors"
    })
    fetch(req)
    .then(resp => resp.json())
    .then(app.latest)

   },
   getPopularMovies: (page) =>{
     let newUrl = `https://api.themoviedb.org/3/movie/popular?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=${page}`
     let req = new Request(newUrl,{
        method:"GET",
        mode :"cors"
     })
     fetch(req)
     .then(res => res.json())
     .then(app.displayInfo)
      
   },
   getMostPopularSeries : (page) =>{
        let newUrl = `
        https://api.themoviedb.org/3/tv/popular?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=${page}
        `
        let req = new Request(newUrl,{
            method:"GET",
            mode:"cors"
        })
        fetch(req)
        .then(resp => resp.json())
        .then(app.getSexInfo)
   },

   getSelectedMovie : () =>{
    let newUrl = `https://api.themoviedb.org/3/${localStorage.getItem("type")}/${localStorage.getItem(`id`)}?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US `
    let req = new Request(newUrl,{
        method:"GET",
        mode:"cors"
    })
    console.log(newUrl)
    fetch(req)
    .then(resp => resp.json())
    .then(app.showInfo)
},




   getSexInfo: (post) =>{   
    //SHOWS
     const list_container = document.getElementById("list-show")   
     const ul = document.createElement("ul")
   
     list_container.innerHTML = ""




     console.log(post.results)
     post.results.forEach(element => {
        ul.innerHTML +=`<li data-id="${element.id}" data-type="tv">
        <a href="page-two.html" target="_blank">
        <img src="https://image.tmdb.org/t/p/w400/${element.poster_path}" 
       width="200px" data-el="${element.id}" >
       </a>
         </li>`
        
        
     });
  
     list_container.appendChild(ul)
     const els = document.querySelectorAll("[data-id]")
     els.forEach(el =>{
        el.addEventListener("click",()=>{
         localStorage.setItem(`id`,`${el.dataset.id}`)
         localStorage.setItem(`type`,`${el.dataset.type}`)
         
        })})
     

   },

   displayInfo: (post)=>{


     const list_container = document.getElementById("list-movie")
     list_container.innerHTML = ""
     const ul = document.createElement("ul")
     post.results.forEach(element => {
        ul.innerHTML +=`<li data-id="${element.id}" data-type="movie">
        <a href="page-two.html" target="_blank">
        <img src="https://image.tmdb.org/t/p/w400/${element.poster_path}" 
       width="200px" data-el="${element.id}" >
       </a>
         </li>`    
             });  


     list_container.appendChild(ul)  
     const els = document.querySelectorAll("[data-li]")
     els.forEach(el =>{
        el.addEventListener("click",()=>{
          localStorage.setItem(`id`,`${el.dataset.id}`)
          localStorage.setItem(`type`,`${el.dataset.type}`)
        })})

   },
 
   getDiscoverData : (page) =>{
     
    let newUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=${page}`

    let req = new Request(newUrl,{
      method:"GET",
      mode:"cors"
    })
    fetch(req)
    .then(resp => resp.json())
    .then(app.showDiscoverData)

   },

   showDiscoverData : (movie) =>{
     
    console.log(movie)

     const list_container = document.getElementById("list-discover")   
     const ul = document.createElement("ul")
     list_container.innerHTML = ""




     movie.results.forEach(element => {
        ul.innerHTML +=`<li data-id="${element.id}" data-type="movie">
        <a href="page-two.html" target="_blank">
        <img src="https://image.tmdb.org/t/p/w400/${element.poster_path}" 
       width="200px" data-el="${element.id}" >
       </a>
         </li>`
        
     });
  
     list_container.appendChild(ul)
     const els = document.querySelectorAll("[data-li]")
     els.forEach(el =>{
        el.addEventListener("click",()=>{
          localStorage.setItem(`id`,`${el.dataset.id}`)
          localStorage.setItem(`type`,`${el.dataset.type}`)
        })})

   },


   latest : (movies) =>{
   const poster = document.querySelector(".poster")
   const title = document.querySelector(".title_movie")
   const overview = document.querySelector(".overview_info")
   const background = document.querySelector(".background")
   const release = document.querySelector(".release_date_info")



   let index = 0
   let length = movies.results.length
  


   title.innerHTML = movies.results[index].title
   release.innerHTML = movies.results[index].release_date
   overview.innerHTML = movies.results[index].overview
   poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].poster_path}" >`
   background.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].backdrop_path}" >`





   document.querySelector("#pro").addEventListener("click",()=>{
  

    index = index + 1
    if(index > length){
      index = 0
    }
    title.innerHTML = movies.results[index].title
    release.innerHTML = movies.results[index].release_date
    overview.innerHTML = movies.results[index].overview
    poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].poster_path}" >`
    background.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].backdrop_path}" >`


  })


  
    document.querySelector("#ant").addEventListener("click",()=>{
      index = index - 1
      if(index < 0){
        index = length     
      }
     title.innerHTML = movies.results[index].title
     release.innerHTML = movies.results[index].release_date
  
     overview.innerHTML = movies.results[index].overview
     poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].poster_path}" >`
  
     background.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].backdrop_path}" >`
     
    })  

   },
    
   showInfo : (info) =>{
    console.log(info)
    const poster = document.querySelector(".poster")
    const title = document.querySelector(".title_movie")
    const overview = document.querySelector(".overview_info")
    const background = document.querySelector(".background")
    const release = document.querySelector(".release_date_info")
    const genres = document.querySelector(".genres_info")
    const tagline = document.querySelector(".tag_line").innerHTML = info.tagline
    const streaming = document.querySelector(".streaming_info")
    const pop = document.querySelector(".pop_info")
    const vote = document.querySelector(".vote_info")
    const label = document.querySelector(".straming")



    //TAKE ALL GENRES 
    info.genres.forEach(genre =>{
      genres.innerHTML += genre.name + " "
    })
    
    if(info.networks !== undefined){
      info.networks.forEach(network =>{
        label.innerHTML = "Streaming at"
        streaming.innerHTML +=`<img src="https://image.tmdb.org/t/p/original/${network.logo_path}" width="100px" >`
      })
    }
  
  
   
   title.innerHTML = info.name
   if(info.name === undefined){
    title.innerHTML = info.title
   }
  release.innerHTML = info.first_air_date
  if(info.first_air_date === undefined){
    release.innerHTML = info.release_date
  }
  pop.innerHTML += info.popularity
  vote.innerHTML += info.vote_average
  

   
   overview.innerHTML = info.overview
    poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${info.poster_path}" >`
    background.innerHTML =`<img src="https://image.tmdb.org/t/p/original/${info.backdrop_path}" >`

   }

   
   



}

app.init()



const app = {


    
    movie_most_popular_URL : `https://api.themoviedb.org/3/movie/popular?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=1
    `,
    show_most_popular_URL :`
    https://api.themoviedb.org/3/tv/popular?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=1
    `,
   
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
                app.getLatest()
               break
            case "page-2" : 

           app.getSelectedMovie()
                break     
         }      
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
   getPopularMovies: () =>{
     let newUrl = app.movie_most_popular_URL
     let req = new Request(newUrl,{
        method:"GET",
        mode :"cors"
     })
     fetch(req)
     .then(res => res.json())
     .then(app.displayInfo)
      
   },
   getMostPopularSeries : () =>{
        let newUrl = app.show_most_popular_URL
        let req = new Request(newUrl,{
            method:"GET",
            mode:"cors"
        })
        fetch(req)
        .then(resp => resp.json())
        .then(app.getSexInfo)
   },

   getSelectedMovie : () =>{
    let newUrl = `https://api.themoviedb.org/3/movie/${localStorage.getItem(`paramether`)}
    ?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US `
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
    
     const list_container = document.getElementById("list-show")   
     const ul = document.createElement("ul")
     const li = document.createElement("li")
     
     console.log(post)
     post.results.forEach(element => {
        li.innerHTML +=`<li data-id="${element.id}">
        <img src="https://image.tmdb.org/t/p/w400/${element.poster_path}" 
       width="200px" data-el="${element.id}" > </li>`
        
     });
     ul.appendChild(li)
     list_container.appendChild(ul)
     

   },

   displayInfo: (post)=>{

     const list_container = document.getElementById("list-movie")
     const ul = document.createElement("ul")
    

     post.results.forEach(element => {
        ul.innerHTML +=`<li data-li="${element.id}">
        <a href="page-two.html" target="_blank">
       
       </a>
         </li>`    
            
     });  
     list_container.appendChild(ul)  
     const els = document.querySelectorAll("[data-li]")
     els.forEach(el =>{
        el.addEventListener("click",()=>{
         localStorage.setItem(`paramether`,`${el.dataset.li}`)
        })
     })
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
    
   }
   



}

app.init()



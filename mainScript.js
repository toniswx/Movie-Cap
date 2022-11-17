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
                app.searchInput()
                app.getPopularMovies()
                app.getMostPopularSeries()
                app.getDiscoverData()
                app.getLatest()
                app.pagination()
               
               break
            case "page-2" : 

           app.getSelectedMovie()
           app.getCredits()
           app.getImages()
           app.getSimilarMovies()
           app.searchInput()
           app.search()

                break     
            case "page-3" :
              
            app.pagination()
            app.searchInput()
            app.search()
            break

         }      
   },
  
   searchInput : ()=>{
    const keyBoard = document.querySelector(".keyboard")
    let search = document.getElementById("searinput")
    let type = document.getElementById("select")





    
 

    keyBoard.addEventListener("keydown" , e =>{
          if(e.keyCode === 13){
           localStorage.setItem(`search`,`${search.value}`)  
           localStorage.setItem(`type`,`${type.value}`) 
            window.location = "page-3.html"
            
          }
    })
  
    type.value = localStorage.getItem(`type`)
    search.value = localStorage.getItem(`search`)




   }
   ,
  

   pagination : () =>{
    
    let page = 1


     document.querySelectorAll(".esq").forEach(btn =>{

      btn.addEventListener("click",() =>{
        
       page = page - 1
       console.log(page)
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
        app.search(page)
        
      })
    })

    
     document.querySelectorAll(".dir").forEach(btn =>{
      console.log(btn)
      btn.addEventListener("click",() =>{
       page = page + 1
       console.log(page)
      if(page > 10)
       {page = 1 }
      
      


        if(btn.dataset.container === "show"){
          app.getMostPopularSeries(page)
        }
        if(btn.dataset.container === "movie"){
          app.getPopularMovies(page)
        }
        if(btn.dataset.container === "discover"){
          app.getDiscoverData(page)
        }
        app.search(page)
      
       
      
     
      })
    })

   },
   search : (pages) =>{
    document.querySelector(".result").innerHTML = `Results for:  ${localStorage.getItem(`search`)}`

    let newURL = `https://api.themoviedb.org/3/search/${localStorage.getItem(`type`)}?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&query=${localStorage.getItem(`search`)}&page=${pages}&include_adult=false
    `
    console.log(newURL)
       let req = new Request(newURL,{
        method:"GET",
        mode:"cors"
    })
     fetch(req)
    .then(resp => resp.json())
    .then(app.searchValue)
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
   searchValue : (search) =>{
     
    console.log(search)


    const page = document.querySelector(".search-page")
    const pagep = document.querySelector(".page")
    pagep.innerHTML = `Page ${search.page} of ${search.total_pages}`



    page.innerHTML = ""
    search.results.forEach(result =>{

      if(result.poster_path === null){
        return
      }
      else if(result.name === undefined){
        page.innerHTML +=`     
        <div data-id="${result.id}" data-type="${localStorage.getItem(`type`)}" class="teste">
         <a href="page-two.html" target="_blank">
         <img src="https://image.tmdb.org/t/p/w400/${result.poster_path}" 
        width="200px" data-el="${result.id}" >
        <p>${result.title}</p>
        </a>
          </div>  
      `
      }
      else{
        page.innerHTML +=  `     
        <div data-id="${result.id}" data-type="${localStorage.getItem(`type`)}" class="teste">
         <a href="page-two.html" target="_blank">
         <img src="https://image.tmdb.org/t/p/w400/${result.poster_path}" 
        width="200px" data-el="${result.id}" >
        <p>${result.name}</p>
        </a>
          </div>  
      `
     
      }
     
      const els = document.querySelectorAll("[data-id]")
      els.forEach(el =>{
         el.addEventListener("click",()=>{
          localStorage.setItem(`id`,`${el.dataset.id}`)
          localStorage.setItem(`type`,`${el.dataset.type}`)
          
         })})
    })
  

   }
   ,
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


    let newUrl = `https://api.themoviedb.org/3/${localStorage.getItem("type")}/${localStorage.getItem("id")}?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US `
    let req = new Request(newUrl,{
        method:"GET",
        mode:"cors"
    })
    console.log(newUrl)
    fetch(req)
    .then(resp => resp.json())
    .then(app.showInfo)
},

   getCredits : () =>{
  
   let url = ` https://api.themoviedb.org/3/${localStorage.getItem("type")}/${localStorage.getItem("id")}/credits?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US`
   let req = new Request(url,{
    method:"GET",
    mode:"cors"
   })
   fetch(req)
   .then(resp => resp.json())
   .then(app.creditsData)
}

,
   getImages : () =>{
    let url = `https://api.themoviedb.org/3/${localStorage.getItem("type")}/${localStorage.getItem("id")}/videos?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US

    `
      let req = new Request(url,{
      method:"GET",
      mode:"cors"
      })
      fetch(req)
     .then(resp => resp.json())
     .then(app.imagesData)


    }
    ,
   getSexInfo: (post) =>{   
    //SHOWS
     const list_container = document.getElementById("list-show")   
     const ul = document.createElement("ul")
   
     list_container.innerHTML = ""



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
   getSimilarMovies : () =>{
      
    let url = `https://api.themoviedb.org/3/${localStorage.getItem("type")}/${localStorage.getItem("id")}/similar?api_key=9c21b916909f5afdb748670f51f947e4&language=en-US&page=1`
    let req = new Request(url,{
      method:"GET",
      mode:"cors"
    })
    fetch(req)
    .then(resp => resp.json())
    .then(app.similar)

 

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
    const els = document.querySelectorAll("[data-id]")
    els.forEach(el =>{
       el.addEventListener("click",()=>{
         localStorage.setItem(`id`,`${el.dataset.id}`)
         localStorage.setItem(`type`,`${el.dataset.type}`)
       })})


   },


   latest : (movies) =>{
    console.log(movies)
   const poster = document.querySelector(".poster")
   const title = document.querySelector(".title_movie")
   const overview = document.querySelector(".overview_info")
   const background = document.querySelector(".background")
   const release = document.querySelector(".release_date_info")
   const see_more = document.querySelector(".see_more")

 




   let index = 0
   let length = movies.results.length
  


   title.innerHTML = movies.results[index].title
   release.innerHTML = movies.results[index].release_date
   overview.innerHTML = movies.results[index].overview
   poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].poster_path}" >`
   background.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].backdrop_path}" >`
   see_more.innerHTML = `<a   class="btn-see-more" data-id=${movies.results[index].id} data-type="movie" > See more </a>`





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
    see_more.innerHTML = `<a   class="btn-see-more" data-id=${movies.results[index].id} data-type="movie" > See more </a>`
  })


  
    document.querySelector("#ant").addEventListener("click",()=>{
      index = index - 1
      if(index < 0){
        index = length     
      }
      see_more.innerHTML = `<a   class="btn-see-more" data-id=${movies.results[index].id} data-type="movie" > See more </a>`
     title.innerHTML = movies.results[index].title
     release.innerHTML = movies.results[index].release_date
  
     overview.innerHTML = movies.results[index].overview
     poster.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].poster_path}" >`
  
     background.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movies.results[index].backdrop_path}" >`
     
    })  


      

  let btnd = document.querySelector(".see_more")
  
  btnd.addEventListener("click",()=>{
    
   console.log(btnd.children.item(0).dataset.id)
        
   localStorage.setItem(`id`,`${btnd.children.item(0).dataset.id}`)
   localStorage.setItem(`type`,`${btnd.children.item(0).dataset.type}`)
   window.location = "page-two.html"
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
   ,
   creditsData : (movie) =>{
 
    const cast_container = document.querySelector(".cast")
     
      movie.cast.forEach(per =>{
      if(per.profile_path === null){
        return
      }
      else{
         cast_container.innerHTML +=`

        <div>
        <img src="https://image.tmdb.org/t/p/original/${per.profile_path}" >
        <p>${per.name}</p>
        <span>${per.character}</span>
        </div>
      `
      }
     

    })



   },

   imagesData : (images)=> {
   
    if(images.results.length === 0){
      document.querySelector(".trailer_title").innerHTML = ""
      
    }
    else{
       images.results.forEach(video => {
      document.querySelector(".trailer").innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    });
    }
     
   
   },
   similar : (similar) =>{
     console.log(similar)
     const list_container = document.getElementById("list-similar")
     list_container.innerHTML = ""
     const ul = document.createElement("ul")
     similar.results.forEach(element => {
        ul.innerHTML +=`<li data-id="${element.id}" data-type="movie"  data-el="${element.id}">
        <a href="page-two.html">
        <img src="https://image.tmdb.org/t/p/w400/${element.poster_path}" 
       width="200px" >
       </a>
         </li>`    
             });  


     list_container.appendChild(ul)  
     const els = document.querySelectorAll("[data-id]")
     els.forEach(el =>{
        el.addEventListener("click",()=>{
          localStorage.setItem(`id`,`${el.dataset.el}`)
          localStorage.setItem(`type`,`${el.dataset.type}`)
         
        })})

  }
      

   

   

}

app.init()



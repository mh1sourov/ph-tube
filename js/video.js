// loadcategories sec

function getTime(time){
    const hour = parseInt((time / 3600));
    const remainingSecond = parseInt(time % 3600)
    const minute = parseInt((remainingSecond / 60))
    const second = parseInt((remainingSecond % 60))
    return `${hour} hour ${minute} minute ${second} sec ago`;
    }

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch(error => console.log(error))
}

//display catagories sec

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category_container');
    for(let item of categories){
        
    const button = document.createElement("button")
    button.classList = "btn hover:bg-red-600"
    button.innerText = item.category //`${item.category}`
    categoryContainer.appendChild(button);
    
}
}


const loadVideo = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideo(data))
    .catch((error) => console.log(error))
}

const displayVideo = (receiveVideoData) =>{
const receivedVideo = (receiveVideoData.videos);
const videoSection = document.getElementById("video");

   for(let video of receivedVideo){
    console.log(video);
    console.log("expected", video.title)
    const card = document.createElement("card")
    card.innerHTML = `
    <div class="card card-compact ">
  <figure class="h-[200px] relative">
    <img class ="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="" />
      ${
        video.others.posted_date.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded-lg text-gray-300 p-1">${getTime(video.others.posted_date)}</span>`
      }
      
    
  </figure>
  <div class="px-0 py-3 flex gap-2">
    <div>
    <img class='w-[50px] h-[50px] rounded-full' src=${video.authors[0].profile_picture}>
    </div>
    <div>
    <h1 class='font-bold'>${video.title}</h1>
    <div class='flex gap-1 items-center'>
    <p class= 'text-gray-500'>${video.authors[0].profile_name}</p>
    
    ${video.authors[0].verified ? `<img class='w-5 object-cover' src = 'https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'>`:''}
    
    </div>
    </div>

  </div>
</div>
    `
    videoSection.appendChild(card)
   }
  
}

loadCategories();
loadVideo();
// video id of video section



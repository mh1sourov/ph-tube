// time converter for video posted
function getTime(time){
    const hour = parseInt((time / 3600));
    const remainingSecond = parseInt(time % 3600)
    const minute = parseInt((remainingSecond / 60))
    const second = parseInt((remainingSecond % 60))
    return `${hour} hour ${minute} minute ${second} sec ago`;
    }
const removeActiveClass = () =>{
   const buttons = document.getElementsByClassName("btn_category")
         for(let button of buttons){
            button.classList.remove("active")
         }
}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}

//display catagories sec

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category_container');
    for(let item of categories){
        
    const buttonContainer = document.createElement("div")

    buttonContainer.innerHTML = `
    <button id= "btn-${item.category_id}" onClick="loadCategoryVideo(${item.category_id})" class="btn hover:bg-red-600 btn_category">${item.category}</button>`
    categoryContainer.appendChild(buttonContainer);
    
}
}

function loadCategoryVideo(id){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)

    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const activeButton = document.getElementById(`btn-${id}`)
         activeButton.classList.add("active")
        displayVideo(data.category)
    })
    .catch((error) => console.log(error))

}

const loadVideo = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
  
    .then(data => displayVideo(data.videos))
    .catch((error) => console.log(error))
}

const displayVideo = (receiveVideoData) =>{
const videoSection = document.getElementById("video");
videoSection.innerHTML = '';
if(receiveVideoData.length == 0){
    videoSection.classList.remove("grid")
    videoSection.innerHTML = `
    <div class = "flex flex-col justify-center items-center w-full mx-auto h-[300px]">
    <img src = "../Icon.png">
    <h1 class="text-2xl text-center font-bold">Opps! Sorry!! There is No Video</h1>
    </div>
    `
    return;
}
else{
    videoSection.classList.add("grid") 
}
receiveVideoData.forEach(video => {
    const card = document.createElement("card");
    card.innerHTML = `
    <div class="card card-compact ">
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
                src=${video.thumbnail}
                alt="" />
            ${
                video.others.posted_date.length == 0 
                ? "" 
                : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded-lg text-gray-300 p-1">
                    ${getTime(video.others.posted_date)}
                   </span>`
            }
        </figure>
        <div class="px-0 py-3 flex gap-2">
            <div>
                <img class='w-[50px] h-[50px] rounded-full' src=${video.authors[0].profile_picture}>
            </div>
            <div>
                <h1 class='font-bold'>${video.title}</h1>
                <div class='flex gap-1 items-center'>
                    <p class='text-gray-500'>${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified 
                        ? `<img class='w-5 object-cover' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'>`
                        : ''
                    }
                </div>
            </div>
        </div>
    </div>
    `;
    
    videoSection.appendChild(card);
});

  
}

loadCategories();
loadVideo();




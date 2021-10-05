
//this stuff may be usefull later. slightly messy code but it runs lol. 
let thumbnailContainer = document.getElementById('thumbnailContainer');
let imageTitle = document.getElementById('imageTitle');
let videoTitle = document.getElementById('videoTitle')
let mainImage = document.getElementById('mainImage');
let imageDescription = document.getElementById('imageDescription');
let videoDescription = document.getElementById('videoDescription');
let videoDisplay = document.getElementById('videoDisplay');
let imageDisplay = document.getElementById('imageDisplay');
let videoSrc = document.getElementById('videoSrc')
videoDisplay.style.display = 'none';


fetch(`https://api.nasa.gov/planetary/apod?start_date=2021-09-23&api_key=${apiKey}`)
    .then((resp) => resp.json())
    .then(data => {
        console.log(data)
        data.forEach(element => makeThumbnail(element))
    });
//function that takes an object and creates a thumbnail.  checks to see if the object represents an image or a video. makes
// apropriate thumbnail.
makeThumbnail = obj => {
    let div = document.createElement('div');
    if (obj.media_type === 'video') {
        div.className = 'videoThumbnail';
        let video = document.createElement('video');
        video.setAttribute('controls', 'controls');
        let source = document.createElement('source');
        source.src = obj.url;
        video.className = 'thumbnailVideo'
        video.appendChild(source);
        div.appendChild(video);
    } else {
        div.className = 'imageThumbnail';
        let img = document.createElement('img');
        img.src = obj.url;
        img.alt = obj.explanation;
        img.className = 'thumbnailImage';
        div.appendChild(img);
        }
     thumbnailContainer.appendChild(div);

//event listener that changes what is displayed in the main div when a thumbnail is clicked
    div.addEventListener('click', (e) => {
        e.preventDefault();
        if (div.className === 'imageThumbnail') {
            videoDisplay.style.display = 'none';
            imageDisplay.style.display = 'block';
            mainImage.src = obj.hdurl;
            mainImage.alt = obj.explanation;
            imageTitle.innerText = obj.title;
            imageDescription.innerText = obj.explanation;
        } else {
            imageDisplay.style.display = 'none';
            videoDisplay.style.display = 'block';
            videoSrc.src = obj.url;
            videoDescription.innerText = obj.explanation;
            videoTitle.innerText = obj.title;
        }
    })
    
}


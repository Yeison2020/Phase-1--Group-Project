let thumbnailContainer = document.getElementById('thumbnailContainer');
let imageTitle = document.getElementById('imageTitle');
let mainImage = document.getElementById('mainImage');
let mainDescription = document.getElementById('mainDescription');


makeThumbnail = obj => {
    let div = document.createElement('div');
    div.className = 'thumbnail';
    if (obj.media_type === 'video') {
        let video = document.createElement('video')
        video.setAttribute('controls');
        let source = document.createElement('source')
        source.src = obj.url;
        video.appendChild(source);
        div.appendChild(video);
    } else {
        let img = document.createElement('img');
        img.src = obj.hdurl;
        img.className = 'thumbnailImage'
        //img.style.height = '200px'
        //img.style.width = '200px'
        div.appendChild(img);
}
    thumbnailContainer.appendChild(div);
    // div.addEventListener('click', (e) => {
    //     mainImage.src = obj.hdurl;
    //     imageTitle.innerText = obj.title;
    //     mainDescription.innerText = obj.explanation;
    // })
    
}

fetch(`https://api.nasa.gov/planetary/apod?start_date=2021-10-01&api_key=${apiKey}`)
    .then((resp) => resp.json())
    .then(data => {
        console.log(data)
        data.forEach(element => makeThumbnail(element))
    });
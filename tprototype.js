//this stuff may be usefull later. slightly messy code but it runs lol.
let thumbnailContainer = document.getElementById("thumbnailContainer");
let imageTitle = document.getElementById("imageTitle");
let videoTitle = document.getElementById("videoTitle");
let mainImage = document.getElementById("mainImage");
let imageDescription = document.getElementById("imageDescription");
let videoDescription = document.getElementById("videoDescription");
let videoDisplay = document.getElementById("videoDisplay");
let imageDisplay = document.getElementById("imageDisplay");
let videoSrc = document.getElementById("videoSrc");
videoDisplay.style.display = "none";

fetch(
  `https://api.nasa.gov/planetary/apod?start_date=2021-09-23&api_key=QRGi2r3XlHiGSpllFrbp6oSEiPxfoBG6pZKn9VKl`
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => makeThumbnail(element));
  });
//function that takes an object and creates a thumbnail.  checks to see if the object represents an image or a video. makes
// apropriate thumbnail.
makeThumbnail = (obj) => {
  let div = document.createElement("div");
  if (obj.media_type === "video") {
    div.className = "videoThumbnail";
    let video = document.createElement("video");
    video.setAttribute("controls", "controls");
    let source = document.createElement("source");
    source.src = obj.url;
    video.className = "thumbnailVideo";
    video.appendChild(source);
    div.appendChild(video);
  } else {
    div.className = "imageThumbnail";
    let img = document.createElement("img");
    img.src = obj.url;
    img.alt = obj.explanation;
    img.className = "thumbnailImage";
    div.appendChild(img);
  }
  thumbnailContainer.appendChild(div);

  //event listener that changes what is displayed in the main div when a thumbnail is clicked
  div.addEventListener("click", (e) => {
    e.preventDefault();
    if (div.className === "imageThumbnail") {
      videoDisplay.style.display = "none";
      imageDisplay.style.display = "block";
      mainImage.src = obj.hdurl;
      mainImage.alt = obj.explanation;
      imageTitle.innerText = obj.title;
      imageDescription.innerText = obj.explanation;
    } else {
      imageDisplay.style.display = "none";
      videoDisplay.style.display = "block";
      videoSrc.src = obj.url;
      videoDescription.innerText = obj.explanation;
      videoTitle.innerText = obj.title;
    }
  });
};
// Adding the comment functionality

const commentForm = document.getElementById("comments");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const commentContainer = document.getElementById("commentContainer");

  const makeEl = (e) => document.createElement(e);
  const li = makeEl("li");
  const div = makeEl("div");
  li.textContent = e.target.commentText.value;
  div.append(li);
  commentContainer.append(div);
  e.target.reset();
});

const likesButton = document.getElementById("like-btn");
likesButton.addEventListener("click", () => increment());

const increment = () => {
  let likes = document.getElementById("likesImgs").textContent;
  let current = likes.replace("Likes", "");
  let string = parseInt(current);
  string++;
  likes = document.getElementById("likesImgs").textContent = `${string} Likes`;
};

const videoLikesButton = document.getElementById("video-like-btn");
videoLikesButton.addEventListener("click", () => videoIncrement());

const videoIncrement = () => {
  let likes = document.getElementById("video-likesImgs").textContent;
  let current = likes.replace("Likes", "");
  let string = parseInt(current);
  string++;
  likes = document.getElementById("video-likesImgs").textContent = `${string} Likes`;
};

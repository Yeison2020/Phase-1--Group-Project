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
const imageLink = document.getElementById("imgLink");
const videoLink = document.getElementById("videoLink");
let videoLikes = document.getElementById("video-likesImgs").textContent;
let likes = document.getElementById("likesImgs").textContent;
let dateRange = document.getElementById("dateRange");



dateRange.addEventListener("submit", (e) => {
  e.preventDefault();
  thumbnailContainer.innerHTML = '';
  const firstDate = document.getElementById("begin").value;
  const seccondDate = document.getElementById("end").value;
  fetch(`https://api.nasa.gov/planetary/apod?start_date=${firstDate}&end_date=${seccondDate}&api_key=${apiKey}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.forEach((element) => makeThumbnail(element));
    });
});

//function to help limit the number of days a user can input at once. non-feature but saved for further study.
// howManyDays = (day1, day2) => {
//   let diff = day2.getTime() - day1.getTime();
//   diffInDays = diff / (1000 * 60 * 60 *24);
//   return diffInDays;
// }

// document.getElementById('dateRange').addEventListener('submit', (e) => {
//   e.preventDefault();
//   let startDate = document.getElementById('begin').value;
//   let endDate = document.getElementById('end').value;
//   console.log(howManyDays(startDate, endDate));
// });

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
      mainImage.src = obj.url;
      mainImage.alt = obj.explanation;
      imageTitle.innerText = obj.title;
      imageDescription.innerText = obj.explanation;
      imageLink.href = obj.hdurl;
      //let likes = document.getElementById("likesImgs").textContent;
      let string = 0;
      likes = document.getElementById(
        "likesImgs"
      ).textContent = `${string} Likes`;
      document.getElementById("commentContainer").innerHTML = "";
    } else {
      imageDisplay.style.display = "none";
      videoDisplay.style.display = "block";
      videoSrc.src = obj.url;
      videoDescription.innerText = obj.explanation;
      videoTitle.innerText = obj.title;
      videoLink.href = obj.url;
      let string = 0;
      videoLikes = document.getElementById(
        "video-likesImgs"
      ).textContent = `${string} Likes`;
      document.getElementById("videoCommentContainer").innerHTML = "";
    }
  });
};
// Adding the comment functionality for image container.

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

// and for the video container

const videoForm = document.getElementById("videoForm");

videoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const videoCommentContainer = document.getElementById(
    "videoCommentContainer"
  );

  const makeEl = (e) => document.createElement(e);
  const li = makeEl("li");
  const div = makeEl("div");
  li.textContent = e.target.commentText.value;
  div.append(li);
  videoCommentContainer.append(div);
  e.target.reset();
});

//Like button function

const likesButton = document.getElementById("like-btn");
likesButton.addEventListener("click", () => increment());

const increment = () => {
  //let likes = document.getElementById("likesImgs").textContent;
  let current = likes.replace("Likes", "");
  let string = parseInt(current);
  string++;
  likes = document.getElementById("likesImgs").textContent = `${string} Likes`;
};

const videoLikesButton = document.getElementById("video-like-btn");
videoLikesButton.addEventListener("click", () => videoIncrement());

const videoIncrement = () => {
  //let videoLikes = document.getElementById("video-likesImgs").textContent;
  let current = videoLikes.replace("Likes", "");
  let string = parseInt(current);
  string++;
  videoLikes = document.getElementById(
    "video-likesImgs"
  ).textContent = `${string} Likes`;
};

//Loads Default content from todays astronomy photo of the day.
fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
  .then((data) => data.json())
  .then((todaysContent) => {
    if (todaysContent.media_type === "image") {
      mainImage.src = todaysContent.hdurl;
      mainImage.alt = todaysContent.explanation;
      imageTitle.innerText = todaysContent.title;
      imageDescription.innerText = todaysContent.explanation;
      imageLink.href = todaysContent.hdurl;
      console.log(todaysContent);
    } else {
      imageDisplay.style.display = "none";
      videoDisplay.style.display = "block";
      videoSrc.src = todaysContent.url;
      videoDescription.innerText = todaysContent.explanation;
      videoTitle.innerText = todaysContent.title;
      videoLink.href = todaysContent.url;
    }
  });

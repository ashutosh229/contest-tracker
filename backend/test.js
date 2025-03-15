const API_KEY = "AIzaSyDft7I5ic-n1i4puhSINpgSPVY9Vu3lYIU";
const username = "@TLE_Eliminators"; // Replace with the actual username

fetch(
  `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${username}&key=${API_KEY}`
)
  .then((response) => response.json())
  .then((data) => {
    const items = data.items;
    const channel = items.find((item) => item.id.channelId);
    if (channel) {
      console.log("Channel ID:", channel.id.channelId);
    } else {
      console.log("No channel found!");
    }
  }); // This prints the Channel ID

// import os from "os";
// const networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);

// Find the first channel result

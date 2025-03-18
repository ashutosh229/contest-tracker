import { configDotenv } from "dotenv";

configDotenv({
  path: "../.env",
});

const youtubeAPIKey = process.env.YOUTUBE_API_KEY;

const fetchSolutionsFromPlaylist = async (playlistId, contestName) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${youtubeAPIKey}}`
    );

    if (!(response.status === 200)) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const videos = data.items;
    const matchedVideo = videos.find((video) =>
      video.snippet.title.toLowerCase().includes(contestName.toLowerCase())
    );

    return matchedVideo
      ? `https://www.youtube.com/watch?v=${matchedVideo.snippet.resourceId.videoId}`
      : null;
  } catch (error) {
    console.error("Error fetching YouTube solutions:", error);
    return null;
  }
};

export default fetchSolutionsFromPlaylist;

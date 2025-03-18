import dotenv from "dotenv";

dotenv.config();

const youtubeAPIKey = process.env.YOUTUBE_API_KEY;

const fetchSolutionsFromPlaylist = async (playlistId, contestName) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${youtubeAPIKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const videos = data.items || [];
    const matchedVideo = videos.find((video) => {
      const contestWords = contestName.toLowerCase().split(/[\s().,-]+/);

      return contestWords.some(
        (word) => word && video.snippet.title.toLowerCase().includes(word)
      );
    });

    if (!matchedVideo)
      return {
        status: 1, //not available on youtube playlist
        solutionLink: null,
      };

    const videoId =
      matchedVideo.snippet.resourceId?.videoId || matchedVideo.snippet?.videoId;

    return videoId
      ? {
          state: 3, //got the solution link
          solutionLink: `https://www.youtube.com/watch?v=${videoId}`,
        }
      : {
          state: 2, //video id is not available
          solutionLink: null,
        };
  } catch (error) {
    console.error("Error fetching YouTube solutions:", error);
    return {
      state: 4, //internal server error
      solutionLink: null,
    };
  }
};

export default fetchSolutionsFromPlaylist;

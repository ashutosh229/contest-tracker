import axios from "axios";
import Contest from "../models/Contest.js";

export async function updateYoutubeSolutions() {
  try {
    const YOUTUBE_API_KEY =
      process.env.YOUTUBE_API_KEY || "AIzaSyDft7I5ic-n1i4puhSINpgSPVY9Vu3lYIU";
    const CHANNEL_ID =
      process.env.YOUTUBE_CHANNEL_ID || "UCqL-fzHtN3NQPbYqGymMbTA";

    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      console.error("YouTube API key or Channel ID not configured");
      return;
    }

    // Get recent contests
    const recentContests = await Contest.find({
      startTime: { $lt: new Date() },
      solutionUrl: { $exists: false },
    });

    for (const contest of recentContests) {
      // Search for solution video
      const searchResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&q=${encodeURIComponent(
          contest.name + " solution"
        )}&key=${YOUTUBE_API_KEY}&type=video&order=date`
      );

      const videos = searchResponse.data.items;
      if (videos && videos.length > 0) {
        const videoId = videos[0].id.videoId;
        const solutionUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Update contest with solution URL
        await Contest.findByIdAndUpdate(contest._id, { solutionUrl });
      }
    }
  } catch (error) {
    console.error("Error updating YouTube solutions:", error);
    throw error;
  }
}

import axios from "axios";
import Contest from "../models/Contest.js";

export async function fetchContests() {
  try {
    // Fetch Codeforces contests
    const codeforcesResponse = await axios.get(
      "https://codeforces.com/api/contest.list"
    );
    const codeforcesContests = codeforcesResponse.data.result
      .filter((contest) => contest.phase !== "FINISHED")
      .map((contest) => ({
        platform: "Codeforces",
        name: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
      }));

    // Fetch CodeChef contests
    const codechefResponse = await axios.get(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
    );
    const codechefContests = [
      ...codechefResponse.data.future_contests,
      ...codechefResponse.data.present_contests,
    ].map((contest) => ({
      platform: "CodeChef",
      name: contest.contest_name,
      startTime: new Date(contest.contest_start_date),
      duration: contest.contest_duration * 60,
      url: `https://www.codechef.com/${contest.contest_code}`,
    }));

    // Fetch LeetCode contests
    // const leetcodeResponse = await axios.get(
    //   "https://leetcode.com/contest/api/list/"
    // );
    // const leetcodeContests = leetcodeResponse.data.contests
    //   .filter((contest) => new Date(contest.start_time) > new Date())
    //   .map((contest) => ({
    //     platform: "LeetCode",
    //     name: contest.title,
    //     startTime: new Date(contest.start_time),
    //     duration: contest.duration,
    //     url: `https://leetcode.com/contest/${contest.title_slug}`,
    //   }));

    // Combine all contests
    const allContests = [
      ...codeforcesContests,
      ...codechefContests,
      // ...leetcodeContests,
    ];

    // Update database
    for (const contest of allContests) {
      await Contest.findOneAndUpdate(
        { platform: contest.platform, name: contest.name },
        contest,
        { upsert: true }
      );
    }
  } catch (error) {
    console.log("Error fetching contests:", error);
    throw error;
  }
}

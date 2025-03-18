import axios, { all } from "axios";

export const contestFetcher = async () => {
  try {
    const codeforcesResponse = await fetch(
      "https://codeforces.com/api/contest.list",
      { method: "GET" }
    );
    const dataCodeforces = await codeforcesResponse.json();
    const codeforcesContests = dataCodeforces.result
      .filter((contest) => contest.phase !== "FINISHED")
      .map((contest) => ({
        platform: "Codeforces",
        name: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
      }));

    const codechefResponse = await fetch(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
      {
        method: "GET",
      }
    );
    const dataCodechef = await codechefResponse.json();

    const codechefContests = [
      ...dataCodechef.present_contests,
      ...dataCodechef.future_contests,
    ].map((contest) => ({
      platform: "CodeChef",
      name: contest.contest_name,
      startTime: new Date(contest.contest_start_date),
      duration: Number(contest.contest_duration) / 60,
      url: `https://www.codechef.com/${contest.contest_code}`,
    }));

    const allContests = [...codeforcesContests, ...codechefContests];

    const codeforcesResponseForPastContests = await fetch(
      "https://codeforces.com/api/contest.list",
      { method: "GET" }
    );
    const dataCodeforcesForPastContests =
      await codeforcesResponseForPastContests.json();
    const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in secondass
    const oneWeekAgo = currentTime - 7 * 24 * 60 * 60; // One week ago timestamp
    const codeforcesContestsForPast = dataCodeforcesForPastContests.result
      .filter(
        (contest) =>
          contest.phase === "FINISHED" && contest.startTimeSeconds >= oneWeekAgo
      )
      .map((contest) => ({
        platform: "Codeforces",
        name: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
      }));

    const codechefResponseForPastContests = await fetch(
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
      {
        method: "GET",
      }
    );
    const dataCodechefForPastContests =
      await codechefResponseForPastContests.json();
    const currentTime2 = new Date();
    const oneWeekAgo2 = new Date(currentTime2);
    oneWeekAgo2.setDate(currentTime2.getDate() - 7); // Subtract 7 days

    const codechefContestsForPast = [
      ...dataCodechefForPastContests.past_contests,
    ]
      .filter((contest) => {
        const contestEndDate = new Date(contest.contest_end_date_iso);
        return contestEndDate >= oneWeekAgo && contestEndDate < currentTime;
      })
      .map((contest) => ({
        platform: "CodeChef",
        name: contest.contest_name,
        startTime: new Date(contest.contest_start_date),
        duration: Number(contest.contest_duration) / 60,
        url: `https://www.codechef.com/${contest.contest_code}`,
      }));

    const allContestsForPast = [
      ...codeforcesContestsForPast,
      ...codechefContestsForPast,
    ];

    const contests = [...allContests, ...allContestsForPast];
    return contests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

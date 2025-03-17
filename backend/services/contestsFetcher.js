import axios from "axios";

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

    return allContests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

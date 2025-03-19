import dotenv from "dotenv";

dotenv.config();

// export const contestFetcher = async () => {
//   try {
//     const codeforcesResponse = await fetch(
//       "https://codeforces.com/api/contest.list",
//       { method: "GET" }
//     );
//     const dataCodeforces = await codeforcesResponse.json();
//     const codeforcesContests = dataCodeforces.result
//       .filter((contest) => contest.phase !== "FINISHED")
//       .map((contest) => ({
//         platform: "Codeforces",
//         name: contest.name,
//         startTime: new Date(contest.startTimeSeconds * 1000),
//         duration: contest.durationSeconds,
//         url: `https://codeforces.com/contest/${contest.id}`,
//       }));

//     const codechefResponse = await fetch(
//       "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
//       {
//         method: "GET",
//       }
//     );
//     const dataCodechef = await codechefResponse.json();

//     const codechefContests = [
//       ...dataCodechef.present_contests,
//       ...dataCodechef.future_contests,
//     ].map((contest) => ({
//       platform: "CodeChef",
//       name: contest.contest_name,
//       startTime: new Date(contest.contest_start_date),
//       duration: Number(contest.contest_duration) / 60,
//       url: `https://www.codechef.com/${contest.contest_code}`,
//     }));

//     const leetcodeResponse = await fetch(
//       `https://clist.by/api/v4/contest/?host=leetcode.com&username=${process.env.LEETCODE_API_USERNAME}&api_key=${process.env.LEETCODE_API_KEY}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (!leetcodeResponse.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const dataLeetcode = await leetcodeResponse.json();
//     const dataLeetcodeContests = dataLeetcode.objects;
//     const now = new Date();
//     const parseDate = (dateString) => new Date(dateString);
//     const transformContest = (contest) => ({
//       platform: "Leetcode",
//       name: contest.event,
//       startTime: parseDate(contest.start),
//       duration: contest.duration / (60 * 60), // Convert duration from seconds to hour
//       url: contest.href,
//     });
//     const upcomingContestsLeetcode = dataLeetcodeContests
//       .filter((contest) => parseDate(contest.start) > now)
//       .map(transformContest);
//     const ongoingContestsLeetcode = dataLeetcodeContests
//       .filter(
//         (contest) =>
//           parseDate(contest.start) <= now && parseDate(contest.end) >= now
//       )
//       .map(transformContest);

//     const oneWeekAgo3 = new Date();
//     oneWeekAgo3.setDate(now.getDate() - 7);
//     const pastWeekContestsLeetcode = dataLeetcodeContests
//       .filter(
//         (contest) =>
//           parseDate(contest.end) >= oneWeekAgo3 && parseDate(contest.end) < now
//       )
//       .map(transformContest);

//     const leetcodeContests = [
//       ...ongoingContestsLeetcode,
//       ...upcomingContestsLeetcode,
//     ];

//     const allContests = [
//       ...codeforcesContests,
//       ...codechefContests,
//       ...leetcodeContests,
//     ];

//     const codeforcesResponseForPastContests = await fetch(
//       "https://codeforces.com/api/contest.list",
//       { method: "GET" }
//     );
//     const dataCodeforcesForPastContests =
//       await codeforcesResponseForPastContests.json();
//     const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in secondass
//     const oneWeekAgo = currentTime - 7 * 24 * 60 * 60; // One week ago timestamp
//     const codeforcesContestsForPast = dataCodeforcesForPastContests.result
//       .filter(
//         (contest) =>
//           contest.phase === "FINISHED" && contest.startTimeSeconds >= oneWeekAgo
//       )
//       .map((contest) => ({
//         platform: "Codeforces",
//         name: contest.name,
//         startTime: new Date(contest.startTimeSeconds * 1000),
//         duration: contest.durationSeconds,
//         url: `https://codeforces.com/contest/${contest.id}`,
//       }));

//     const codechefResponseForPastContests = await fetch(
//       "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all",
//       {
//         method: "GET",
//       }
//     );
//     const dataCodechefForPastContests =
//       await codechefResponseForPastContests.json();
//     const currentTime2 = new Date();
//     const oneWeekAgo2 = new Date(currentTime2);
//     oneWeekAgo2.setDate(currentTime2.getDate() - 7); // Subtract 7 days

//     const codechefContestsForPast = [
//       ...dataCodechefForPastContests.past_contests,
//     ]
//       .filter((contest) => {
//         const contestEndDate = new Date(contest.contest_end_date_iso);
//         return contestEndDate >= oneWeekAgo2 && contestEndDate < currentTime2;
//       })
//       .map((contest) => ({
//         platform: "CodeChef",
//         name: contest.contest_name,
//         startTime: new Date(contest.contest_start_date),
//         duration: Number(contest.contest_duration) / 60,
//         url: `https://www.codechef.com/${contest.contest_code}`,
//       }));

//     const allContestsForPast = [
//       ...codeforcesContestsForPast,
//       ...codechefContestsForPast,
//       ...pastWeekContestsLeetcode,
//     ];

//     const contests = [...allContests, ...allContestsForPast];
//     return contests;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const contestFetcher = async () => {
  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);

  // Function to transform contest data
  const transformContest = (platform, contest) => ({
    platform,
    name: contest.name || contest.contest_name || contest.event,
    startTime: new Date(
      contest.startTimeSeconds * 1000 ||
        contest.contest_start_date ||
        contest.start
    ),
    duration:
      contest.durationSeconds ||
      Number(contest.contest_duration) / 60 ||
      contest.duration / (60 * 60), // Convert to hours
    url:
      contest.url ||
      `https://codeforces.com/contest/${contest.id}` ||
      `https://www.codechef.com/${contest.contest_code}` ||
      contest.href,
  });

  try {
    // Initiate all fetch requests concurrently
    const [codeforcesResponse, codechefResponse, leetcodeResponse] =
      await Promise.all([
        fetch("https://codeforces.com/api/contest.list"),
        fetch(
          "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
        ),
        fetch(
          `https://clist.by/api/v4/contest/?host=leetcode.com&username=${process.env.LEETCODE_API_USERNAME}&api_key=${process.env.LEETCODE_API_KEY}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        ),
      ]);

    // Check for response errors
    if (
      !codeforcesResponse.ok ||
      !codechefResponse.ok ||
      !leetcodeResponse.ok
    ) {
      throw new Error("One or more API requests failed.");
    }

    // Parse JSON responses
    const [dataCodeforces, dataCodechef, dataLeetcode] = await Promise.all([
      codeforcesResponse.json(),
      codechefResponse.json(),
      leetcodeResponse.json(),
    ]);

    // Process Codeforces contests
    const codeforcesContests = dataCodeforces.result
      .filter(
        (contest) =>
          contest.phase !== "FINISHED" ||
          (contest.phase === "FINISHED" &&
            new Date(contest.startTimeSeconds * 1000) >= oneWeekAgo)
      )
      .map((contest) => transformContest("Codeforces", contest));

    // Process CodeChef contests
    const codechefContests = [
      ...dataCodechef.present_contests,
      ...dataCodechef.future_contests,
      ...dataCodechef.past_contests.filter(
        (contest) =>
          new Date(contest.contest_end_date_iso) >= oneWeekAgo &&
          new Date(contest.contest_end_date_iso) < now
      ),
    ].map((contest) => transformContest("CodeChef", contest));

    // Process LeetCode contests
    const leetcodeContests = dataLeetcode.objects
      .filter((contest) => {
        const condition1 = new Date(contest.start) > now;
        const condition2 =
          new Date(contest.start) <= now && new Date(contest.end) >= now;
        const condition3 =
          new Date(contest.end) >= oneWeekAgo && new Date(contest.end) < now;
        return condition1 || condition2 || condition3;
      })
      .map((contest) => transformContest("Leetcode", contest));

    // Combine all contests
    return [...codeforcesContests, ...codechefContests, ...leetcodeContests];
  } catch (error) {
    console.error("Error fetching contest data:", error);
    throw error;
  }
};

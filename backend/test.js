const fetchLeetCodeContests = async () => {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          contestCalendar {
            past {
              title
              titleSlug
              startTime
              duration
            }
            future {
              title
              titleSlug
              startTime
              duration
            }
          }
        }
      `,
      variables: {}, // This is required even if empty
    }),
  });

  if (!response.ok) {
    console.error("Failed to fetch LeetCode contests:", response.statusText);
    return;
  }

  // const data = await response.json();
  console.log(response);
};

// // Usage Example
// fetchLeetCodeContests().then((contests) => console.log(contests));

fetchLeetCodeContests();

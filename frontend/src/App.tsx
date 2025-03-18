import { useState, useEffect } from "react";
import { Calendar, Filter, Bookmark, Youtube } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import type { Contest } from "./types";
import { format, isPast, addWeeks, differenceInSeconds } from "date-fns";

const BACKEND_DOMAIN = "http://localhost:3000";

function App() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Codeforces",
  ]);
  const [showPastContests, setShowPastContests] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchContests();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimeRemaining();
    }, 1000);
    return () => clearInterval(timer);
  }, [contests]);

  useEffect(() => {
    if (showPastContests) {
      fetchSolutionLinks(contests);
    }
  }, [showPastContests, contests]);

  const fetchContests = async () => {
    try {
      const response = await fetch(
        `${BACKEND_DOMAIN}/api/contest/get_all_contests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === true) {
        setContests(data.data);
        toast.success("Contests fetched");
      } else {
        toast.error("Error fetching the contests due to false status");
      }
    } catch (error) {
      console.log("fetch contests error");
      console.log(error);
      toast.error("Failed to fetch contests");
    }
  };

  const updateTimeRemaining = (contestsData = contests) => {
    const now = new Date();
    const updatedTimes: { [key: string]: string } = {};

    contestsData.forEach((contest) => {
      const startTime = new Date(contest.startTime);
      const diffInSeconds = differenceInSeconds(startTime, now);

      if (diffInSeconds > 0) {
        const days = Math.floor(diffInSeconds / (3600 * 24));
        const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        updatedTimes[
          contest._id
        ] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        updatedTimes[contest._id] = "Starting Soon!";
      }
    });

    setTimeLeft(updatedTimes);
  };

  const fetchSolutionLinks = async (contestsData: Contest[]) => {
    const pastContests = contestsData.filter((contest) =>
      isPast(new Date(contest.startTime))
    );

    const updatedContests = await Promise.all(
      pastContests.map(async (contest) => {
        try {
          const response = await fetch(
            `${BACKEND_DOMAIN}/api/contest/contest_solution?platform=${
              contest.platform
            }&contestName=${encodeURIComponent(contest.name)}`
          );
          const data = await response.json();
          if (data.status && data.solutionLink) {
            return { ...contest, solutionUrl: data.solutionLink };
          }
        } catch (error) {
          console.log(`Error fetching solution for ${contest.name}`, error);
        }
        return contest; // Return contest as-is if fetch fails
      })
    );

    // Update state in one batch to avoid multiple re-renders
    setContests((prev) =>
      prev.map((c) => updatedContests.find((uc) => uc._id === c._id) || c)
    );
  };

  const toggleBookmark = async (
    contestId: string,
    contestStartTime: string
  ) => {
    const isPastContest = isPast(new Date(contestStartTime));
    if (isPastContest) {
      toast.error("Past contests cannot be bookmarked");
      return;
    }
    try {
      const response = await fetch(
        `${BACKEND_DOMAIN}/api/contest/${contestId}/bookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      if (data.status) {
        fetchContests();
        toast.success("Bookmark updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("toggle contests error");
      console.log(error);
      toast.error("Failed to update bookmark");
    }
  };

  const filteredContests = contests.filter((contest) => {
    const isPastContest = isPast(new Date(contest.startTime));
    if (showPastContests) {
      return (
        isPastContest &&
        new Date(contest.startTime) > addWeeks(new Date(), -1) &&
        selectedPlatforms.includes(contest.platform)
      );
    }
    return !isPastContest && selectedPlatforms.includes(contest.platform);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-8 h-8 text-indigo-600" />
              Contest Tracker
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPastContests(!showPastContests)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {showPastContests ? "Show Upcoming" : "Show Past Week"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Platform Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Filter Platforms</h2>
          </div>
          <div className="mt-4 flex gap-4">
            {["Codeforces", "CodeChef"].map((platform) => (
              <label key={platform} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlatforms([...selectedPlatforms, platform]);
                    } else {
                      setSelectedPlatforms(
                        selectedPlatforms.filter((p) => p !== platform)
                      );
                    }
                  }}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contest List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredContests.map((contest) => (
              <li key={contest._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          contest.platform === "Codeforces"
                            ? "bg-red-100 text-red-800"
                            : contest.platform === "CodeChef"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {contest.platform}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">
                        {contest.name}
                      </h3>
                    </div>
                    <div className="mt-2 flex items-center gap-6 text-sm text-gray-500">
                      {showPastContests ? (
                        <span>
                          Started:{" "}
                          {format(new Date(contest.startTime), "PPP pp")}
                        </span>
                      ) : (
                        <span>
                          Starts:{" "}
                          {format(new Date(contest.startTime), "PPP pp")}
                        </span>
                      )}
                      {contest.platform === "CodeChef" ? (
                        <span>Duration: {contest.duration} hours</span>
                      ) : (
                        <span>
                          Duration: {Math.floor(contest.duration / 3600)} hours
                        </span>
                      )}
                      {showPastContests ? (
                        <span className="mt-2 text-sm font-semibold text-indigo-600">
                          ⏳ Time Remaining: Already Over
                        </span>
                      ) : (
                        <span className="mt-2 text-sm font-semibold text-indigo-600">
                          ⏳ Time Remaining:{" "}
                          {timeLeft[contest._id] || "Calculating..."}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {contest.solutionUrl && (
                      <a
                        href={contest.solutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                    <button
                      onClick={() =>
                        toggleBookmark(contest._id, contest.startTime)
                      }
                      className={`${
                        contest.isBookmarked
                          ? "text-yellow-400 hover:text-yellow-500"
                          : "text-gray-400 hover:text-gray-500"
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <a
                      href={encodeURI(contest.url.trim())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      View Contest
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

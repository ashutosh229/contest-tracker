import { useState, useEffect } from "react";
import { Calendar, Filter, Bookmark, Youtube } from "lucide-react";
import { format, isPast, addWeeks } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import type { Contest } from "./types";
import axios from "axios";

const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN;

function App() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Codeforces",
    // "CodeChef",
    // "LeetCode",
  ]);
  const [showPastContests, setShowPastContests] = useState(false);

  useEffect(() => {
    fetchContests();
  }, [selectedPlatforms]);

  const fetchContests = async () => {
    try {
      const response = await axios.get(`/api/contests`, {
        withCredentials: true,
      });
      const data = response.data;
      setContests(data);
    } catch (error) {
      console.log("fetch contests error");
      console.log(error);
      toast.error("Failed to fetch contests");
    }
  };

  const toggleBookmark = async (contestId: string) => {
    try {
      await axios.post(
        `/api/contests/${contestId}/bookmark`,
        {},
        {
          withCredentials: true,
        }
      );
      fetchContests();
      toast.success("Bookmark updated");
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
        isPastContest && new Date(contest.startTime) > addWeeks(new Date(), -1)
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
            {["Codeforces", "CodeChef", "LeetCode"].map((platform) => (
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
              <li key={contest.id} className="p-6 hover:bg-gray-50">
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
                      <span>
                        Starts: {format(new Date(contest.startTime), "PPP pp")}
                      </span>
                      <span>
                        Duration: {Math.floor(contest.duration / 60)} hours
                      </span>
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
                      onClick={() => toggleBookmark(contest.id)}
                      className={`${
                        contest.isBookmarked
                          ? "text-yellow-400 hover:text-yellow-500"
                          : "text-gray-400 hover:text-gray-500"
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <a
                      href={contest.url}
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

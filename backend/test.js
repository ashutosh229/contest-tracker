import { contestFetcher } from "./services/contestsFetcher.js";

const tester = async () => {
  const allContests = await contestFetcher();
  console.log(allContests);
};

tester();

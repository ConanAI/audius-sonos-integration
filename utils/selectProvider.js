import axios from "axios";

let provider;

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
async function setupProvider() {
  const host = await axios.get("https://api.audius.co").then((j) => {
    provider = sample(j.data["data"]);
  });

  console.log(provider);
}

export { setupProvider, provider };

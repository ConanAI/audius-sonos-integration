import axios from "../utils/axios.js";
import { provider } from "../utils/selectProvider.js";
async function runGetMedia(args, callback) {
  let trackId;
  if (args.id.includes("tr:")) {
    trackId = args.id.replace("tr:", "");
  } else {
    trackId = args.id;
  }
  console.log(args.id);
  const uri = `https://creatornode.audius.co/tracks/stream/${trackId}?app_name=Sonos+Bridge`;
  callback({
    getMediaURIResult: uri,
  });
}

export { runGetMedia };

import axios from "../utils/axios.js";
// result limiter
const limit = 30;

async function runSearch(args, callback) {
  const searchId = args.id;
  const searchTerm = args.term;
  // searches artists
  if (searchId === "artist") {
    const results = await axios.get(
      `users/search?query=${searchTerm}&app_name=Sonos+Bridge`
    );
    const data = results.data["data"].slice(0, limit);
    let formattedTracks = [];
    data.forEach((i) => {
      const pfpSect = i.profile_picture ?? {
        "480x480":
          "https://raw.githubusercontent.com/AudiusProject/audius-client/master/public/images/icon_192x192.png",
      };
      const constructor = {
        id: `ar:${i.id}`,
        title: i.name,
        itemType: "artist",
        albumArtURI: pfpSect["480x480"],
      };
      formattedTracks.push(constructor);
    });
    const returnConstructor = {
      searchResult: {
        index: 0,
        count: formattedTracks.length,
        total: formattedTracks.length,
        mediaCollection: formattedTracks,
      },
    };
    callback(returnConstructor);
    return;
  }

  // searches songs
  if (searchId === "track") {
    console.log("got track search", args);
    const results = await axios.get(
      `tracks/search?query=${searchTerm}&app_name=Sonos+Bridge`
    );
    const data = results.data["data"].slice(0, limit);
    console.log(data);
    let formattedTracks = [];
    data.forEach((i) => {
      const constructor = {
        id: `tr:${i.id}`,
        title: i.title,
        mimeType: "audio/mpeg",
        itemType: "track",
        trackMetadata: {
          duration: i.duration,
          artistId: `ar:${i.user.id}`,
          artist: i.user.name,
          albumArtURI: i.artwork["1000x1000"],
        },
      };
      formattedTracks.push(constructor);
    });
    const returnConstructor = {
      searchResult: {
        index: 0,
        count: formattedTracks.length,
        total: formattedTracks.length,
        mediaMetadata: formattedTracks,
      },
    };
    callback(returnConstructor);
    return;
  }
}

export { runSearch };

import axios from "../utils/axios.js";

// track GET limit
const limit = 15;
// "root" id data
const defaultConfig = {
  getMetadataResult: {
    index: 0,
    count: 1,
    total: 1,
    mediaCollection: [
      /*{
        id: "new",
        itemType: "container",
        title: "Just In (New)",
      },*/
      {
        id: "trending",
        itemType: "container",
        title: "Trending",
      },
    ],
  },
};

async function userSearch(id) {
  // get tracks
  const request = await axios.get(`/users/${id}/tracks?app_name=Sonos+Bridge`);
  const data = request.data["data"];
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
    getMetadataResult: {
      index: 0,
      count: formattedTracks.length,
      total: formattedTracks.length,
      mediaMetadata: formattedTracks,
    },
  };
  return returnConstructor;
}

// primary metadata sort func
async function runMeta(args, callback) {
  console.log("got meta req for:", args);
  const id = args.id ?? "error";
  if (id === "root") {
    console.log("got root req");
    callback(defaultConfig);
    return;
  }
  // resolve trending
  if (id === "trending") {
    const tracks = await axios.get("tracks/trending?app_name=Sonos+Bridge");
    const data = tracks.data["data"].slice(0, limit);
    // console.log(data);
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
      getMetadataResult: {
        index: 0,
        count: formattedTracks.length,
        total: formattedTracks.length,
        mediaMetadata: formattedTracks,
      },
    };
    callback(returnConstructor);
  }
  // resolve artist metadata
  if (id.includes("ar:")) {
    const resp = await userSearch(id.replace("ar:", ""));
    callback(resp);
  }
}

// gets extended media metadata
async function runMediaMeta(args, callback) {
  const trackId = args.id.replace("tr:", "");
  const track = await axios.get(`tracks/${trackId}?app_name=Sonos+Bridge`);
  const trackData = track.data["data"];
  const responseConstructor = {
    getMediaMetadataResult: {
      id: `tr:${trackData.id}`,
      itemType: "track",
      title: trackData.title,
      genre: trackData.genre,
      mimeType: "audio/mpeg",
      trackMetadata: {
        artistId: `ar:${trackData.user.name}`,
        artist: trackData.user.name,
        genre: trackData.genre,
        duration: trackData.genre,
        albumArtURI: trackData.artwork["1000x1000"],
        canPlay: true,
        canSkip: true,
        canAddToFavorites: true,
      },
    },
  };
  callback(responseConstructor);
}

export { runMeta, runMediaMeta };

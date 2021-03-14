import { runMeta, runMediaMeta } from "../workers/getMetadata.js";
import { runGetMedia } from "../workers/getMediaURI.js";
import { runSearch } from "../workers/search.js";
const Service = {
  Sonos: {
    SonosSoap: {
      getMetadata: runMeta,
      getMediaMetadata: runMediaMeta,
      getMediaURI: runGetMedia,
      search: runSearch,
    },
  },
};

export default Service;

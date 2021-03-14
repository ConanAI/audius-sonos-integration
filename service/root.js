import { runMeta, runMediaMeta } from "../workers/getMetadata.js";
import { runGetMedia } from "../workers/getMediaURI.js";
import { runSearch } from "../workers/search.js";
const myService = {
  Sonos: {
    SonosSoap: {
      getMetadata: runMeta,
      getMediaMetadata: runMediaMeta,
      getMediaURI: runGetMedia,
      search: runSearch,
      // This is how to define an asynchronous function with a callback.
      MyAsyncFunction: function (args, callback) {
        // do some work
        callback({
          name: args.name,
        });
      },

      // This is how to define an asynchronous function with a Promise.
      MyPromiseFunction: function (args) {
        return new Promise((resolve) => {
          // do some work
          resolve({
            name: args.name,
          });
        });
      },

      // This is how to receive incoming headers
      HeadersAwareFunction: function (args, cb, headers) {
        return {
          name: headers.Token,
        };
      },

      // You can also inspect the original `req`
      reallyDetailedFunction: function (args, cb, headers, req) {
        console.log(
          "SOAP `reallyDetailedFunction` request from " +
            req.connection.remoteAddress
        );
        return {
          name: headers.Token,
        };
      },
    },
  },
};

export default myService;

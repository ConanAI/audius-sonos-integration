import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import soap from "soap";
import helmet from "helmet";
import httpServer from "http";
import bodyParser from "body-parser";
import fs from "fs";

import appService from "./service/root.js";
import { setupProvider, provider } from "./utils/selectProvider.js";
const { PORT } = process.env ?? "3351";
const app = Express();
const http = httpServer.createServer(/* httpsCerts, */ app);

// gather soap defs
var xml = fs.readFileSync("./service/service.wsdl", "utf8");
// bootstrapping
app.use(helmet());
app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);
app.use(Express.static("static"));
// define express server
const startAsync = async () => {
  try {
    await setupProvider();
    console.log("selected provider:", provider);
    await http.listen(PORT);
    await soap.listen(http, "/wsdl", appService, xml);
    // log success
    console.log(`App is listening on port ${PORT}`);
  } catch (e) {
    console.error(e);
  }
};

startAsync();

app.get("/", (req, res) => {
  res.send("BaseAPI");
});

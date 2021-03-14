import axios from "axios";
import { provider } from "../utils/selectProvider.js";
const prov = provider ?? "https://discoveryprovider2.audius.co/";
const instance = axios.create({
  baseURL: `${prov}/v1` ?? "https://discoveryprovider2.audius.co/",
});

export default instance;

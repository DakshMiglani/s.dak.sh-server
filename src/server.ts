import * as express from "express";
import * as http from "http";
import * as helmet from "helmet";
import * as RateLimit from "express-rate-limit";
import router from "./routes";

const app = express();
const opts = { port: 4000 };
const Server = http.createServer(app);

app.use(helmet());
app.use(
  new RateLimit({
    windowMs: 10 * 1000 * 60, // 10 minute window
    max: 100, // 100 requests per windowMs
    delayMs: 0,
    message:
      "Too many requests created from this IP, please try again after 10 minutes."
  })
);

app.use("/", router);

export { Server, opts };

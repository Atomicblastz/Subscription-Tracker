import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;

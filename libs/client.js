import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "sample-site2525",
    apiKey: process.env.API_KEY,
});
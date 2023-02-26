/*
Hey, just in case you're wondering why this file is here,
it's because I want to track how many people visit my website.

I'm not doing anything with this data, I'm just curious to see how many people visit my website.
I'm not even storing the IP addresses, just the country of origin and the path that was visited.

Hope you understand!
*/

import { API_URL } from "../consts";
// const API_URL = "http://localhost:5000";

import type { CountryIsResponse } from "./Models/CountryIsResponse";
import type { VisitRequestBody } from "./Models/VisitRequestBody";

async function getIpLocation() {
  const response = await fetch("https://api.country.is/");
  return <CountryIsResponse>await response.json();
}

let sent = false;

export default async function sendAnalytics() {
  if (sent) {
    return;
  }

  const { country } = await getIpLocation();

  if (typeof country === "string" && country.length > 0) {
    const visitRequestBody: VisitRequestBody = {
      country,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      windowSize: `${window.innerWidth}x${window.innerHeight}`
    };

    // Send the analytics and forget about it
    await fetch(`${API_URL}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(visitRequestBody)
    });

    sent = true;
  }
}

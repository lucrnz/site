// import { API_URL } from "../consts";

// import type {
//   VisitRequestBody,
//   VisitRequestResponse
// } from "./Models/VisitRequest";

// export async function registerPageCount() {
//   const response = await fetch(`${API_URL}/visit`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       path: window.location.pathname
//     } as VisitRequestBody)
//   });

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   return <VisitRequestResponse>await response.json();
// }

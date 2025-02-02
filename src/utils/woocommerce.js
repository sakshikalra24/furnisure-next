import axios from "axios";
import Oauth from "oauth-1.0a";
import CryptoJS from "crypto-js";

const ck = "ck_2d38c1e1d3d2236111aa47ac16b2326183bdd640";
const cs = "cs_22b4ef1be51edc59fa1f2643072ed82ffda75b09";
const baseURL = "https://events.furnisure.me/wp-json/wc/v3";

function getOauth() {
  return Oauth({
    consumer: { key: ck, secret: cs },
    signature_method: "HMAC-SHA1",
    hash_function: function (base_string, key) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    },
  });
}

export default async function makeRequest(
  endpoint,
  method = "GET",
  body = {},
  page = 1,
  per_page = 100
) {
  const oauth = getOauth();
  let updatedEndpoint = endpoint.replace(/category=([^&?]*)\?/, "category=$1&");

  if (updatedEndpoint === "/products/categories") {
    updatedEndpoint = updatedEndpoint + `?per_page=${per_page}&page=${page}`;
  }
  if (updatedEndpoint.includes("/products?category")) {
    updatedEndpoint = updatedEndpoint + `&per_page=${per_page}&page=${page}`;
  }
  if (updatedEndpoint === "/products") {
    updatedEndpoint = updatedEndpoint + `?per_page=50&page=3`;
  }

  const requestData = {
    url: baseURL + updatedEndpoint,
    method,
    body,
  };

  try {
    // Use URLSearchParams to construct query string
    const urlWithParams = new URL(requestData.url);
    const params = new URLSearchParams(urlWithParams.search);

    // Add OAuth parameters to the query string
    const authParams = oauth.authorize(requestData);
    for (const [key, value] of Object.entries(authParams)) {
      params.append(key, value);
    }

    // Update URL with the serialized query parameters
    urlWithParams.search = params.toString();
    console.log("Request URL:", urlWithParams.href);

    const response = await axios({
      url: urlWithParams.href,
      method: requestData.method,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    // Log the response for debugging
    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    return response;
  } catch (error) {
    console.error(
      "Error in makeRequest:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to allow the calling function to handle it
  }
}

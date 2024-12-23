import axios from "axios";
export const apiToken =process.env.REACT_APP_API_TOKEN;
export const apiBaseUrl =process.env.REACT_APP_API_BASE_URL;

const clientId = process.env.REACT_APP_API_KEY;
const clientSecret = process.env.REACT_APP_API_SECRET;

let newApiToken = "";


// if yoy want to use the new token, you can use this function

const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    newApiToken = response.data.access_token;
    console.log(newApiToken);
  } catch (error) {
    console.log("error: ", error);
  }
};

getNewAccessToken();

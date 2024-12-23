import axios from "axios";
export const apiToken = "oyAPDkVAfaMAtEEcEahVwoKrq9i1 ";
export const apiBaseUrl =
  "https://test.api.amadeus.com/v2/shopping/flight-offers";

const clientId = "JYhudSr5t3kFAGxYNbg3ZpMaOfRqa3cB";
const clientSecret = "HNrtUcpKK3X7sHGy";

let newApiToken = "";

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
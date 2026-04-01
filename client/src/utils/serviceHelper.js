import { backendUrl } from "./config";

// UNAUTHENTICATED POST REQUEST
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED POST REQUEST
export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// UNAUTHENTICATED GET REQUEST
export const makeUnauthenticatedGETRequest = async (route) => {
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// AUTHENTICATED GET REQUEST
export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const url = backendUrl + route;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error submitting the form:", error);
    throw error;
  }
};

// get token
export const getToken = () => {
  const tokenName = "token";
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  const tokenCookie = cookies.find(cookie =>
    cookie.startsWith(tokenName + "=")
  );

  return tokenCookie ? tokenCookie.split("=")[1] : null;
};
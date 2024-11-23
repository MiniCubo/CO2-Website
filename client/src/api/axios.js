import axios from "axios";

const apiPath =
  process.env.NODE_ENV === "production"
    ? "https://co2-website.onrender.com" // Replace with your Render backend URL
    : "http://localhost:5000";

const instance = axios.create({
    baseURL: apiPath,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
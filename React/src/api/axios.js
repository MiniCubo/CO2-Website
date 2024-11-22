import axios from "axios";

var apiPath = "http://localhost:5000";

    if (process.env.NODE_ENV === "production") {
      apiPath = "/api";
    }

const instance = axios.create({
    baseURL: apiPath,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
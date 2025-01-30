import axios from "axios";
const API_URL = "http://localhost:5000/api/logs";


export const logAction = async (userId, action) => {
    try {
      // Send POST request with full API_URL
      await axios.post(API_URL, { userId, action });
      console.log("Action logged successfully");
    } catch (error) {
      console.error("Error logging action:", error);
    }
  };

  export const fetchLogs = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching logs:", error);
      return { logs: [] };
    }
  };
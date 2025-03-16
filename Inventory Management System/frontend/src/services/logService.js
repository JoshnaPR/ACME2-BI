import axios from "axios";
const API_URL = "https://breastintentionsdb.com/api/logs";

export const logAction = async (userId, action) => {
    try {     
      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }
  
      const objectIdPattern = /^[0-9a-fA-F]{24}$/;
      if (!objectIdPattern.test(userId)) {
        console.error("Invalid userId format:", userId);
        return;
      }
  
      console.log("Logging action:", action);
      await axios.post(API_URL, { userId, action });
      console.log("Action logged successfully");
    } catch (error) {
      console.error("Error logging action:", error);
    }
  };
  
  export const fetchLogs = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching logs:", error);
      return { logs: [] };
    }
  };

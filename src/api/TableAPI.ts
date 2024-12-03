import axios from "axios";
import { API_BASE_URL } from "../utils/Constant";

export const fetchTables = async (): Promise<string[] | undefined> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/tables`);
    return res.data.tables;
  } catch (error) {
    console.log("Error fetching tables", error);
  }
};

export const fetchTableData = async (tableName: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tables/${tableName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error("Error fetching table data:", error);
    return null;
  }
};

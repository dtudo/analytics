import axios from "axios";
import { HabitTrackerData } from "../types/HabitTrackerData";
import { convertDates } from "../utils/habit-tracker-utils";

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

export const fetchHabitTrackerData = async (): Promise<HabitTrackerData> => {
    try {
        console.log(`${API_URL}/habit-tracker-data`);
        const response = await axios.get(`${API_URL}/habit-tracker-data`);
        return convertDates(response.data);
    } catch (error) {
        console.error('Error fetching habit tracker data:', error);
        throw error;
    }
};

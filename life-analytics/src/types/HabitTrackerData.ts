export interface HabitTrackerEntry {
    date: Date;
    status: 'Yes' | 'No' | 'None';
}

export interface HabitData {
    habitName: string;
    habitTracker: HabitTrackerEntry[];
}

export interface HabitTrackerData {
    habitsData: HabitData[];
}

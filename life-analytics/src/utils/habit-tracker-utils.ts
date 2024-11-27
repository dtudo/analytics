import { DateRange } from "../types/DateRange";
import { HabitTrackerData, HabitTrackerEntry } from "../types/HabitTrackerData";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { enGB } from "date-fns/locale";

export const convertDates = (data: HabitTrackerData) => {
    data.habitsData.forEach(habit => {
        habit.habitTracker = habit.habitTracker.map(entry => ({
            ...entry,
            date: new Date(entry.date),
        }));
    });
    return data;
};

const filterByDateRange = (habitTracker: HabitTrackerEntry[], dateRange: DateRange) => {
    return habitTracker.filter(entry => {
        return entry.date >= dateRange.startDate && entry.date <= dateRange.endDate;
    });
};

const groupByWeek = (habitData: HabitTrackerEntry[]) => {
    const grouped: { [key: string]: HabitTrackerEntry[] } = {};

    habitData.forEach(entry => {
        const weekStart = startOfWeek(entry.date, { locale: enGB });
        const weekEnd = endOfWeek(entry.date, { locale: enGB });
        const weekKey = `${format(weekStart, 'dd MMM yyyy')} - ${format(weekEnd, 'dd MMM yyyy')}`;

        if (!grouped[weekKey]) {
            grouped[weekKey] = [];
        }

        grouped[weekKey].push(entry);
    });

    return grouped;
};

const groupByMonth = (habitData: HabitTrackerEntry[]) => {
    const grouped: { [key: string]: HabitTrackerEntry[] } = {};

    habitData.forEach(entry => {
        const monthKey = format(entry.date, 'MMM yyyy');

        if (!grouped[monthKey]) {
            grouped[monthKey] = [];
        }

        grouped[monthKey].push(entry);
    });

    return grouped;
};

const groupByQuarter = (habitData: HabitTrackerEntry[]) => {
    const grouped: { [key: string]: HabitTrackerEntry[] } = {};

    habitData.forEach(entry => {
        const quarter = getQuarter(entry.date);
        const year = entry.date.getFullYear();
        const quarterKey = `Q${quarter} ${year}`;

        if (!grouped[quarterKey]) {
            grouped[quarterKey] = [];
        }

        grouped[quarterKey].push(entry);
    });

    return grouped;
};

const getQuarter = (date: Date): number => {
    const month = date.getMonth();
    return Math.floor(month / 3) + 1;
};

const groupByYear = (habitData: HabitTrackerEntry[]) => {
    const grouped: { [key: string]: HabitTrackerEntry[] } = {};

    habitData.forEach(entry => {
        const yearKey = entry.date.getFullYear().toString();

        if (!grouped[yearKey]) {
            grouped[yearKey] = [];
        }

        grouped[yearKey].push(entry);
    });

    return grouped;
};

const calculateSuccessAndTotal = (groupedData: HabitTrackerEntry[]) => {
    let success = 0;
    let total = 0;

    groupedData.forEach(entry => {
        if (entry.status === 'Yes') {
            success++;
            total++;
        } else if (entry.status === 'No') {
            total++;
        }
    });

    return { success, total };
};

const generateLabels = (groupedData: { [key: string]: HabitTrackerEntry[] }, aggregation: string) => {
    return Object.keys(groupedData).map(groupKey => groupKey);
};

export const getHabitTrackerChartData = (habitTracker: HabitTrackerEntry[], aggregation: string, dateRange: DateRange) => {
    // Filter habit tracker entries by the date range
    const filteredData = filterByDateRange(habitTracker, dateRange);

    // Group data based on the aggregation type
    let groupedData: { [key: string]: HabitTrackerEntry[] } = {};
    switch (aggregation) {
        case 'week':
            groupedData = groupByWeek(filteredData);
            break;
        case 'month':
            groupedData = groupByMonth(filteredData);
            break;
        case 'quarter':
            groupedData = groupByQuarter(filteredData);
            break;
        case 'year':
            groupedData = groupByYear(filteredData);
            break;
        default:
            throw new Error(`Unsupported aggregation type: ${aggregation}`);
    }

    // Calculate success and total for each group
    const percentageData = Object.keys(groupedData).map(groupKey => {
        const { success, total } = calculateSuccessAndTotal(groupedData[groupKey]);
        return { success, total };
    });

    // Generate labels for each group
    const labels = generateLabels(groupedData, aggregation);

    return { percentageData, labels };
}

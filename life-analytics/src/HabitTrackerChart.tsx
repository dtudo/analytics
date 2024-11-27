import { useEffect, useState } from "react";
import { DEFAULT_CHART_THRESHOLD, TIME_AGGREGATION_OPTIONS } from "./constants/chart-constants";
import DatePicker from "./DatePicker";
import PercentageBarChart from "./PercentageBarChart";
import { DateRange } from "./types/DateRange";
import { HabitData, HabitTrackerData } from "./types/HabitTrackerData";
import { fetchHabitTrackerData } from "./services/life-analytics-service";
import Dropdown from "./Dropdown";
import { getHabitTrackerChartData } from "./utils/habit-tracker-utils";

interface HabitTrackerChartsProps {
    habitData: HabitData;
    aggregation: string;
    dateRange: DateRange;
}

const HabitTrackerCharts: React.FC<HabitTrackerChartsProps> = ({ habitData, aggregation, dateRange }) => {
    const { percentageData, labels } = getHabitTrackerChartData(habitData.habitTracker, aggregation, dateRange);

    return (
        <div
            style={{
                width: 'calc(50% - 42px)',
                backgroundColor: '#f0f0f0',
                padding: '16px',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <PercentageBarChart
                percentageData={percentageData}
                threshold={DEFAULT_CHART_THRESHOLD}
                labels={labels}
                title={`${habitData.habitName} - success rate`}
            />
        </div>
    );
};

export default HabitTrackerCharts;

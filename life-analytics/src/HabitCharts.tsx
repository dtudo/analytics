import { useEffect, useState } from "react";
import { TIME_AGGREGATION_OPTIONS } from "./constants/chart-constants";
import DatePicker from "./DatePicker";
import { DateRange } from "./types/DateRange";
import { HabitTrackerData } from "./types/HabitTrackerData";
import { fetchHabitTrackerData } from "./services/life-analytics-service";
import Dropdown from "./Dropdown";
import HabitTrackerCharts from "./HabitTrackerChart";

interface HabitChartsProps {
    dateRange: DateRange;
    updateDateRange: (newDateRange: DateRange) => void;
}

const HabitCharts: React.FC<HabitChartsProps> = ({ dateRange, updateDateRange }) => {
    const [habitTrackerData, setHabitTrackerData] = useState<HabitTrackerData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [aggregation, setAggregation] = useState<string>(TIME_AGGREGATION_OPTIONS[0].value);

    useEffect(() => {
        const getHabitTrackerData = async () => {
            try {
                const data = await fetchHabitTrackerData();
                setHabitTrackerData(data);
            } catch (error) {
                setError('Failed to load habit tracker data.');
            } finally {
                setIsLoading(false);
            }
        };

        getHabitTrackerData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!habitTrackerData) {
        return <div>No data available.</div>
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Dropdown updateSelectedValue={setAggregation} />
                <DatePicker dateRange={dateRange} updateDateRange={updateDateRange} />
            </div>

            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    rowGap: '16px',
                    justifyContent: 'space-between',
                }}
            >
                {habitTrackerData.habitsData.map((habit) => (
                    <HabitTrackerCharts
                        habitData={habit}
                        aggregation={aggregation}
                        dateRange={dateRange}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitCharts;

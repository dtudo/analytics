import React, { useState } from 'react';
import DatePicker from './DatePicker';
import { DateRange } from './types/DateRange';
import { DATE_RANGE_DEFAULT_VALUE } from './constants/app-constants';

const App: React.FC = () => {
  const [globalDateRange, setGlobalDateRange] = useState<DateRange>(DATE_RANGE_DEFAULT_VALUE);
  const [habitTrackerDateRange, setHabitTrackerDateRange] = useState<DateRange>(DATE_RANGE_DEFAULT_VALUE);
  const [photoGalleryDateRange, setPhotoGalleryTrackerDateRange] = useState<DateRange>(DATE_RANGE_DEFAULT_VALUE);

  const updateGlobalDateRange = (newDateRange: DateRange) => {
    setGlobalDateRange(newDateRange);
    setHabitTrackerDateRange(newDateRange);
    setPhotoGalleryTrackerDateRange(newDateRange);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Global Date Range</h3>
          <DatePicker dateRange={globalDateRange} updateDateRange={updateGlobalDateRange} />
        </div>
        <p>Start Date: {globalDateRange.startDate.toDateString()}</p>
        <p>End Date: {globalDateRange.endDate.toDateString()}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Habit Tracker Date Range</h3>
          <DatePicker dateRange={habitTrackerDateRange} updateDateRange={setHabitTrackerDateRange} />
        </div>
        <p>Start Date: {habitTrackerDateRange.startDate.toDateString()}</p>
        <p>End Date: {habitTrackerDateRange.endDate.toDateString()}</p>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Photo Gallery Date Range</h3>
          <DatePicker dateRange={photoGalleryDateRange} updateDateRange={setPhotoGalleryTrackerDateRange} />
        </div>
        <p>Start Date: {photoGalleryDateRange.startDate.toDateString()}</p>
        <p>End Date: {photoGalleryDateRange.endDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default App;

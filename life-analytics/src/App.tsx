import React, { useState } from 'react';
import DatePicker from './DatePicker';
import { DateRange } from './types/DateRange';
import { DATE_RANGE_DEFAULT_VALUE } from './constants/date-constants';
import HabitCharts from './HabitCharts';
import PhotoGallery from './PhotoGallery';

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
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <h4 style={{ marginRight: '5px' }}>Apply to all datepickers</h4>
        <DatePicker dateRange={globalDateRange} updateDateRange={updateGlobalDateRange} />
      </div>

      <HabitCharts dateRange={habitTrackerDateRange} updateDateRange={setHabitTrackerDateRange} />
      <PhotoGallery dateRange={photoGalleryDateRange} updateDateRange={setPhotoGalleryTrackerDateRange} />
    </div>
  );
};

export default App;

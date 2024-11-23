import React, { useEffect, useState } from 'react';
import { DateRange } from './types/DateRange';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { enGB } from 'date-fns/locale';
import { DEFAULT_STATIC_RANGES, DEFINEDS } from './constants/app-constants';
import { FaCalendarAlt } from 'react-icons/fa';

interface DatePickerProps {
  dateRange: DateRange;
  updateDateRange: (newDateRange: DateRange) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ dateRange, updateDateRange }) => {
  const [pickerDateRange, setPickerDateRange] = useState([
    {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      key: 'selection',
    },
  ]);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState(pickerDateRange);

  useEffect(() => {
    setPickerDateRange([
      {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        key: 'selection',
      },
    ]);

    setTempDateRange([
      {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        key: 'selection',
      },
    ]);
  }, [dateRange]);

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    if (!startDate || !endDate) {
      console.warn(`Start date or end date is undefined! Start Date: ${startDate}, End Date: ${endDate}`);
      return;
    }

    setPickerDateRange([{
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }]);
  };

  const handleApply = () => {
    setTempDateRange(pickerDateRange);
    setIsPickerOpen(false);

    updateDateRange({
      startDate: pickerDateRange[0].startDate,
      endDate: pickerDateRange[0].endDate
    });
  };

  const handleCancel = () => {
    setPickerDateRange(tempDateRange);
    setIsPickerOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <button
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        style={{
          marginLeft: 'auto',
          background: "white",
          border: "1px solid #ccc",
          padding: '10px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {`${tempDateRange[0].startDate.toLocaleDateString("en-GB", {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })} - ${tempDateRange[0].endDate.toLocaleDateString("en-GB", {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}`}
        <FaCalendarAlt />
      </button>

      {isPickerOpen && (
        <div
          style={{
            position: 'absolute',
            top: "100%",
            right: "0",
            zIndex: 1000,
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '8px',
          }}
        >
          <DateRangePicker
            ranges={pickerDateRange}
            onChange={handleRangeChange}
            inputRanges={[]}
            staticRanges={DEFAULT_STATIC_RANGES}
            months={2}
            direction="horizontal"
            locale={enGB}
            maxDate={DEFINEDS.endOfLastWeek}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              padding: '10px 20px',
              borderTop: '1px solid #ddd',
              background: '#f9f9f9',
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
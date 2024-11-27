import DatePicker from "./DatePicker";
import { DateRange } from "./types/DateRange";

interface PhotoGalleryProps {
    dateRange: DateRange;
    updateDateRange: (newDateRange: DateRange) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ dateRange, updateDateRange }) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <DatePicker dateRange={dateRange} updateDateRange={updateDateRange} />
            </div>
        </div>
    );
};

export default PhotoGallery;

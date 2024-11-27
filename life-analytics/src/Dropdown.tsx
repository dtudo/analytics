import Select from 'react-select';
import { TIME_AGGREGATION_OPTIONS } from "./constants/chart-constants";

type DropdownProps = {
    updateSelectedValue: (newSelectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ updateSelectedValue }) => {
    const handleChange = (selectedOption: { value: string; label: string } | null) => {
        if (selectedOption) {
            updateSelectedValue(selectedOption.value);
        }
    };

    return (
        <Select
            options={TIME_AGGREGATION_OPTIONS}
            onChange={handleChange}
            defaultValue={TIME_AGGREGATION_OPTIONS[0]}
            placeholder="Aggregation"
        />
    );
}

export default Dropdown;

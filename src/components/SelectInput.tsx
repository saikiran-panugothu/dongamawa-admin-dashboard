import { nanoid } from "nanoid";

interface SelectInputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    selectList: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string; 
    name: string; // Add name to the props
}

const SelectInput: React.FC<SelectInputProps> = ({ selectList, onChange, value, name }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Call the onChange handler, passing the event
        if (onChange) {
            onChange(e); // Pass the original event
        }
    };

    return (
        <select 
            value={value} 
            onChange={handleSelectChange} 
            className="w-full h-10 dark:bg-blackPrimary bg-white border border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 pl-3 pr-8 cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
            name={name} // Ensure name is set on the select element
        >
            <option value="" disabled>Select...</option>
            {selectList.map(({ value: itemValue, label }) => (
                <option key={nanoid()} value={itemValue}>
                    {label}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;

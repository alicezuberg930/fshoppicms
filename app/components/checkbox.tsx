const Checkbox: React.FC<{ id?: number, value: boolean, updateValue: (v: boolean) => void }> = ({ id, value = false, updateValue }) => {

    // handle checkbox change
    const handleChange = () => {
        updateValue(!value);
    };

    return (
        <input type="checkbox" id={`${id}-checkbox`} checked={value} onChange={handleChange} />
    );
};

export default Checkbox
import "@/public/css/switch.css"

const CustomSwitch: React.FC<{ setEnable: (v: boolean) => void }> = ({ setEnable }) => {
    return (
        <label className="switch">
            <input type="checkbox" onChange={(e) => { setEnable(e.target.checked) }} />
            <span className="slider round" ></span>
        </label>
    )
}

export default CustomSwitch
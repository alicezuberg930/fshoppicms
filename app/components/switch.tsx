import "@/public/css/switch.css"

const Switch: React.FC<{ setEnable: (v: boolean) => void }> = ({ setEnable }) => {
    return (
        <label className="switch">
            <input type="checkbox" onChange={(e) => {
                setEnable(e.target.checked)
            }} />
            <span className="slider round" ></span>
        </label>
    )
}

export default Switch
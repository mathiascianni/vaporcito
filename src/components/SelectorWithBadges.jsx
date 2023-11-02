import { Input } from "./_index";
const SelectorWithBadges = ({ title, inputValues, name, handleChange, setArray, badges, limit = false, checkboxes }) => {
    
    return (
        <>
            <p className="pl-4 mb-1">{title}</p>

            <div className="overflow-y-scroll max-h-[150px] capitalize">
                {inputValues.map((val) => (
                    <Input key={val.id} type="checkbox" name={name} id={name+val.id} value={val.name} checkboxes={checkboxes} change={() => handleChange(badges, setArray, val.code, name+val.id)} />
                ))}
            </div>
            {
                badges.length > 0 &&
                <div className="w-full flex gap-1 my-2 flex-wrap">
                    {badges.map((badge) => (
                        <div key={badge} className="text-xs border border-primary px-2 py-1 rounded-full text-center uppercase">{ limit ? badge.slice(0, 3) : badge}</div>
                    ))}
                </div>
            }
        </>
    );
}

export default SelectorWithBadges;

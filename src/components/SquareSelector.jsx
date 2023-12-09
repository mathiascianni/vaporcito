import { Input } from "./_index";
const SquareSelector = ({ name, content, checkboxes, handleChange, title, toggle }) => {

    return (
        <div className="pl-4">
            <p className="mb-1">{title}</p>

            <Input 
                type="square"
                name={name}
                id={name}
                value={content}
                checkboxes={checkboxes}
                change={() => handleChange(!toggle)}
                checked={toggle} />

        </div>
    );
}

export default SquareSelector;

import { AiOutlineCloudUpload } from "react-icons/ai";
const Input = ({ children, name, type = "text", placeholder, change, value, id, checked }) => {
    const labelStyles = "pl-4 mb-1";
    const inputStyles = "bg-input px-4 py-2 rounded-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary";

    if (type === "file") {
        return (
            <div className="flex flex-col justify-center w-full mb-4">
                <p className="pl-4 mb-1">{children}</p>
                <label htmlFor={id} className="w-full bg-input p-4 rounded-md border border-dashed hover:border-white border-input-light cursor-pointer hover:bg-input-light transition group text-input-light flex items-center justify-center flex-col">
                    <AiOutlineCloudUpload className="text-4xl text-input-light group-hover:text-white transition" />
                    <span className="group-hover:text-white transition">Haz click para subir una imágen</span>
                    <input type="file" onChange={change} id={id} className="hidden" />
                </label>
            </div>
        )
    }

    if (type === "checkbox") {
        return (
            <div className="inline-flex bg-input w-full">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    className="hidden peer"
                    onChange={change}
                    value={id}
                />
                <label htmlFor={id} className="w-full peer-checked:bg-primary hover:bg-input-light transition peer-checked:text-white pl-4 p-2 cursor-pointer">{value}</label>
            </div>
        )
    }

    return (
        <div className="inline-flex flex-col w-full">
            <label htmlFor={id} className={labelStyles}>{children}</label>
            <input
                placeholder={placeholder ? placeholder : `Escribe tu ${children}`}
                value={value}
                type={type}
                id={id}
                name={name}
                className={inputStyles}
                onChange={change}
            />
        </div>
    )

}

export default Input;
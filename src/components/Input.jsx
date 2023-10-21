const Input = ({ children, name, type = "text", placeholder, change, value }) => {
    const labelStyles = "pl-4";
    const inputStyles = "bg-input px-4 py-2 rounded-full mb-2 focus:outline-none focus:ring-2 focus:ring-primary";

    return (
        <div className="inline-flex flex-col">
            <label htmlFor={children} className={labelStyles}>{children}</label>
            <input
                placeholder={placeholder ? placeholder : `Escribe tu ${children}`}
                value={value}
                type={type}
                id={children}
                name={name}
                className={inputStyles}
                onChange={change}
            />
        </div>
    )

}

export default Input;
import React from "react";

const TextArea = ({ children, name, type = "text", placeholder, change, value }) => {
    return (
        <div className="inline-flex flex-col w-full">
            <label htmlFor={children} className="pl-4 mb-1">Descripción</label>
            <textarea
                placeholder={placeholder ? placeholder : `Escribe tu ${children}`}
                type={type}
                id={children}
                name={name}
                onChange={change}
                defaultValue={value}
                className="bg-input w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] max-h-[300px]">
            </textarea>
        </div>
    );
}

export default TextArea;

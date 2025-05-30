import React, { useState } from "react";
import "./inputTextStyle.css";

export const InputText = ({ label_name, error, onChange, required, placeholder, value, name }) => {

    const handleChange = (event) => {
        onChange && onChange(event); // Llama a la función onChange pasada como prop
    };

    return (
        <div className="input-div">
            <label htmlFor="">
                {label_name}
                {required && <span className="requerido">(requerido)</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                name={name}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
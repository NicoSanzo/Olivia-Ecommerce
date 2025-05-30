import React from "react";
import "./inputNumberStyle.css";

export const InputNumber = ({ label_name, medicion, error, onChange, required, value, name }) => {

    const handleNumberChange = (event) => {
        onChange && onChange(event); // Llama a la función onChange pasada como prop
    };

    return (
        <div className="input-div-number">
            <label htmlFor="">
                {label_name}
                {required && <span className="requerido"> (requerido)</span>}
            </label>
            <div className="data">
                <input
                    type="number"
                    step="0.01"
                    value={value}
                    onChange={handleNumberChange}
                    name={name}
                />
                <h2>{medicion}</h2>
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};
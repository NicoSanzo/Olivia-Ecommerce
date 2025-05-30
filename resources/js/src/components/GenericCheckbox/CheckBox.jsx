import React, { useState } from 'react';
import './CheckBoxStyle.css'; // Archivo CSS para los estilos personalizados
import { UseMetodosDePago } from '../../pages/PaginasPublicas/PageCarrito/components/MetodosDePago/useMetodosDePago';

export const CustomCheckbox = ({label, value}) => {


  const [checked, setChecked] = useState(false);
  
  const handleCheckboxChange = () => {
    const newChecked = !checked
    setChecked(newChecked);
    value(newChecked)
  };

  return (
    <>
    <div className="checkbox-container">
      <input 
        type="checkbox" 
        id="customCheckbox" 
        checked={checked} 
        onChange={handleCheckboxChange} 
      />
      <label htmlFor="customCheckbox">{label}</label>
    </div>
    </>
  );
}

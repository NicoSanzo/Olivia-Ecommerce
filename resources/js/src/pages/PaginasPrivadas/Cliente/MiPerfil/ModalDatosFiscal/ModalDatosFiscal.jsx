import React, { useEffect, useState } from 'react';
import '../ModalModDatosStyle.css';
import { useFormDataUserValidation } from '../../../../../hooks/FormDataUserValidation'; //Hook que tiene las validaciones de los input
import { useFetch } from '../../../../../hooks/PedidoFetchGenerico';
import { LoadingComponente } from '../../../../../components/GenericLoadingComponent/LoadingComponent';
import { GenericExitoso } from '../../../../../components/GenericExitoso/GenericExitoso';

export const ModalDomFis = ({isOpen ,onClose ,data ,ActualizarPagina}) => {
    
        
    const [formValues, setFormValues] = useState({});
    const [FORMDATA,setFORMDATA]=useState(null);
    const [triggerFetchmod,setTriggerFectchMod]=useState(false);
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            setFormValues({
                direccion_fis: data[0].direccion_fis || '',  
                localidad_fis: data[0].localidad_fis || '',
                provincia_fis: data[0].provincia_fis || '',
                codigo_postal_fis: data[0].codigo_postal_fis || '',
            });
        }
        setSubmitted(false);
    }, [data,onClose]);
                

    const {errors,validate} = useFormDataUserValidation(formValues,submitted,onClose);
 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {

            const formData = new FormData();

            Object.keys(formValues).forEach((key) => {
              formData.append(key, formValues[key]);
            });    

            setFORMDATA(formData);  
            setTriggerFectchMod(true);     
        }

        setSubmitted(true);
      };
      


      const {data:modi_data,loading:loading_modi,error:error_modi}=useFetch("api/modi_dom_fis.php","POST",FORMDATA,triggerFetchmod);



      useEffect(() => {
        if(modi_data && modi_data.data) {
            
            setIsSubmittedSuccessfully(true);
        }
        setTriggerFectchMod(false);
      }, [modi_data]);

      
    const handleCloseModal = () => {
    
    onClose();
    setIsSubmittedSuccessfully(false); 
    ActualizarPagina(true);
    
    };
      
 

  if (!isOpen) return null;

  return (
    <>
     {isSubmittedSuccessfully && <GenericExitoso Leyenda={"¡Cambios realizados correctamente!"} isSuccess={isSubmittedSuccessfully} onClose={handleCloseModal} />}
    <div className="modal-mod">
      <div className="mod-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
  
        <div className="Data-user-Modal">

          <form  onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Direccion</label>
              <input 
                type="text" 
                name="direccion_fis" 
                value={formValues.direccion_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.direccion_fis}</div>
            </div> 
  
            <div className="input-container">
              <label>Localidad</label>
              <input 
                type="text" 
                name="localidad_fis" 
                value={formValues.localidad_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.localidad_fis}</div>
            </div>
            
            <div className="input-container">
              <label>Provincia</label>
              <input 
                type="text" 
                name="provincia_fis" 
                value={formValues.provincia_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.provincia_fis}</div>
            </div>
            
  
            <div className="input-container">
              <label>Codigo Postal</label>
              <input 
                type="number" 
                name="codigo_postal_fis" 
                value={formValues.codigo_postal_fis} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.codigo_postal_fis}</div>
            </div>
            
            
            <div className='loading-component'> {loading_modi && <LoadingComponente width={20} height={20}/>}</div>
            <button className="Envio-Modi-button" type="submit">MODIFICAR</button>
            
          </form >
          
        </div>
      </div>
      
    </div>
    

   
</>
  );
  
};

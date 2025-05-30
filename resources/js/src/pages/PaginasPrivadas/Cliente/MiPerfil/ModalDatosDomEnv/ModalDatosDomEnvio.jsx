import React, { useEffect, useState } from 'react';
import '../ModalModDatosStyle.css';
import { useFormDataUserValidation } from '../../../../../hooks/FormDataUserValidation'; //Hook que tiene las validaciones de los input
import { useFetch } from '../../../../../hooks/PedidoFetchGenerico';
import { LoadingComponente} from '../../../../../components/GenericLoadingComponent/LoadingComponent';
import { GenericExitoso } from '../../../../../components/GenericExitoso/GenericExitoso';

export const ModalDomEnv = ({isOpen ,onClose ,data ,ActualizarPagina}) => {
    
        
    const [formValues, setFormValues] = useState({});
    const [FORMDATA,setFORMDATA]=useState(null);
    const [triggerFetchmod,setTriggerFectchMod]=useState(false);
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [submitted, setSubmitted] = useState(false);
 


    useEffect(() => {
        if (data && data.length > 0) {
            setFormValues({
                direccion_env: data[0].direccion_env || '',  
                localidad_env: data[0].localidad_env || '',
                provincia_env: data[0].provincia_env || '',
                codigo_postal_env: data[0].codigo_postal_env || '',
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
      


      const {data:modi_data,loading:loading_modi,error:error_modi}=useFetch("api/modi_dom_env.php","POST",FORMDATA,triggerFetchmod);


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
                name="direccion_env" 
                value={formValues.direccion_env} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.direccion_env}</div>
            </div> 
  
            <div className="input-container">
              <label>Localidad</label>
              <input 
                type="text" 
                name="localidad_env" 
                value={formValues.localidad_env} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.localidad_env}</div>
            </div>
            
            <div className="input-container">
              <label>Provincia</label>
              <input 
                type="text" 
                name="provincia_env" 
                value={formValues.provincia_env} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.provincia_env}</div>
            </div>
            
  
            <div className="input-container">
              <label>Codigo Postal</label>
              <input 
                type="number" 
                name="codigo_postal_env" 
                value={formValues.codigo_postal_env} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.codigo_postal_env}</div>
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

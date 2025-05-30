import React, { useEffect, useState } from 'react';
import '../ModalModDatosStyle.css';
import { useFormDataUserValidation } from '../../../../../hooks/FormDataUserValidation'; //Hook que tiene las validaciones de los input
import { useFetch } from '../../../../../hooks/PedidoFetchGenerico';
import { LoadingComponente} from '../../../../../components/GenericLoadingComponent/LoadingComponent';
import { GenericExitoso } from '../../../../../components/GenericExitoso/GenericExitoso';

export const ModalCambioPass = ({isOpen ,onClose ,data ,ActualizarPagina}) => {
    
        
    const [formValues, setFormValues] = useState({});
    const [FORMDATA,setFORMDATA]=useState(null);
    const [triggerFetchmod,setTriggerFectchMod]=useState(false);
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            setFormValues({
                contraseña_actual:  '', 
                contraseña_nueva: '', 
                repetirContraseñaNueva: '',
                     
            });
        }
        setSubmitted(false);
    }, [onClose]);
                

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
      

      const {data:modi_data,loading:loading_modi,error:error_modi}=useFetch("api/modi_contraseña.php","POST",FORMDATA,triggerFetchmod);
      //console.log(modi_data)
      //console.log(error_modi)

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
            <div className="input-container mail">
              <label>Contraseña Actual</label>
              <input 
                type="password" 
                name="contraseña_actual" 
                value={formValues.contraseña_actual} 
                onChange={handleChange} 
              />
              <div className="error-msg">{ modi_data && (
                  
                    modi_data.contraseña_incorrecta
                  )}</div>
            </div> 
  
            <div className="input-container">
              <label>Nueva Contraseña</label>
              <input 
                type="password" 
                name="contraseña_nueva" 
                value={formValues.contraseña_nueva} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.contraseña_nueva}</div>
            </div>
            
            <div className="input-container">
              <label>Repetir Contraseña</label>
              <input 
                type="password" 
                name="repetirContraseñaNueva" 
                value={formValues.repetirContraseñaNueva} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.repetirContraseñaNueva}</div>
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

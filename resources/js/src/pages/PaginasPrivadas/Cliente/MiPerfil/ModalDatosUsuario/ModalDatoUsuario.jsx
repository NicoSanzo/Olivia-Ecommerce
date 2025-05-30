import React, { useEffect, useState } from 'react';
import '../ModalModDatosStyle.css';
import { useFormDataUserValidation } from '../../../../../hooks/FormDataUserValidation'; //Hook que tiene las validaciones de los input
import { useFetch } from '../../../../../hooks/PedidoFetchGenerico';
import { LoadingComponente } from '../../../../../components/GenericLoadingComponent/LoadingComponent';
import { GenericExitoso } from '../../../../../components/GenericExitoso/GenericExitoso';

export const ModalDatoUsuario = ({isOpen ,onClose ,data ,ActualizarPagina}) => {
    
        
    const [formValues, setFormValues] = useState({});
    const [FORMDATA,setFORMDATA]=useState(null);
    const [triggerFetchmod,setTriggerFectchMod]=useState(false);
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            setFormValues({
                nombre: data[0].nombre || '',  
                apellido: data[0].apellido || '',
                mail: data[0].mail || '',
                usuario: data[0].username || '',
                dni: data[0].dni || '',
                celular: data[0].celular || '',
                fecha_nacimiento: data[0].fecha_nacimiento || '',
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
        //console.log(validationErrors)
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
      


      const {data:modi_data,loading:loading_modi,error:error_modi}=useFetch("api/modi_usuario.php","POST",FORMDATA,triggerFetchmod);


      useEffect(() => {
        //console.log(modi_data); // Añade esto para verificar la respuesta.
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
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={formValues.nombre} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.nombre}</div>
            </div>
            
  
            <div className="input-container">
              <label>Apellido</label>
              <input 
                type="text" 
                name="apellido" 
                value={formValues.apellido} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.apellido}</div>
            </div>
            
  
            <div className="input-container mail">
              <label>Mail</label>
              <input 
                type="email" 
                name="mail" 
                value={formValues.mail} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.mail}</div>
            </div>
            
  
            <div className="input-container">
              <label>Usuario</label>
              <input 
                type="text" 
                name="usuario" 
                value={formValues.usuario} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.usuario}</div>
            </div>
            
  
            <div className="input-container">
              <label>DNI</label>
              <input 
                type="number" 
                name="dni" 
                value={formValues.dni} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.dni}</div>
            </div>
            
  
            <div className="input-container">
              <label>Celular</label>
              <input 
                type="number" 
                name="celular" 
                value={formValues.celular} 
                onChange={handleChange} 
              />
               <div className="error-msg">{errors.celular}</div>
            </div>
           
  
            <div className="input-container">
              <label>Fecha de Nacimiento</label>
              <input 
                type="date" 
                name="fecha_nacimiento" 
                value={formValues.fecha_nacimiento} 
                onChange={handleChange} 
              />
              <div className="error-msg">{errors.fecha_nac}</div>
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


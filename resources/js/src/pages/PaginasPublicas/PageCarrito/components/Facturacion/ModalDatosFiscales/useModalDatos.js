import React, { useEffect, useState } from 'react';
import { useFormDataUserValidation } from '../../../../../../hooks/FormDataUserValidation';
import { useFetch } from '../../../../../../hooks/PedidoFetchGenerico';


export const useModalDatos = ({isOpen ,onClose ,data ,ActualizarPagina} ) => {
    
        
    const [formValues, setFormValues] = useState({});
    const [FORMDATA,setFORMDATA]=useState(null);
    const [triggerFetchmod,setTriggerFectchMod]=useState(false);
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    

    useEffect(() => {
        if (data && data.data) {
            setFormValues({
                direccion_fis: data.data.direccion || '',  
                localidad_fis: data.data.localidad || '',
                provincia_fis: data.data.provincia || '',
                codigo_postal_fis: data.data.codigo_postal || '',
            });
        }  
        setSubmitted(false);
    }, [data]);
       


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
      
 

  return { 
    formValues ,
    handleChange,
    handleSubmit, 
    errors,
    loading_modi,
    isSubmittedSuccessfully,
    handleCloseModal

  }

}
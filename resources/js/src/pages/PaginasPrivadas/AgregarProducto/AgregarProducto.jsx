import React, { useEffect, useState,useRef } from "react";
import "./AgregarProductoStyle.css";
import { InputText } from "./components/InputText/inputText";
import { InputNumber } from "./components/inputSelect/inputNumber";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";
import { Selects } from "./components/SelectMarca/Selects";
import { ImageUploader } from "./components/AgregarImagen/AgregarImagen";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { VentanaModal } from "../../../components/GenericModal/VentanaModal";
import { GenericExitoso } from "../../../components/GenericExitoso/GenericExitoso";



export const AgregarProducto = () => {
   
 
    const [formValues, setFormValues] = useState({
        titulo: "",
        precio: "",
        stock: "",
        modelo: "",
        alto: "",
        ancho: "",
        profundidad: "",
        descripcion: "",
        peso: "",
        color: "",
        marca_id: "",
        categoria_id: "",
        imagenes: "",           
    });

    const [errors, setErrors] = useState({});
    const [errorEnvio, setErrorEnvio] = useState(false);
    const [errorServidor, setErrorServidor] = useState(false);
    const [triggerfetch, setTriggerfetch] = useState(false);
    const principal_container = useRef(null)
    const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío

    const[FORMDATA,SetFormData]=useState({data:[]});
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false); 
    const [isSuccess, setIsSuccess]=useState(false);
   
    
    // Validaciones del formulario
    const validate = () => {
        const newErrors = {};

        if (!formValues.titulo) {
            newErrors.titulo = "* El título es requerido";
        } else if (formValues.titulo.length > 70) {
            newErrors.titulo = "* Hasta 70 caracteres";
        }

        if (!formValues.precio) {
            newErrors.precio = "* El precio es requerido";
        } else if (formValues.precio > 9999999) {
            newErrors.precio = "* Hasta $999999";
        } else if (formValues.precio <= 0) {
            newErrors.precio = "Debe ser mayor a 0";
        }
        

        if (!formValues.stock) {
            newErrors.stock = "* El stock es requerido";
        } else if (formValues.stock > 1000) {
            newErrors.stock = "* Hasta 999";
        } else if (formValues.stock <= 0) {
            newErrors.stock = "Debe ser mayor a 0";
        }

        if (!formValues.modelo) {
            newErrors.modelo = "* El modelo es requerido";
        } else if (formValues.modelo.length > 25) {
            newErrors.modelo = "* Debe contener hasta 25 caracteres";
        }

        if (!formValues.imagenes) {
            newErrors.imagen = "* La imagen es requerida";
        } else if (formValues.imagenes.length > 10){
            newErrors.imagen = "* Hasta 10 imágenes";
        }

        const medidas = [formValues.alto, formValues.ancho, formValues.profundidad, formValues.peso];
        medidas.forEach((value) => {
            if (value > 1000) {
                newErrors.medidas = "* Hasta 999,99";
            } else if (value < 0) {
                newErrors.medidas = "Debe ser mayor a 0";
            }
        });

        if (formValues.color.length > 25) {
            newErrors.color = "* Debe contener hasta 25 caracteres";
        }

        if (formValues.descripcion.length > 10000) {
            newErrors.descripcion = "* Debe contener hasta 10000 caracteres";
        }

        if (!formValues.categoria_id) {
            newErrors.categoria = "* Seleccione una categoría";
        }

        if (!formValues.marca_id) {
            newErrors.marca = "* Seleccione una marca";
        }
        return newErrors;
    };

  
    

    useEffect(() => {
        

        if (isSubmittedSuccessfully===true ) return;

        const newErrors = validate(formValues);
        
        if (submitted) { // Solo valida si ya se ha intentado enviar  
        setErrors(newErrors);  
            if (Object.keys(newErrors).length === 0) {

                principal_container.current.style.borderColor = "";
                setErrorEnvio(false)
            } else {
                principal_container.current.style.borderColor = "red";
                setErrorEnvio(true)
            }
        }
        
    }, [formValues]); 



    // Manejador de cambios en los inputs
    const handleChange = (event) => {
        
    const { name, value } = event.target || event;
        setFormValues((prev) => ({
            ...prev,
            [name]: value           
        }));    

        
    };
    
   //console.log(formValues.imagenes)

    // Manejo del submit del formulario
    const handleSubmit = (event) => {

        event.preventDefault();
        setSubmitted(true);
        const validationErrors = validate();


        if (Object.keys(validationErrors).length === 0) {
        
            const formData = new FormData();
            
            Object.keys(formValues).forEach((key) => {
                if (key === "imagenes" && Array.isArray(formValues[key])) {
                    // Si es el array de imágenes, recorrerlo y agregar cada archivo
                    formValues[key].forEach((file, index) => {
                        formData.append(`imagenes[]`, file); // Enviar como array
                    });
                } else {
                    formData.append(key, formValues[key]);
                }
            });


            SetFormData(formData);
            setTriggerfetch(true);  
          
        } else {
            setErrors(validationErrors);
            setErrorEnvio(true);
            principal_container.current.style.borderColor = "red";
            
        }   
        
    };

    
    
    const {data, loading:loading_confirmar, error } = useFetch('/api/alta_publicaciones.php', 'POST', FORMDATA, triggerfetch);

    console.log(data)
   

    useEffect(() => {
        
        if (data && data.success && !error) {
            setIsSubmittedSuccessfully(true); // Marca como exitoso el envío
            setFormValues({
              titulo: "",
              precio: "",
              stock: "",
              modelo: "",
              alto: "",
              ancho: "",
              profundidad: "",
              descripcion: "",
              peso: "",
              color: "",
              marca_id: "",
              categoria_id: "",
              imagenes: "",
            });
            setIsSuccess(true);
            setErrorServidor(false); 
        }

        if(data && data.error)
          {setErrorServidor(true)}

        if (triggerfetch) {
            setTriggerfetch(false);   
        }  

    }, [data, error, triggerfetch]);

    const handleCloseModal = () => {
        setIsSuccess(false); // Cierra el modal de "agregado exitoso" cuando se presiona "OK"
      };

    return (
        <>
        {loading_confirmar && 
            <VentanaModal Abierto={loading_confirmar}  >
                  <LoadingComponente width={45} height={45}/>
            </VentanaModal>}
        {<GenericExitoso isSuccess={isSuccess}  onClose={handleCloseModal} Leyenda={"¡Producto Agregado Con Exito!"}/>}
          
        <form onSubmit={handleSubmit} className="principal-container-agregar" ref={principal_container}>
            <h2 className="titulo-principal">Agregar Publicacion</h2>

            <div className="div-titulo-publi">
                <InputText
                    label_name={"Título"}
                    value={formValues.titulo}
                    error={errors.titulo}
                    onChange={handleChange}
                    required={true}
                    placeholder={"Hasta 70 caracteres"}
                    name="titulo"
                />
            </div>

            <h2>Fotos</h2>
            <div className="foto-container">
                <span className="requerido"> (Requerido)</span>
                <ImageUploader
                    onChange={handleChange}
                    name="imagen"
                    error={errors.imagen}
                />
            </div>

            <h2>Publicación</h2>
            <div className="Caracteristicas-publicacion">
                <InputNumber
                    label_name={"Precio"}
                    medicion={"$"}
                    value={formValues.precio}
                    error={errors.precio}
                    onChange={handleChange}
                    required={true}
                    name="precio"
                />
                <InputNumber
                    label_name={"Stock"}
                    medicion={"unidades"}
                    value={formValues.stock}
                    error={errors.stock}
                    onChange={handleChange}
                    required={true}
                    name="stock"
                />
                <Selects
                    valueCat={formValues.categoria_id}
                    valueMar={formValues.marca_id}
                    onChange={handleChange}
                    ErrorCat={errors.categoria}
                    ErrorMarca={errors.marca}
                />
                
            </div>

            <h2>Especificaciones</h2>
            <div className="Especificaciones">
                <InputText
                    label_name={"Modelo"}
                    value={formValues.modelo}
                    error={errors.modelo}
                    onChange={handleChange}
                    required={true}
                    name="modelo"
                />
                <InputText
                    label_name={"Color"}
                    value={formValues.color}
                    error={errors.color}
                    onChange={handleChange}
                    name="color"
                />
                <InputNumber
                    label_name={"Alto"}
                    medicion={"cm"}
                    value={formValues.alto}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="alto"
                />
                <InputNumber
                    label_name={"Ancho"}
                    medicion={"cm"}
                    value={formValues.ancho}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="ancho"
                />
                <InputNumber
                    label_name={"Profundidad"}
                    medicion={"cm"}
                    value={formValues.profundidad}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="profundidad"
                />
                <InputNumber
                    label_name={"Peso"}
                    medicion={"kg"}
                    value={formValues.peso}
                    error={errors.medidas}
                    onChange={handleChange}
                    name="peso"
                />
            </div>

            <h2>Descripción</h2>
          
                <textarea
                    className="Descripcion"
                    value={formValues.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese una descripcion..."
                    name="descripcion"
                />
            
            {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}

            <div className="div-button">
                <button className="botton-submit-agregar" type="submit">AGREGAR</button>
            </div>
            {errorEnvio && <div className="Verificar-Campos"> * VERIFIQUE LOS CAMPOS</div>}
            {errorServidor && <div className="Verificar-Campos"> {data.error} <br></br>* Contáctese con soporte para mas información * </div>}
        </form>
        
        
           
        </>
    );
    
}


import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";

export const useModificarPublicacion = ({itemKey,onClose, onSuccess }) => {
    
    
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
            id_publicacion: "",
            codigo_producto: ""     
        });
    
        const [errors, setErrors] = useState({});
        const [triggerfetch, setTriggerfetch] = useState(false);
        
        const principal_container = useRef(null)
        const [submitted, setSubmitted] = useState(false); // Estado para controlar el envío
        const [errorEnvio, setErrorEnvio] = useState(false);
        const[FORMDATA,SetFormData]=useState({data:[]});
        const { data: data_rellenar, loading: loading_relleno, error: error_relleno } = useFetch("api/fetch_publicaciones.php", "POST", { itemKey }, true);
    
        
    
        // Cargar los datos en el formulario al recibir la respuesta
        useEffect(() => {
            if (data_rellenar && data_rellenar.data) {
                const data = data_rellenar.data[0];
                setFormValues({
                    titulo: data.titulo,
                    precio: data.precio.replace(",", "."),
                    stock: data.stock,
                    modelo: data.modelo,
                    alto: data.alto || "",
                    ancho: data.ancho || "",
                    profundidad: data.profundidad || "",
                    descripcion: data.descripcion || "",
                    peso: data.peso || "",
                    color: data.color || "",
                    marca_id: data.marca_id,
                    categoria_id: data.categoria_id,
                    imagenes: data.imagenes || [],
                    id_publicacion: data.id_publicacion,
                    codigo_producto:  data.codigo_producto
                });
            }
        }, [data_rellenar]);


    
        
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
            } else if (formValues.stock < 0) {
                newErrors.stock = "Debe ser mayor o igual a 0";
            }
    
            if (!formValues.modelo) {
                newErrors.modelo = "* El modelo es requerido";
            } else if (formValues.modelo.length > 25) {
                newErrors.modelo = "* Debe contener hasta 25 caracteres";
            }
    
            if (!formValues.imagenes || formValues.imagenes.length === 0) {
                newErrors.imagen = "* La imagen es requerida";
            } else if (formValues.imagenes.length > 10) {
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
    
            if (formValues.color!= null ){
                if (formValues.color.length > 25) {
                    newErrors.color = "* Debe contener hasta 25 caracteres";
                }
            }
            
            if (formValues.descripcion!= null ){
                if(formValues.descripcion.length > 10000 ) {
                    newErrors.descripcion = "* Debe contener hasta 10000 caracteres";
                }
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
            const newErrors = validate(formValues);
            setErrors(newErrors);
    
           
            if (principal_container.current) {
                if (Object.keys(newErrors).length > 0) {
                    principal_container.current.style.borderColor = "red";
                } else {
                    principal_container.current.style.borderColor = "";
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
        

        const handleSubmit = (event) => {
            event.preventDefault();
            setSubmitted(true);
            const validationErrors = validate();
        
            if (Object.keys(validationErrors).length === 0) {
                const formData = new FormData();
                const old_images_info = []; // Para almacenar los datos de imágenes con URLs
        
                Object.keys(formValues).forEach((key) => {
                    if (key === "imagenes" && Array.isArray(formValues[key])) {
                        formValues[key].forEach((item,index) => {
                            if (item instanceof File) {
                                // Si es un archivo, lo agregamos a FormData
                                formData.append("new_images[]", item);
                                formData.append("new_images_index[]", index); // Guardamos el índice correspondiente
                            } else if (typeof item === "object" && item.image_url) {
                                // Si es un objeto con una URL, lo guardamos en la lista
                                old_images_info.push({
                                    id: item.id,
                                    id_publicacion: item.id_publicacion,
                                    image_url: item.image_url,
                                    image_name: item.image_name,
                                    index_imagen: index
                                });
                            }
                        });
        
                        // Si hay imágenes con URL, enviarlas en JSON
                        if (old_images_info.length > 0) {
                            formData.append("old_images_info", JSON.stringify(old_images_info));
                        }
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
    
        const { data, loading:loading_confirmar, error } = useFetch('api/controllers/publicaciones/modi_publicaciones.php', 'POST', FORMDATA, triggerfetch);

         
        useEffect(() => {
            if (data ) {
                if(data.data==true){
                    onClose();
                    onSuccess()
                }
            }
            console.log(data)
        }, [data]);
    
    
        useEffect(() => {
            if (triggerfetch) {
                setTriggerfetch(false);
            }

            console.log(error)
        }, [data, error, triggerfetch]);


        return ({

            errors,
            formValues,
            handleChange,
            handleSubmit,
            errorEnvio,
            loading_relleno,
            submitted,
            loading_confirmar,
            principal_container

        })
};


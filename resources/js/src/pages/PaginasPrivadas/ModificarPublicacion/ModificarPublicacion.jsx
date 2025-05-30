import React from "react";
import "./ModificarPublicacionStyle.css";
import { InputText } from "./components/InputText/inputText";
import { InputNumber } from "./components/inputSelect/inputNumber";
import { Selects } from "./components/SelectMarca/Selects";
import {ImageUploaderModificar} from "./components/AgregarImagen/ImageUploaderModificar"
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";
import { useModificarPublicacion } from "./useModifiicarPublicacion";


export const ModificarPublicacion = ({ itemKey, onClose ,onSuccess }) => {


    const {errors,
        formValues,
        handleChange,
        errorEnvio,
        loading_relleno,
        submitted,
        loading_confirmar,
        handleSubmit,
        principal_container,
     } = useModificarPublicacion({itemKey, onClose, onSuccess})


 return (
        <>
        {loading_relleno ? <LoadingComponente width={65} height={65}/>:
        submitted &&  loading_confirmar? <LoadingComponente width={65} height={65}/> :
        <form onSubmit={handleSubmit} className="principal-container-modificar" ref={principal_container}>
            <h2 className="titulo-principal">Modificar Publicación</h2>

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

            <h2>Foto</h2>
            <div className="foto-container">
                <span className="requerido"> (Requerido)</span>
                <ImageUploaderModificar
                    imagenes={formValues.imagenes}
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

            <h2 className="description-text">Descripción</h2>
            <div className="div-descripcion">
                <textarea
                    className="Descripcion"
                    value={formValues.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese una descripcion..."
                    name="descripcion"
                />
            </div>
            {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}

            <div className="div-button">
                <button className="botton-submit" type="submit">MODIFICAR</button>
            </div>
            {errorEnvio && <div className="Verificar-Campos"> * VERIFIQUE LOS CAMPOS</div>}
        </form>
        
        }
           
        </>
    );
    
}
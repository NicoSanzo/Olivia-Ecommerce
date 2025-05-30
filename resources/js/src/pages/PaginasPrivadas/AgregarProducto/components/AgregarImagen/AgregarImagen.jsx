import "./AgregarImagenPublicacionesStyle.css";

import { useAgregarImagenNuevaPublicacion } from "./useAgregarImagenNuevaPublicacion";

export const ImageUploader = ({ onChange, error }) => {


    const {imagesToLoad,
        previewImages,
        fileInputRef,
        errorCantidadImagenes,
        getImageStyle,
        ContainerImageStyle,
        handleImageChange,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleRemoveImage} = useAgregarImagenNuevaPublicacion(onChange);

    return (
        <>
        <div className="principal-agregar-imgane-container">
            <div className="image-upload-agregar-publicaciones">
                <label className="label-imagen-agregar-publicaciones">
                    <span>+</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                        ref={fileInputRef}
                    />
                </label>
            </div>
        { previewImages.length !==0 &&
            <div className="image-preview-agregar-publicaciones">
                {previewImages.map((img, index) => (
                 <div className="select-image-container"  key={index} style={{
                    ...ContainerImageStyle(index),
                    display: 'flex',
                    flexDirection:'column',
                    position:'relative',
                    transition: 'transform 0.6s ease',
                    alignItems:"center"
                }}>  
                    <div 
                        key={index} 
                        className="Image-container-nueva-publicacion"
                        style={{
                            ...getImageStyle(index),
                         
                            
                            

                        }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(index, e)}
                        onDragEnd={handleDragEnd}
                    >
               
                        <button 
                            className="remove-button" 
                            type="button" 
                            onClick={() => handleRemoveImage(index)}
                        >
                            ✖
                        </button>
                        <div className="imagen-number" > {index +1}</div>
    
                        <img 
                            src={img} 
                            alt="vista previa" 
                            className="draggable-image"
                            draggable 
                            
                        />
                        
                    </div>
                    {index==0 && <div className="imagen-portada-agregar-publicaciones"> PORTADA</div>}
                </div> 
                ))}
            </div>
        }
           
        </div>
        {imagesToLoad.length > 0 && (
                <span className="message-cantidad-imagenes">
                    {error} * Imágenes: {imagesToLoad.length}
                </span>
            )}
            {error && <span className="error-message">{error}</span>}
            {errorCantidadImagenes && <span className="error-message">{errorCantidadImagenes}</span>}
        </>
    );
};



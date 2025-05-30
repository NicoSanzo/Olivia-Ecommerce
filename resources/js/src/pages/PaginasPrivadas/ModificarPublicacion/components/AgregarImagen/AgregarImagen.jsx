import React, { forwardRef, useEffect, useState } from 'react';
import './AgregarImagenStyle.css';

export const ImageUploader = ({ onChange, error, imagenes }) => {

    const [imageToview, setImagetoview] = useState(null);
       
    useEffect(() => {
        if(imagen instanceof File){
            const imageURL = URL.createObjectURL(imagen);
            setImagetoview(imageURL);
        }
        else{
        setImagetoview(imagen);
    }   // Actualizar imagen si ya está definida
    }, [imagen]);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];  // Obtienes el archivo seleccionado
        if (selectedImage && selectedImage.type.startsWith('image/')) {
            onChange({ name: "imagen", value: selectedImage });
        } 
    };

const handleRemoveImage = () => {
    setImagetoview(null);
    onChange && onChange({ name: "imagen", value: null }); // Pasamos null al componente padre si se elimina la imagen
};

    return (
        <div className="image-upload">
            <label className="custom-label-mod-pub">
                <span>Selecciona una imagen</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                 
                />
            </label>

            {imageToview && (
                <div className="image-container-mod-pub">
                    <button className="remove-button" onClick={handleRemoveImage}>
                        ✖
                    </button>
                    <img src={imageToview} alt="vista previa" />
                </div>
            )}

            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

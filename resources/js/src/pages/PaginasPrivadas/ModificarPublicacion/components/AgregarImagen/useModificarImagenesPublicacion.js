import { useState, useRef, useCallback, useEffect} from "react";
import "./AgregarImagenPublicacionesStyle.css";

export function useAgregarImagenNuevaPublicacion ({onChange, imagenes})  {

          
        
         const [imagesToLoad, setImagesToLoad] = useState([]); // Usar las imágenes del servidor si existen
         const [previewImages, setPreviewImages] = useState([]);
        const fileInputRef = useRef(null);
        const [errorCantidadImagenes, setErrorCantidadImagenes] = useState(null);
        
        const dragItem = useRef(null);
        const dragOverItem = useRef(null);
        const [dragState, setDragState] = useState({
            isDragging: false,
            draggedIndex: null,
            targetIndex: null
        });

    
        useEffect(() => {
            if (imagenes && imagenes.length > 0) {
                const serverImageUrls = imagenes.map(img => 
                    img instanceof File ? URL.createObjectURL(img) : img.image_url
                );
                setPreviewImages(serverImageUrls);
                setImagesToLoad(imagenes);
            }
        }, [imagenes]);

const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
        const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
        const nuevasImagenes = [...imagesToLoad, ...selectedFiles];

        if (nuevasImagenes.length <= 10) {
            setImagesToLoad(nuevasImagenes);
            setPreviewImages((prev) => [...prev, ...imageUrls]);

            onChange && onChange({ name: "imagenes", value: nuevasImagenes });
            setErrorCantidadImagenes(null);
        } else {
            setErrorCantidadImagenes("* Hasta 10 imágenes");
        }
    }
};
       
        
    
        const handleRemoveImage = (index) => {
            const updatedFiles = imagesToLoad.filter((_, i) => i !== index);
            const updatedPreviews = previewImages.filter((_, i) => i !== index);
    
            setImagesToLoad(updatedFiles);
            setPreviewImages(updatedPreviews);
    
            onChange && onChange({ name: "imagenes", value: updatedFiles });
    
            if (updatedFiles.length < 10) {
                setErrorCantidadImagenes(null);
            }
        };
    
        const swapImages = useCallback((draggedIndex, targetIndex) => {
            const newImages = [...imagesToLoad];
            const newPreviews = [...previewImages];
    
            // Swap the images and preview images
            [newImages[draggedIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[draggedIndex]];
            [newPreviews[draggedIndex], newPreviews[targetIndex]] = [newPreviews[targetIndex], newPreviews[draggedIndex]];
    
            setImagesToLoad(newImages);
            setPreviewImages(newPreviews);
            onChange && onChange({ name: "imagenes", value: newImages });
        }, [imagesToLoad, previewImages, onChange]);
    
        const handleDragStart = (index) => {
            dragItem.current = index;
            setDragState({
                isDragging: true,
                draggedIndex: index,
                targetIndex: null
            });
        };
    
        const handleDragOver = (index, e) => {
            e.preventDefault();
            
            // If dragging over a different image, swap immediately
            if (index !== dragState.draggedIndex && dragState.draggedIndex !== null) {
                swapImages(dragState.draggedIndex, index);
                
                // Update drag state to reflect the new positions
                setDragState(prev => ({
                    ...prev,
                    draggedIndex: index,
                    targetIndex: index
                }));
    
                dragItem.current = index;
                dragOverItem.current = null;
            }
        };
    
        const handleDragEnd = (e) => {
            e.preventDefault();
            // Reset drag state
            setDragState({
                isDragging: false,
                draggedIndex: null,
                targetIndex: null
            });
    
            dragItem.current = null;
            dragOverItem.current = null;
        };
    
        const getImageStyle = (index) => {
            const { isDragging, draggedIndex, targetIndex } = dragState;
    
            
            if (!isDragging) return {};
            
    
            // If it's the dragged item, hide the image and show the border
            if (index === draggedIndex) {
                return { 
                    opacity: '0',  // Hide the image during drag
                    zIndex: '10',  // Bring the dragged image to the top layer
                      
                };
            }
    
            // Apply smooth translation to the target image
            if (index === targetIndex) {
    
                return {
                    transform: `translateX(${(draggedIndex - targetIndex) * 100}px)`, // Move horizontally based on swap
                    transition: 'transform 0.3s ease', // Smooth transition for the swap
                    position: "relative",
                };
            }
            return {};
        };
    
        const ContainerImageStyle = (index) => {
            const { isDragging, draggedIndex, targetIndex } = dragState;
            
            if (!isDragging) return {};
    
            // If it's the dragged item, hide the image and show the border
            if (index === draggedIndex) {
                return { 
                    border: '2px dashed pink',  // Border to show the empty space
                    zIndex: 10,  // Bring the dragged image to the top layer
                    borderRadius:"10px",
                    backgroundColor:"#f5daeb",   
                                
                };
            }
            
          
            if (index === targetIndex) {
                return {
                    transform: `translateX(${(draggedIndex - targetIndex) * 100}px)`, // Move horizontally based on swap
                };
            }
            return {};
        };

    return (
        {
        imagesToLoad,
        previewImages,
        fileInputRef,
        errorCantidadImagenes,
        getImageStyle,
        handleImageChange,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleRemoveImage,
        ContainerImageStyle
        }
    )
    
};
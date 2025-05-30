import React, { useEffect, useRef, useState } from "react";
import "./Agenda3dStyle.css";
import {Ring} from "./components/Ring/ring"
import CheckedImage from "../../assets/Checked_icon.svg";
import Add_icon from "../../assets/Plus_icon.svg";

export const Agenda3d = () => {
  const Changeposition = useRef(null);
  const [rotarX, SetrotarX] = useState(330);
  const [rotarY, SetrotarY] = useState(0);
  const [isDragging, setIsDragging] = useState(false); //Pregunta si se esta moviendo el diseño
  const initialX = useRef(0);
  const initialY= useRef(0);

  useEffect(() => {
    if (Changeposition.current) {
      Changeposition.current.style.transform = `rotateX(${rotarY}deg) rotateY(${rotarX}deg)`;
    }
  }, [rotarX,rotarY]);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    initialX.current = e.clientX; // e es un parametro que se crea al iniciar el evento, clientX guarda la cordeenada del eje x donde estaba posicionada
    initialY.current= e.clientY;
    e.preventDefault(); // Prevenir selección de texto
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialX.current;
      const deltaY = e.clientY - initialY.current;
      SetrotarX((prev) => (prev + deltaX));
      SetrotarY((prev) => (prev + deltaY));
      initialX.current = e.clientX; // Actualiza la posición inicial
      initialY.current = e.clientY; 
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const Rings = Array.from({length:15}, (_,index)=><Ring key={index}/>);
 /*es un método de JavaScript que crea una nueva instancia de un array a partir de un objeto iterable*/
  


 /****************** AGREGAR y QUITAR DE IMAGENES A LA PARTE TRASERA Y DELANTERA ************************* */

 const[frontImage,setImagefront] = useState(null);
 const put_front_image = useRef (null);
 const inputFrontImage = useRef (null);
 const labelFrontImage = useRef (null);
 const ImageDeleteFront = useRef (null);

 const CambiarImagenFrente = (event) => {
  const file = event.target.files[0]; // Obtén el primer archivo seleccionado
  if (file) {
    setImagefront(URL.createObjectURL(file)); // Usamos URL.createObjectURL para crear una URL válida
  }
};
 useEffect(() => {
  if (frontImage == null) {
      put_front_image.current.style.backgroundImage = "none";
  } else { 
      put_front_image.current.style.backgroundImage = `url(${frontImage})`;
      labelFrontImage.current.style.backgroundImage = `url(${CheckedImage})`;
      labelFrontImage.current.style.transition = "0.3s ease-in-out";
      ImageDeleteFront.current.style.display = "block";
  }
},[frontImage]);

const frontImageDelete =()=>{
  put_front_image.current.style.backgroundImage = "none";
  labelFrontImage.current.style.backgroundImage = `url(${Add_icon})`;
  ImageDeleteFront.current.style.display = "none";
  inputFrontImage.current.value = null;
};


const [backImage,SetBackImage] =useState(null)
const labelBackimage = useRef (null)
const inputBackImage =useRef (null);
const put_back_image =useRef (null);
const ImageDeleteBack =useRef (null);


const CambiarImagenDorso =(event)=>{
  const file= event.target.files[0];
  if(file){ SetBackImage(URL.createObjectURL(file))}
  
}
  
  useEffect(()=>{
    if(backImage==null){
      put_back_image.current.style.backgroundImage ="none"}
    else{
      labelBackimage.current.style.backgroundImage=`url(${CheckedImage})`;
      labelBackimage.current.style.transition="0.3s ease-in-out";
      put_back_image.current.style.backgroundImage = `url(${backImage})`;
      ImageDeleteBack.current.style.display="block";
    };
  },[backImage])


  const BackImageDelete =()=>{
    labelBackimage.current.style.backgroundImage=`url(${Add_icon})`;
    put_back_image.current.style.backgroundImage = "none";
    ImageDeleteBack.current.style.display="none";
    inputBackImage.current.value=null;
  }


  return (
    <div
      className="Principal"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Detiene el arrastre si el mouse sale del área
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // Cambia el cursor al arrastrar
    >

      <div className="Agenda" ref={Changeposition}>
          <div className="Front" ref={put_front_image}></div>
          <div className="Side Pattern">
             {Rings}
          </div>
          <div className="Back" ref={put_back_image}></div>
          <div className="Pages Pattern"></div>
          <div className="Pages-top Pattern"></div>
          <div className="Pages-bottom Pattern"></div>
      </div>

      <div className="add-principal-container">
            <div className="frontContainer">
               <label htmlFor="addFrontImage" ref={labelFrontImage}></label>
               <div className="ImageDeleteFront" ref={ImageDeleteFront} onClick={frontImageDelete}></div>
               <h2>Agregar Frente</h2>
               <input type="file" className="add-front" id="addFrontImage" ref={inputFrontImage} onChange={CambiarImagenFrente}/>
            </div>
            <div className="backContainer">
              <label htmlFor="addBackImage" ref={labelBackimage}></label>
               <div className="ImageDeleteBack" ref={ImageDeleteBack} onClick={BackImageDelete} ></div>
               <h2>Agregar Dorso</h2>
              <input type="file" className="add-back" id="addBackImage" ref={inputBackImage} onChange={CambiarImagenDorso}/>
            </div>
      </div>

    </div>
  );
};
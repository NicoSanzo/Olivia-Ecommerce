import React, {useEffect,useRef} from 'react';
import {useState} from 'react';
import "./Carrousel_Style.css";



export function Carrousel({ImagenesCarrousel,autoslide})
{   
    var widthImg= 100 / ImagenesCarrousel.length;
    const pointsRef = useRef([]);
    const carouselRef= useRef(null);
    const[displacemente_size_width,Set_sizeWith]=useState(0);
    const[displacement_image_counter,SetCounter]=useState(0);

    
    //console.log(displacemente_size_width);
   // console.log(displacement_image_counter);

    const handleClick_next=()=>{ 
        displacement_image_counter == (ImagenesCarrousel.length-1) ? (SetCounter(0), Set_sizeWith(0)) :
        (SetCounter(displacement_image_counter+1),Set_sizeWith(displacemente_size_width + widthImg));          
    };
    const handleClick_back=()=>{    
        displacement_image_counter == 0 ? (SetCounter(ImagenesCarrousel.length-1),Set_sizeWith(widthImg * (ImagenesCarrousel.length-1))): 
        (SetCounter(displacement_image_counter - 1 ), Set_sizeWith(displacemente_size_width - widthImg));     
    }

    useEffect(()=>{
        carouselRef.current.style.width = `${100 * ImagenesCarrousel.length}%`;
    },[])


    useEffect(() => {
        if (carouselRef.current){
            carouselRef.current.style.transform = `translate(-${displacemente_size_width}%)`;
            carouselRef.current.style.transition = 'all ease .6s';
        }
    }, [displacemente_size_width]);

   
    useEffect(() => {
        pointsRef.current.forEach((point, index) => {
            if (point) {
                point.style.backgroundColor = index === displacement_image_counter ? 'pink' : 'white';
            }
        });
    }, [displacement_image_counter, ImagenesCarrousel.length]);


    useEffect(() => {
        if(autoslide){
            const interval = setInterval(handleClick_next, 3000);
            return () => clearInterval(interval);
            }
    }, [displacement_image_counter]);
          
    return (
        <>
            <div id="carrousel-images">
            {
                <div id="carrouseles" ref={carouselRef} > 
                    
                    {ImagenesCarrousel.map(imagenes=>{ 
                    return <div  className="images" key={imagenes.id}>
                                <img src= {imagenes.src}  alt="Loading..." loading="lazy"/>
                            </div>                                                      
                    })}
                </div>    
             }
             </div>
             <div id="visual-points">{
                  ImagenesCarrousel.map((point,index)=>{
                      return <div 
                                  className="image-points" 
                                  key={point.id} 
                                  ref={(el) => (pointsRef.current[index] = el)}>
                            </div>
                  })}
              </div>
             <button id="back-arrow" onClick={handleClick_back}></button> 
             <button id="next-arrow" onClick={handleClick_next}></button>        
        </>                     
    )
}

 

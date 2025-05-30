import React, { useEffect, useState } from 'react';
import Uploadfile from "../../../../../../../../assets/upload_icon.svg"
import checkedicon from "../../../../../../../../assets/success.svg"
import PdfIcon from "../../../../../../../../assets/pdf_icon.svg"
import "./SubirArchivosStyle.css";
import { UseSubirArchivo } from './useSubirArchivo';
import { LoadingComponente } from '../../../../../../../../components/GenericLoadingComponent/LoadingComponent';

export const SubirArchivo = (numero_operacion) => {

   const {handleRemovefile,
    handlefileChange,
    fileToview,
    fileType,
    fileName,
    serverFile,
    subirComprobante,
    loading_data_file,
    loading_upload_data_file,
    data_upload_file}=UseSubirArchivo(numero_operacion)

    return (
    <>
        {loading_data_file? <LoadingComponente width={30} height={30}/>:
        <div className='principal-container-upload-datos'>
    
            <div className='boton-descripcion-upload-container' >
                
                 { serverFile? 
                <div>
                    <div className='mensaje-exitoso'>
                        <img src={checkedicon} alt="upload icon" className='image' />
                        <span>Comprobante cargado con exito</span>    
                    </div>   
                </div>
                 : !serverFile && !fileToview?
                 <>
                     <div className="file-upload">
                        <label className="custom-label">
                            <img src={Uploadfile} alt="upload icon" className='image' />
                            <input
                                type="file"
                                accept="image/*,application/pdf"  // Aceptamos imágenes y PDFs
                                onChange={handlefileChange}
                                className="file-input"
                            />
                        </label>        
                     </div> 
                     <span>Cargar Comprobante</span>
                     
                </> 
                   :
                <>
                    <button className='save-button' onClick={subirComprobante}> Guardar</button>  
                    {loading_upload_data_file && <LoadingComponente height={20} width={20}/>}  
                </>   
                 }  
                  
            </div>
                {fileToview && 
                <div className='principal-file-container' >
                    <div className="file-container">
                        <button className="remove-button" onClick={handleRemovefile}>
                            ✖
                        </button>
                        {fileType === 'image' ? (

                            <div >
                                <a className='image-container-comprobante' href={fileToview} target="_blank">
                                    <img src={fileToview} alt="vista previa"  />
                                    <p>{fileName}</p> {/* Mostramos el nombre del archivo (título) */}
                                </a>
                            </div>
                        ) : (
                            <div>
                                <a className="pdf-preview" href={fileToview} download={fileName} rel="noopener noreferrer">
                                    <img src={PdfIcon} alt="PDF icon" className="pdf-icon" />                
                                    <p>{fileName}</p>
                                </a> {/* Mostramos el nombre del archivo (título) */}
                            </div>
                        )}

                    </div>
                    {data_upload_file && data_upload_file.error &&
                    <span className='error-msg'>* {data_upload_file.error}</span>
                    }
                </div>
                
                    
                }
            
        
        </div>
     } 
     </>  
    );
};

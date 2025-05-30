import React, { useEffect, useState } from 'react';
import Uploadfile from "../../../../../../../assets/upload_icon.svg"
import checkedicon from "../../../../../../../assets/success.svg"
import PdfIcon from "../../../../../../../assets/pdf_icon.svg"
import "./SubirFacturaStyle.css";
import { UseSubirFactura } from './useSubirFactura';
import { LoadingComponente } from '../../../../../../../components/GenericLoadingComponent/LoadingComponent';

export const SubirFactura = (ventaDetail) => {

   const {handleRemovefile,
    handlefileChange,
    fileToview,
    fileName,
    serverFile,
    subirfactura,
    showError,
    loading_data_file,
    loading_upload_data_file,
    data_upload_file}=UseSubirFactura(ventaDetail)

    return (
    <>
        {loading_data_file? <LoadingComponente width={30} height={30}/>:
        <div className='principal-container-upload-factura-detalle-venta'>
    
            <div className='boton-descripcion-upload-container-factura-detalle-venta' >
                
                 {serverFile? 
                <div>
                    <div className='mensaje-exitoso-factura-detalle-venta'>
                        <img src={checkedicon} alt="upload icon" className='image-factura-detalle-venta' />
                        <span>Factura cargado con exito</span>    
                    </div>   
                </div>
                 : !serverFile && !fileToview?
                 <>
                    <span>Cargar Factura</span>
                     <div className="file-upload">
                        <label className="custom-label">
                            <img src={Uploadfile} alt="upload icon" className='image-factura-detalle-venta' />
                            <input
                                type="file"
                                accept="application/pdf"  // Acepta PDFs
                                onChange={handlefileChange}
                                className="file-input-factura-detalle-venta"
                            />
                        </label>        
                     </div> 
                     
                     
                </> 
                   :
                <>
                    <button className='save-button-factura-detalle-venta' onClick={subirfactura}> Subir Factura</button>  
                    {loading_upload_data_file && <LoadingComponente height={20} width={20}/>}  
                </>   
                 }  
                  
            </div>
                {fileToview && 
                <div className='principal-file-container-factura-detalle-venta' >
                    <div className="file-container-factura-detalle-venta">
                        <button className="remove-button-factura-detalle-venta" onClick={handleRemovefile}>
                            ✖
                        </button>   
                            <div>
                                <a className="pdf-preview-factura-detalle-venta" href={fileToview} download={fileName} rel="noopener noreferrer">
                                    <img src={PdfIcon} alt="PDF icon" className="pdf-icon-factura-detalle-venta" />                
                                    <p>{fileName}</p>
                                </a> {/* Mostramos el nombre del Factura (título) */}
                                { showError &&
                                    <span className='error-msg-factura-detalle-venta'>* {data_upload_file.error}</span>
                                }
                            </div>
                          
                    </div>
                    
                </div>
                
                    
                }
            
        
        </div>
     } 
     </>  
    );
};

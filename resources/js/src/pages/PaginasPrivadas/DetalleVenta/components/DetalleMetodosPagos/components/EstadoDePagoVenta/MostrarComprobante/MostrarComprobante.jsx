
import PdfIcon from "../../../../../../../../assets/pdf_icon.svg"
import "./MostrarComprobanteStyle.css";
import { useMostrarComprobante } from './useMostrarComprobante';
import { LoadingComponente } from '../../../../../../../../components/GenericLoadingComponent/LoadingComponent';

export const MostrarComprobante = ({ventaDetail,comprobante}) => {
 
   const {    
    fileToview,
    fileType,
    fileName,
    loading_data_file,
    }=useMostrarComprobante(ventaDetail,comprobante)

    return (
    <>
        {loading_data_file? <LoadingComponente width={30} height={30}/>:
             
                fileToview ? 
                <div className='principal-comprobante-venta-container' >
                    <div className="file-comprobante-venta-container">
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
                   
                           
                </div>  
                :
                <p className="sin-comprobante"> <strong>No se cargaron comprobantes</strong></p>

        }
     </>  
    );
};

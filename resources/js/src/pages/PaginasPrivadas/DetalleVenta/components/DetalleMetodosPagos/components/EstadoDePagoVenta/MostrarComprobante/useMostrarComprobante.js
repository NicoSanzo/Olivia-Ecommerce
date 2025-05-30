import { useEffect, useState } from "react";




export function useMostrarComprobante (ventaDetail,comprobante) {

    const [fileToview, setfiletoview] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [serverFile,setServerFile] =useState(null);
    const [fileName, setFileName] = useState("");  // Estado para el nombre del archivo
  

    useEffect(() => {
        if (comprobante && comprobante.file ) {
            const fileURL = comprobante.file; // Creamos la URL para el archivo
            
            // Verificar el tipo de archivo
            if (comprobante.type.startsWith('image/')) {
                setFileType('image');
                setServerFile(comprobante.file)
                setfiletoview(`data:${comprobante.type};base64,${fileURL}`);
                setFileName(`comprobante-#${ventaDetail.data.numero}-${ventaDetail.data.cliente.nombre}-${ventaDetail.data.cliente.apellido}`);
            } else if (comprobante.type === 'application/pdf') {
                setFileType('pdf');
                setfiletoview(`data:application/pdf;base64,${fileURL}`);
                setServerFile(comprobante.file)
                setFileName(`comprobante-#${ventaDetail.data.numero}-${ventaDetail.data.cliente.nombre}-${ventaDetail.data.cliente.apellido}`);
            }
           
        }    
    }, [comprobante]);

    return (
        {
            fileToview,
            fileType,
            fileName,
            serverFile,
        }               
    )
}

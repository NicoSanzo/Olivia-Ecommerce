import { useEffect, useState } from "react";
import { useFetch } from "../../../../../../../../hooks/PedidoFetchGenerico";



export function UseSubirArchivo({numero_operacion}) {

    const [file, setFile] = useState(null);
    const [fileToview, setfiletoview] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [serverFile,setServerFile] =useState(null);
    const [fileName, setFileName] = useState("");  // Estado para el nombre del archivo
    const [triggerTraerComprobante, settriggerTraerComprobante] = useState(true); 
    const [triggerSubirComprobante, settriggersubirComprobante] = useState(false); // Estado para el nombre del archivo
    
    const [FORMDATA,setFORMDATA]=useState(null)

    useEffect(() => {
        settriggerTraerComprobante(true)
    }, []);

    const {data:data_file,loading:loading_data_file,error}=useFetch("/api/fetch_comprobante_pago.php", "POST" ,{numero_operacion}, triggerTraerComprobante )
    const {data:data_upload_file,loading:loading_upload_data_file,error:error_upload_file}=useFetch("/api/subir_comprobante_pago.php", 'POST' , FORMDATA, triggerSubirComprobante )


    useEffect(() => {
        settriggerTraerComprobante(false)
        if (data_file && data_file.data) {
            const fileURL = data_file.data; // Creamos la URL para el archivo
            // Guardamos el nombre del archivo
            
            // Verificar el tipo de archivo
            if (data_file.type.startsWith('image/')) {
                setFileType('image');
                setServerFile(data_file.data)
                setfiletoview(`data:${data_file.type};base64,${fileURL}`);
                setFileName("Ver comprobante");
            } else if (data_file.type === 'application/pdf') {
                setFileType('pdf');
                setfiletoview(`data:application/pdf;base64,${fileURL}`);
                setServerFile(data_file.data)
                setFileName("Ver comprobante");
            }
            
        }    
    }, [data_file]);



    const handlefileChange = (event) => {
      
        const selectedfile = event.target.files[0]; 
        setFile(selectedfile); // Este set obtiene el archivo tipo File para pasarselo al formdata que se envia en el fetch
        if (selectedfile) {
            const fileURL = URL.createObjectURL(selectedfile); // Crea la Url para visualizar la vista previa
            setFileName(selectedfile.name); // Guarda el nombre del archivo para mostrarlo despues
            
            // Verificar el tipo de archivo
            if (selectedfile.type.startsWith('image/')) {
                setFileType('image');
                setfiletoview(fileURL);
            } else if (selectedfile.type === 'application/pdf') {
                setFileType('pdf');
                setfiletoview(`data:application/pdf;base64,${fileURL}`);
            }
        }
    };

  
        const subirComprobante = () => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('numero_operacion',numero_operacion)
            setFORMDATA(formData)  
            settriggersubirComprobante(true);         
        };

        useEffect(() => {
            if(data_upload_file){   
                if(data_upload_file.success){
                    settriggerTraerComprobante(true);
                }
                settriggersubirComprobante(false);
            }
       }, [data_upload_file]);
            

    const handleRemovefile = () => {
        setfiletoview(null);
        setFileType(null);
        setServerFile(null)
        setFileName("");  // Limpiamos el nombre al eliminar el archivo
    };


    return (
        {
            handleRemovefile,
            handlefileChange,
            fileToview,
            fileType,
            fileName,
            serverFile,
            subirComprobante,
            loading_data_file,
            loading_upload_data_file,
            data_upload_file          
        }               
    )
}

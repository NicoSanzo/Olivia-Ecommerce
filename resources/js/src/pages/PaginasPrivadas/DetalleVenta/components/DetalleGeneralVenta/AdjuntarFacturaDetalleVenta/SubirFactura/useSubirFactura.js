import { useEffect, useState } from "react";
import { useFetch } from "../../../../../../../hooks/PedidoFetchGenerico";



export function UseSubirFactura({ventaDetail}) {

    const [file, setFile] = useState(null);
    const [fileToview, setfiletoview] = useState(null);
    const [serverFile,setServerFile] =useState(null);
    const [fileName, setFileName] = useState("");  // Estado para el nombre del Factura
    const [triggerTraerfactura, settriggerTraerfactura] = useState(false); 
    const [triggerSubirfactura, settriggersubirfactura] = useState(false); // Estado para el nombre del Factura    
    const [showError, setshowError] = useState(false);
    const [FORMDATA,setFORMDATA]=useState(null)

    useEffect(() => {
        settriggerTraerfactura(true)
    }, []);

    const {data:data_file,loading:loading_data_file,error}=useFetch("/api/fetch_factura_venta.php", "POST" ,{numero_operacion:ventaDetail.data.numero}, triggerTraerfactura )
    const {data:data_upload_file,loading:loading_upload_data_file,error:error_upload_file}=useFetch("/api/subir_factura_venta.php", 'POST' , FORMDATA, triggerSubirfactura )


    useEffect(() => {
        if (data_file){
            settriggerTraerfactura(false)
            if(data_file.data) {
                const fileURL = data_file.data;
                setfiletoview(`data:application/pdf;base64,${fileURL}`);
                setServerFile(data_file.data)
                setFileName(`factura-#${ventaDetail.data.numero}-${ventaDetail.data.cliente.nombre}-${ventaDetail.data.cliente.apellido}`);          
            }  
        }
             
    }, [data_file]);


    const handlefileChange = (event) => {
      
        const selectedfile = event.target.files[0]; 
        setFile(selectedfile); // Este set obtiene el Factura tipo File para pasarselo al formdata que se envia en el fetch
        if (selectedfile) {
            const fileURL = URL.createObjectURL(selectedfile); // Crea la Url para visualizar la vista previa
            setFileName(selectedfile.name); // Guarda el nombre del Factura para mostrarlo despues
            setfiletoview(`data:application/pdf;base64,${fileURL}`);
            
        }
    };
  
        const subirfactura = () => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('numero_operacion',ventaDetail.data.numero)
            setFORMDATA(formData)  
            settriggersubirfactura(true);         
        };

        useEffect(() => {
            if(data_upload_file){
                if(data_upload_file.success){
                    settriggerTraerfactura(true);
                }
                if(data_upload_file.error){
                    setshowError(true);
                }
                settriggersubirfactura(false);
            }
       }, [data_upload_file]);
            

    const handleRemovefile = () => {
        setfiletoview(null);
        setServerFile(null);
        setshowError(false);
        setFileName("");  // Limpiamos el nombre al eliminar el Factura
    };


    return (
        {
            handleRemovefile,
            handlefileChange,
            fileToview,
            fileName,
            showError,
            serverFile,
            subirfactura,
            loading_data_file,
            loading_upload_data_file,
            data_upload_file          
        }               
    )
}

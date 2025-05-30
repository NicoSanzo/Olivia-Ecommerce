import { useNavigate } from "react-router-dom";
import { useSearch } from "../../Context/searchContext";

export const useProductCard = ({itemKey,titulo}) => {

  const navigate = useNavigate();
  const {loading}=useSearch()

  const ClickMostrarDetalle = () => {
    navigate(`/productos/productoDetail?${titulo}&ID=${itemKey}`);
  };

  return {
    ClickMostrarDetalle,loading
  };

};
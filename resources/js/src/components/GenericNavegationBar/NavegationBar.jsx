import "./StyleNavegationBar.css";
import { UseNavegationBar } from "./useNavegationBar";


export const NavegationBar = () => {
    
    const {inputSearchValue, visualizarContenido,ApretarEnter,realizarConsulta} =UseNavegationBar();


    return (
        <>
            <div className="search">
                <div className="input-div">
                    <input 
                        type="text" 
                        value={inputSearchValue} 
                        onChange={visualizarContenido} 
                        onKeyDown={ApretarEnter}
                        name="input-search" 
                        className="input-search" 
                        placeholder="Buscar productos..."
                    />
                    <div className="search-icon" onClick={realizarConsulta}></div>
                </div>
            </div>
        </>
    );
};
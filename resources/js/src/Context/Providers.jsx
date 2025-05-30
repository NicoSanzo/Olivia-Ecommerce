import { LoginModalProvider } from './LoginPopContext';
import { ContextvalidarAndComprar } from './validarComprar';
import { ContextCarritoProvider } from './addCarritoContext';
import { ContextProductProvider } from './productDetailContext';
import { AuthProvider } from './authContext';
import { SearchProvider } from './searchContext';




export const AppContextProviders = ({ children }) => (
  <AuthProvider >
    <LoginModalProvider>
      <SearchProvider>
        <ContextProductProvider>
          <ContextCarritoProvider>
            <ContextvalidarAndComprar>             
                {children}
            </ContextvalidarAndComprar>
          </ContextCarritoProvider>
        </ContextProductProvider>
      </SearchProvider>
    </LoginModalProvider>
  </AuthProvider>
);


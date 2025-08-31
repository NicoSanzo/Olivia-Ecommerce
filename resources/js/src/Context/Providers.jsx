import { LoginModalProvider } from './LoginPopContext';
import { ContextvalidarAndComprar } from './validarComprar';
import { ContextCarritoProvider } from './addCarritoContext';

import { AuthProvider } from './authContext';
import { SearchProvider } from './searchContext';



export const AppContextProviders = ({ children }) => (
  <AuthProvider >
    <LoginModalProvider>
      <SearchProvider>    
          <ContextCarritoProvider>
            <ContextvalidarAndComprar>             
                {children}
            </ContextvalidarAndComprar>
          </ContextCarritoProvider>
      </SearchProvider>
    </LoginModalProvider>
  </AuthProvider>
);


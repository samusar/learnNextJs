import '../styles/globals.css'
import { AuthProvider } from '../src/hook/AuthContext';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp

// project import
import Routes from './routes/index';

// auth-provider
import AuthProvider from './providers/authProvider';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

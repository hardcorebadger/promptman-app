import { Navigate } from 'react-router-dom';
// hooks
import { useAuth } from '../contexts/AuthContext';
// routes

// ----------------------------------------------------------------------


export default function RoleGuard({ accessLevel, children }) {
    const { user } = useAuth();

    if (accessLevel > user.accessLevel) {
        return <Navigate to='/' />;
    }

    return <>{children}</>;
}

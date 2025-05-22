// src/hooks/useRouteCheck.js
import { useLocation } from 'react-router-dom';

function useRouteCheck(routesToCheck) {
    const location = useLocation();
    return routesToCheck.includes(location.pathname);
}

export default useRouteCheck;
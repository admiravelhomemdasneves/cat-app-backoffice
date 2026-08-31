import { Navigate } from "react-router-dom";
import { useGetMyPermissions } from "../api/permissions/getMyPermissions";

const PermissionRoute = ({ path, element }) => {
    const { data: permissions } = useGetMyPermissions();
    if (!permissions) return null;
    const rule = permissions.find(p => p.backofficePage.path === path);
    const canView = !rule || (rule.canView ?? true);
    return canView ? element : <Navigate to="/" replace />;
};

export default PermissionRoute;

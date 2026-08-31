import { useGetMyPermissions } from "../api/permissions/getMyPermissions";

export const usePagePermission = (path) => {
    const { data: permissions } = useGetMyPermissions();
    if (!permissions) return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    const rule = permissions.find(p => p.backofficePage.path === path);
    if (!rule) return { canView: true, canCreate: true, canEdit: true, canDelete: true };
    return {
        canView:   rule.canView   ?? true,
        canCreate: rule.canCreate ?? true,
        canEdit:   rule.canEdit   ?? true,
        canDelete: rule.canDelete ?? true,
    };
};

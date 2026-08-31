import { Checkbox } from "@mui/material";
import { useGetAllPermissions } from "../../api/permissions/getAllPermissions";
import { useUpdatePermission } from "../../api/permissions/updatePermission";
import { useDeletePermission } from "../../api/permissions/deletePermission";

export const RolesStore = () => {
    const { data: rawData, isPending } = useGetAllPermissions();
    const { mutate: updatePermissionMutate } = useUpdatePermission();
    const { mutate: deletePermissionMutate } = useDeletePermission();

    const gridData = (rawData || []).map(p => ({
        id: p.id,
        accessLevelId: p.accessLevel?.idAccessLevel,
        accessLevelName: p.accessLevel?.name || "",
        backofficePageId: p.backofficePage?.id,
        backofficePageName: p.backofficePage?.name || "",
        backofficePagePath: p.backofficePage?.path || "",
        canView: p.canView ?? true,
        canCreate: p.canCreate ?? true,
        canEdit: p.canEdit ?? true,
        canDelete: p.canDelete ?? true,
        isUniversal: p.accessLevel?.company == null,
    }));

    const updateHook = (row) => {
        updatePermissionMutate({
            id: row.isNew ? null : row.id,
            accessLevelId: row.accessLevelId,
            backofficePageId: row.backofficePageId,
            canView: row.canView ?? true,
            canCreate: row.canCreate ?? true,
            canEdit: row.canEdit ?? true,
            canDelete: row.canDelete ?? true,
        });
    };

    const deleteHook = (id) => deletePermissionMutate(id);

    return {
        pageTitle: "ROLES",
        pageSubtitle: "Manage page permissions per access level",
        rowIdField: "id",
        gridData,
        isPending,
        updateHook,
        deleteHook,
        columnsDefinition: [
            { field: "accessLevelName", headerName: "ROLE", flex: 1 },
            { field: "backofficePageName", headerName: "PAGE", flex: 1 },
            { field: "backofficePagePath", headerName: "PATH", flex: 1 },
            {
                field: "canView",
                headerName: "VIEW",
                flex: 0.6,
                renderCell: (params) => <Checkbox checked={!!params.value} disabled size="small" />,
            },
            {
                field: "canCreate",
                headerName: "CREATE",
                flex: 0.6,
                renderCell: (params) => <Checkbox checked={!!params.value} disabled size="small" />,
            },
            {
                field: "canEdit",
                headerName: "EDIT",
                flex: 0.6,
                renderCell: (params) => <Checkbox checked={!!params.value} disabled size="small" />,
            },
            {
                field: "canDelete",
                headerName: "DELETE",
                flex: 0.6,
                renderCell: (params) => <Checkbox checked={!!params.value} disabled size="small" />,
            },
        ],
        sampleRow: {
            id: null,
            accessLevelId: null,
            accessLevelName: "",
            backofficePageId: null,
            backofficePageName: "",
            backofficePagePath: "",
            canView: true,
            canCreate: true,
            canEdit: true,
            canDelete: true,
        },
    };
};

import { Chip } from "@mui/material";
import { useGetUsers } from "../../api/users/getUsers";
import { useCreateUser } from "../../api/users/createUser";
import { useUpdateAccessLevel } from "../../api/users/updateAccessLevel";
import { useInactivateUser } from "../../api/users/inactivateUser";
import { useGetCurrentUser } from "../../api/users/getCurrentUser";

export const ColaboratorsStore = () => {
    const { data: gridData, isPending } = useGetUsers();
    const { data: currentUser } = useGetCurrentUser();
    const { mutate: createUserMutate } = useCreateUser();
    const { mutate: updateAccessLevelMutate } = useUpdateAccessLevel();
    const { mutate: inactivateUserMutate } = useInactivateUser();

    const updateHook = (userData) => {
        if (userData.isNew) {
            createUserMutate({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                accessLevelId: userData.accessLevelId,
                companyId: currentUser?.companyId,
            });
        } else {
            updateAccessLevelMutate({ userId: userData.id, accessLevelId: userData.accessLevelId });
        }
    };

    const deleteHook = (id) => inactivateUserMutate(id);

    return {
        pageTitle: "COLABORATORS",
        pageSubtitle: "Manage your company colaborators",
        rowIdField: "id",
        gridData: gridData || [],
        isPending,
        updateHook,
        deleteHook,
        columnsDefinition: [
            { field: "username", headerName: "USERNAME", flex: 1 },
            { field: "email", headerName: "EMAIL", flex: 1.5 },
            { field: "accessLevelName", headerName: "ROLE", flex: 1 },
            {
                field: "enabled",
                headerName: "STATUS",
                flex: 0.8,
                renderCell: (params) => params.value
                    ? <Chip label="Active" color="success" size="small" />
                    : <Chip label="Pending" color="warning" size="small" />,
            },
        ],
        sampleRow: {
            id: null,
            username: "",
            email: "",
            password: "",
            accessLevelId: null,
            accessLevelName: "",
            enabled: false,
        },
    };
};

import { useGetMaterials } from "../../api/materials/getMaterials";
import { useUpdateMaterial, useInactivateMaterial } from "../../api/materials/createMaterials";
import { createIdLinkColumn } from "../../utils/columnHelpers";

export const MaterialsStore = () => {
    const { data: gridData, isPending } = useGetMaterials();
    const { mutate: updateMaterial } = useUpdateMaterial();
    const { mutate: inactivateMaterial } = useInactivateMaterial();

    return {
        pageTitle: "MATERIALS",
        pageSubtitle: "Welcome to your materials page",
        rowIdField: 'idMaterial',
        gridData: gridData || [],
        isPending,
        updateHook: updateMaterial,
        deleteHook: inactivateMaterial,
        columnsDefinition: [
            createIdLinkColumn({ field: 'idMaterial', pathPrefix: 'material', headerName: 'ID', getState: (row) => ({ material: row }) }),
            {
                field: "name",
                headerName: "NAME",
                editable: true,
                flex: 0.5,
            },
            {
                field: "description",
                headerName: "DESCRIPTION",
                editable: true,
                flex: 1,
            },
            {
                field: "category",
                headerName: "CATEGORY",
                editable: true,
                flex: 0.4,
            },
            {
                field: "seller",
                headerName: "SELLER",
                editable: true,
                flex: 0.5,
            },
            {
                field: "brand",
                headerName: "BRAND",
                editable: true,
                flex: 0.4,
            },
        ],
        sampleRow: {
            idMaterial: null,
            name: "",
            description: "",
            category: "",
            seller: "",
            brand: "",
            parentId: null,
            flagActive: true,
        },
    };
};

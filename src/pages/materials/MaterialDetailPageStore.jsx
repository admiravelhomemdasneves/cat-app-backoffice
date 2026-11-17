import { useGetMaterialById } from "../../api/materials/getMaterialById";
import { useUpdateMaterial } from "../../api/materials/createMaterials";

export const MaterialDetailPageStore = (materialId, initialMaterial = null) => {
    const { data: fetchedMaterial, isPending: fetchPending } = useGetMaterialById(materialId, { enabled: !initialMaterial });
    const material = initialMaterial ?? fetchedMaterial;
    const isPending = !initialMaterial && fetchPending;
    const { mutate: updateMaterial } = useUpdateMaterial();

    return { isPending, material, updateMaterial };
};

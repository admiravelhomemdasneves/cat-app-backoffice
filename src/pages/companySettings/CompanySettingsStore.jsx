import { useState, useEffect } from "react";
import { useGetCurrentUser } from "../../api/users/getCurrentUser";
import { useGetMyCompany } from "../../api/companies/getMyCompany";
import { useUpdateCompany } from "../../api/companies/updateCompany";

export const CompanySettingsStore = () => {
    const { data: currentUser } = useGetCurrentUser();
    const { data: company, isPending } = useGetMyCompany();
    const updateCompanyMutation = useUpdateCompany();

    const isAdmin = currentUser?.accessLevelName === "ADMIN";

    const [companyForm, setCompanyForm] = useState({ name: "", email: "", vatNumber: "", address: "" });
    useEffect(() => {
        if (company) setCompanyForm({
            name: company.name || "",
            email: company.email || "",
            vatNumber: company.vatNumber || "",
            address: company.address || "",
        });
    }, [company]);

    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const showSnack = (message, severity = "success") => setSnack({ open: true, message, severity });

    const handleSaveCompany = async () => {
        try {
            await updateCompanyMutation.mutateAsync({ ...company, ...companyForm });
            showSnack("Company info saved.");
        } catch {
            showSnack("Failed to save company info.", "error");
        }
    };

    return {
        isPending,
        isAdmin,
        companyForm,
        setCompanyForm,
        snack,
        setSnack,
        handleSaveCompany,
        savingCompany: updateCompanyMutation.isPending,
    };
};

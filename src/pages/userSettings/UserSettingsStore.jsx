import { useState, useEffect } from "react";
import { useGetCurrentUser } from "../../api/users/getCurrentUser";
import { useUpdateCurrentUser } from "../../api/users/updateCurrentUser";

export const UserSettingsStore = () => {
    const { data: currentUser, isPending } = useGetCurrentUser();
    const updateUserMutation = useUpdateCurrentUser();

    const [profile, setProfile] = useState({ username: "", email: "" });
    useEffect(() => {
        if (currentUser) setProfile({ username: currentUser.username, email: currentUser.email });
    }, [currentUser]);

    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const showSnack = (message, severity = "success") => setSnack({ open: true, message, severity });

    const handleSaveProfile = async () => {
        try {
            await updateUserMutation.mutateAsync(profile);
            showSnack("Profile saved.");
        } catch {
            showSnack("Failed to save profile.", "error");
        }
    };

    return {
        isPending,
        currentUser,
        profile,
        setProfile,
        snack,
        setSnack,
        handleSaveProfile,
        savingProfile: updateUserMutation.isPending,
    };
};

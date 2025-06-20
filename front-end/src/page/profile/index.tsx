import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import AccountMenu from "./AccountMenu";
import ProfileForm from "./ProfileForm";
import { UserProfile } from "../../types/Profile";
import { fetchUserProfile } from "../../Service/updateUserProfile";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const profile = await fetchUserProfile(userId);
      setUserProfile(profile);
    } catch {
      setError(t("profile.loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const handleAfterUpdate = () => {
    loadProfile();
    toast.success(t("profile.updateSuccess"));
  };

  if (!userId) return <p className="text-center py-8">{t("profile.notLoggedIn")}</p>;
  if (loading) return <p className="text-center py-8">{t("profile.loading")}</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <AccountMenu />
            </div>
            <div className="md:col-span-3">
              {userProfile && (
                  <ProfileForm
                      userId={userId}
                      initialProfile={userProfile}
                      // onSuccess={handleAfterUpdate}
                  />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
};

export default ProfilePage;

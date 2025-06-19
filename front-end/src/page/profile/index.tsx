// import React, { useState } from 'react';
// import Header from '../../components/layout/header/header';
// import Footer from '../../components/layout/footer/footer';
// import AccountMenu from './AccountMenu';
// import ProfileForm from './ProfileForm';
// import { UserProfile } from '../../types/Profile';

// const ProfilePage: React.FC = () => {
//   const [userProfile, setUserProfile] = useState<UserProfile>({
    
//     name: 'Thuong',

//     phoneNumber: '',
//     birthday: ''
//   });

//   const handleSaveProfile = (updatedProfile: UserProfile) => {
//     setUserProfile(updatedProfile);
//     // Here you would typically make an API call to update the profile
//     console.log('Profile updated:', updatedProfile);
//     alert('Thông tin đã được cập nhật thành công!');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />
      
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="md:col-span-1">
//             <AccountMenu />
//           </div>
          
//           <div className="md:col-span-3">
//             <ProfileForm 
//               userProfile={userProfile} 
//               onSave={handleSaveProfile} 
//             />
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import AccountMenu from "./AccountMenu";
import ProfileForm from "./ProfileForm";
import { UserProfile } from "../../types/Profile";
import { fetchUserProfile } from "../../Service/updateUserProfile";      
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";     

const ProfilePage = () => {
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
      setError("Không thể tải thông tin người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);                              

  const handleAfterUpdate = () => {
    loadProfile();
    toast.success("Thông tin đã được cập nhật!");
  };

  if (!userId) return <p className="text-center py-8">Bạn chưa đăng nhập.</p>;
  if (loading)  return <p className="text-center py-8">Đang tải thông tin…</p>;
  if (error)    return <p className="text-center py-8 text-red-500">{error}</p>;

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





    
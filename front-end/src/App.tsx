import React from "react";
import AppRoutes from "./router";
import { useAuth } from "./contexts/AuthContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";


const App: React.FC = () => {

  const { userId, token } = useAuth();

  if (!token || !userId) {
    return <div>Vui lòng đăng nhập</div>; // hoặc <Navigate to="/login" />
  }

  return (
    <FavoriteProvider userId={userId}>
      <AppRoutes />
    </FavoriteProvider>
  );
  // return <AppRoutes />;
};

export default App;

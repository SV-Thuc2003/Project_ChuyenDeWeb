import Routes from "./router.tsx";
import "./index.css";
import { useAuth } from "./contexts/AuthContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";

function App() {
  const { userId } = useAuth();

  return (
    <FavoriteProvider userId={userId || 0}>
      <Routes />
    </FavoriteProvider>
  );
}

export default App;



// import Routes from "./router.tsx";
// import "./index.css";

// function App() {
//   return (
//     <Routes />
    
//   );
// }

// export default App;


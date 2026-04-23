// src/App.jsx
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import HamburgerMenu from "./components/HamburgerMenu";
import PostModal from "./components/PostModal";
import Home from "./views/Home";
import Search from "./views/Search";
import Messages from "./views/Messages";
import PostDetail from "./views/PostDetail";
import Profile from "./views/Profile";

// ─── Notification Toast ──────────────────────────────────
const Notification = () => {
  const { notification } = useApp();
  if (!notification) return null;

  const colors = {
    success:
      "bg-green-500/20 border-green-400/40 text-green-300",
    info: "bg-white/10 border-white/20 text-white/80",
    error: "bg-red-500/20 border-red-400/40 text-red-300",
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-fadeInUp">
      <div
        className={`px-5 py-3 rounded-2xl backdrop-blur-xl text-sm font-medium border shadow-2xl ${
          colors[notification.type] || colors.info
        }`}
      >
        {notification.message}
      </div>
    </div>
  );
};

// ─── Router basado en estado ─────────────────────────────
const ViewRouter = () => {
  const { currentView } = useApp();

  const views = {
    home: <Home />,
    search: <Search />,
    messages: <Messages />,
    profile: <Profile />,
    postDetail: <PostDetail />,
  };

  return views[currentView] || <Home />;
};

// ─── App principal ───────────────────────────────────────
function App() {
  return (
    <AppProvider>
      <div className="flex flex-col items-center w-full min-h-screen">
        <Navbar />
        <HamburgerMenu />
        <main className="w-full max-w-5xl pt-32 pb-32 px-4">
          <ViewRouter />
        </main>
        <PostModal />
        <Notification />
      </div>
    </AppProvider>
  );
}

export default App;

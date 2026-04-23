// src/components/Navbar.jsx
import React from "react";
import {
  Home,
  Search,
  MessageCircle,
  Menu,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const {
    currentUser,
    currentView,
    navigate,
    showHamburger,
    setShowHamburger,
    conversations,
  } = useApp();

  const unreadCount = Object.keys(conversations).length;

  const navIcons = [
    { id: "messages", icon: MessageCircle, label: "Mensajes" },
    { id: "home", icon: Home, label: "Inicio" },
    { id: "search", icon: Search, label: "Buscar" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <nav
        className="navbar-float rounded-2xl px-3 py-2 flex items-center justify-between pointer-events-auto"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        {/* ── Hamburguesa ── */}
        <button
          onClick={() => setShowHamburger(!showHamburger)}
          className="glass-btn w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          aria-label="Menú"
        >
          <Menu size={20} className="text-white/80" />
        </button>

        {/* ── Iconos centrales ── */}
        <div className="flex items-center gap-2">
          {navIcons.map(({ id, icon: Icon, label }) => {
            const isActive = currentView === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                aria-label={label}
                className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ${
                  id === "home" ? "w-14 h-10" : "w-11 h-10"
                } ${
                  isActive
                    ? "glass-btn-primary"
                    : "glass-btn"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-white/60"}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {id === "messages" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 border-2 border-[#0a0a0f] text-[10px] font-bold flex items-center justify-center shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Avatar / Perfil ── */}
        <button
          onClick={() => navigate("profile")}
          aria-label="Mi perfil"
          className={`flex-shrink-0 rounded-full overflow-hidden transition-all duration-300 w-10 h-10 ${
            currentView === "profile"
              ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-[#0a0a0f]"
              : "ring-1 ring-white/20 hover:ring-white/40"
          }`}
        >
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-full h-full object-cover bg-white/10"
            />
          ) : (
            <div className="w-full h-full glass flex items-center justify-center">
              <User size={18} className="text-white/60" />
            </div>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
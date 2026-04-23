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
  } = useApp();

  const navIcons = [
    { id: "messages", icon: MessageCircle, label: "Mensajes" },
    { id: "home", icon: Home, label: "Inicio" },
    { id: "search", icon: Search, label: "Buscar" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className="navbar-float rounded-2xl px-4 py-3 flex items-center justify-between"
        style={{ width: "calc(100% - 2rem)", maxWidth: "900px" }}
      >
        {/* ── Hamburguesa ── */}
        <button
          onClick={() => setShowHamburger(!showHamburger)}
          className="glass-btn rounded-xl p-2.5 flex items-center justify-center"
          aria-label="Menú"
        >
          <Menu size={20} className="text-white/80" />
        </button>

        {/* ── Iconos centrales ── */}
        <div className="flex items-center gap-1">
          {navIcons.map(({ id, icon: Icon, label }) => {
            const isActive = currentView === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                aria-label={label}
                className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ${
                  id === "home" ? "w-14 h-10 mx-1" : "w-10 h-10"
                } ${
                  isActive
                    ? "glass-btn-primary"
                    : "glass-btn"
                }`}
              >
                <Icon
                  size={id === "home" ? 22 : 19}
                  className={isActive ? "text-white" : "text-white/60"}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {id === "messages" && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border border-[#0a0a0f] text-[9px] font-bold flex items-center justify-center">
                    2
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
          className={`rounded-full overflow-hidden transition-all duration-300 ${
            currentView === "profile"
              ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-transparent"
              : "ring-1 ring-white/20 hover:ring-white/40"
          }`}
          style={{ width: 38, height: 38 }}
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
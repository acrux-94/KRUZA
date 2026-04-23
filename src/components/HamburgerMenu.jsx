// src/components/HamburgerMenu.jsx
import React from "react";
import { Code2, LogOut, ExternalLink } from "lucide-react";
import { useApp } from "../context/AppContext";

const HamburgerMenu = () => {
  const { showHamburger, logout, currentUser } = useApp();

  return (
    <div
      className={`fixed top-20 left-4 z-50 transition-all duration-300 ${
        showHamburger
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <div className="glass-dark rounded-2xl p-2 min-w-[220px] animate-scaleIn">
        {/* Header del menú */}
        <div className="px-3 py-2 mb-1 border-b border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-widest font-medium">
            KRUZA 🐾
          </p>
        </div>

        {/* GitHub */}
        <a
          href="https://github.com/acrux-94/KRUZA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/06 transition-all duration-200 group"
        >
          <div className="w-8 h-8 glass rounded-lg flex items-center justify-center">
            <Code2 size={16} className="text-white/70 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              GitHub del proyecto
            </p>
            <p className="text-xs text-white/40">Ver código fuente</p>
          </div>
          <ExternalLink size={12} className="text-white/30" />
        </a>

        {/* Separador */}
        <div className="h-px bg-white/5 mx-2 my-1" />

        {/* Cerrar sesión */}
        {currentUser ? (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 border border-red-500/20">
              <LogOut size={16} className="text-red-400/70 group-hover:text-red-400 transition-colors" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-red-400/70 group-hover:text-red-400 transition-colors">
                Cerrar sesión
              </p>
              <p className="text-xs text-white/30">@{currentUser.username}</p>
            </div>
          </button>
        ) : (
          <div className="px-3 py-2.5">
            <p className="text-xs text-white/30 text-center">
              No has iniciado sesión
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
// src/views/Profile.jsx
import React, { useState } from "react";
import {
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Heart,
  Grid,
  Trash2,
  Edit3,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import PostCard from "../components/PostCard";

// ─── Formulario Auth ────────────────────────────────────
const AuthForm = () => {
  const { login } = useApp();
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return;
    }
    const ok = login(form.username, form.password);
    if (!ok) setError("Credenciales incorrectas");
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-6 animate-fadeInUp">
      {/* Logo */}
      <div className="text-center mb-8">
        <p className="text-5xl mb-3">🐾</p>
        <h1 className="text-2xl font-black text-white">KRUZA</h1>
        <p className="text-white/40 text-sm mt-1">
          Conecta a tus mascotas con amor
        </p>
      </div>

      {/* Toggle */}
      <div className="glass rounded-2xl p-1 flex mb-6">
        {[
          { id: "login", icon: LogIn, label: "Iniciar sesión" },
          { id: "register", icon: UserPlus, label: "Registrarse" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => {
              setMode(id);
              setError("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              mode === id
                ? "glass-btn-primary text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-white/50 mb-2 ml-1">
            {mode === "login" ? "Usuario o email" : "Nombre de usuario"}
          </label>
          <input
            type="text"
            placeholder={
              mode === "login" ? "Tu usuario..." : "Elige un nombre..."
            }
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            className="glass-input w-full rounded-xl px-4 py-3.5 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/50 mb-2 ml-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Mínimo 4 caracteres..."
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              className="glass-input w-full rounded-xl px-4 py-3.5 text-sm pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center glass rounded-xl px-4 py-2 border border-red-400/20">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          className="glass-btn-primary w-full py-4 rounded-xl font-bold text-base mt-2"
        >
          {mode === "login" ? "Entrar a KRUZA 🐾" : "Crear cuenta gratis 🎉"}
        </button>
      </form>

      <p className="text-center text-xs text-white/25 mt-6">
        💡 Prueba con usuario: <span className="text-white/40">carlos_pastor</span> y cualquier contraseña de 4+ caracteres
      </p>
    </div>
  );
};

// ─── Vista perfil logeado ────────────────────────────────
const ProfileLoggedIn = () => {
  const { currentUser, posts, deletePost, navigate } = useApp();
  const [activeTab, setActiveTab] = useState("posts");

  const myPosts = posts.filter((p) => p.userId === currentUser.id);
  const favPosts = posts.filter((p) =>
    currentUser.favorites?.includes(p.id)
  );

  const stats = [
    { label: "Publicaciones", value: myPosts.length },
    { label: "Favoritos", value: favPosts.length },
    { label: "Likes recibidos", value: myPosts.reduce((acc, p) => acc + p.likes.length, 0) },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-10 animate-fadeInUp">
      {/* Cabecera perfil */}
      <div className="glass rounded-3xl p-6 mb-6 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-white/15 bg-white/10"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 glass-btn-primary rounded-full flex items-center justify-center">
              <Edit3 size={13} className="text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-black text-white truncate">
              {currentUser.displayName}
            </h2>
            <p className="text-white/40 text-sm">@{currentUser.username}</p>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/8">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-black text-white">{value}</p>
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="glass rounded-2xl p-1 flex mb-6">
        {[
          { id: "posts", icon: Grid, label: "Mis publicaciones" },
          { id: "favorites", icon: Heart, label: "Favoritos" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === id
                ? "glass-btn-primary text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">
              {id === "posts" ? "Posts" : "Favs"}
            </span>
          </button>
        ))}
      </div>

      {/* Contenido Tab */}
      {activeTab === "posts" && (
        <div>
          {myPosts.length === 0 ? (
            <div className="glass rounded-3xl p-10 text-center">
              <p className="text-4xl mb-3">🐕</p>
              <p className="text-white/60 font-semibold">
                Aún no has publicado
              </p>
              <p className="text-white/30 text-sm mt-1">
                ¡Añade tu primer perro!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {myPosts.map((post) => (
                <div key={post.id} className="relative group">
                  <PostCard post={post} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(post.id);
                    }}
                    className="absolute top-12 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{
                      background: "rgba(239,68,68,0.6)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(239,68,68,0.4)",
                    }}
                  >
                    <Trash2 size={14} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "favorites" && (
        <div>
          {favPosts.length === 0 ? (
            <div className="glass rounded-3xl p-10 text-center">
              <p className="text-4xl mb-3">❤️</p>
              <p className="text-white/60 font-semibold">
                No tienes favoritos aún
              </p>
              <p className="text-white/30 text-sm mt-1">
                Explora y guarda los que más te gusten
              </p>
              <button
                onClick={() => navigate("home")}
                className="glass-btn-primary mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold"
              >
                Explorar publicaciones
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {favPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { currentUser } = useApp();
  return currentUser ? <ProfileLoggedIn /> : <AuthForm />;
};

export default Profile;
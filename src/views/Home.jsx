// src/views/Home.jsx
import React from "react";
import { Plus, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import PostCard from "../components/PostCard";

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-8 h-8 glass-btn-primary rounded-xl flex items-center justify-center flex-shrink-0">
      <Icon size={15} className="text-white" />
    </div>
    <div>
      <h2 className="text-base font-bold text-white leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-xs text-white/40">{subtitle}</p>
      )}
    </div>
  </div>
);

const Home = () => {
  const { posts, setShowPostModal, currentUser } = useApp();

  const nearbyPosts = posts.slice(0, 4);
  const recentPosts = posts.slice(2, 7);

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-10">
      {/* Hero banner */}
      <div className="glass rounded-3xl p-6 sm:p-8 text-center animate-fadeInUp relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.15) 0%, transparent 70%)",
          }}
        />
        <p className="text-4xl mb-3">🐾</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Bienvenido a{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KRUZA
          </span>
        </h1>
        <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto">
          Conecta con dueños de perros cerca de ti para planificar cruces
          responsables.
        </p>
        {!currentUser && (
          <p className="text-xs text-white/30 mt-3">
            💡 Inicia sesión para publicar y contactar a otros dueños
          </p>
        )}
      </div>

      {/* Sección: Cerca de ti */}
      <section className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
        <SectionHeader
          icon={MapPin}
          title="Cerca de ti"
          subtitle="Perros disponibles en tu zona"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {nearbyPosts.map((post, i) => (
            <div
              key={post.id}
              style={{ animationDelay: `${i * 0.06}s` }}
              className="animate-fadeInUp"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Sección: Descubre más */}
      <section className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        <SectionHeader
          icon={Sparkles}
          title="Descubre más"
          subtitle="Publicaciones recientes de toda España"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {recentPosts.map((post, i) => (
            <div
              key={post.id}
              style={{ animationDelay: `${i * 0.06}s` }}
              className="animate-fadeInUp"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Sección: Más buscados */}
      <section
        className="animate-fadeInUp pb-24"
        style={{ animationDelay: "0.3s" }}
      >
        <SectionHeader
          icon={TrendingUp}
          title="Razas populares"
          subtitle="Las más solicitadas esta semana"
        />
        <div className="flex flex-wrap gap-2">
          {[
            "Golden Retriever",
            "Pastor Alemán",
            "Husky",
            "Labrador",
            "Border Collie",
            "Beagle",
            "Caniche",
            "Bulldog Francés",
          ].map((breed) => (
            <span
              key={breed}
              className="glass px-4 py-2 rounded-full text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-200 hover:scale-105"
            >
              {breed}
            </span>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-8 right-6 z-30 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm text-white glass-btn-primary fab-btn shadow-2xl"
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Publicar perro</span>
      </button>
    </div>
  );
};

export default Home;
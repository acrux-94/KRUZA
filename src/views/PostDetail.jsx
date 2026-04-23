import React, { useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Heart,
  MessageCircle,
  Calendar,
  Palette,
  User,
  Share2,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const PostDetail = () => {
  const {
    selectedPost,
    navigate,
    currentUser,
    toggleFavorite,
    startConversation,
    getUserById,
  } = useApp();

  useEffect(() => {
    if (!selectedPost) navigate("home");
  }, [selectedPost, navigate]);

  if (!selectedPost) return null;

  const owner = getUserById(selectedPost.userId);
  const isFav =
    currentUser?.favorites?.includes(selectedPost.id);
  const isOwn = currentUser?.id === selectedPost.userId;

  const handleContact = () => {
    if (!currentUser) {
      navigate("profile");
      return;
    }
    startConversation(selectedPost.userId);
  };

  const details = [
    { icon: User, label: "Raza", value: selectedPost.breed },
    { icon: Calendar, label: "Edad", value: selectedPost.age },
    {
      icon: User,
      label: "Género",
      value: selectedPost.gender,
      tag: true,
    },
    { icon: Palette, label: "Color", value: selectedPost.color },
    { icon: MapPin, label: "Ubicación", value: selectedPost.location },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 animate-fadeInUp pb-10">
      {/* Back button */}
      <button
        onClick={() => navigate("home")}
        className="flex items-center gap-2 glass-btn px-4 py-2 rounded-xl mb-6 text-sm text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Volver
      </button>

      {/* Imagen principal */}
      <div className="relative rounded-3xl overflow-hidden mb-6 shadow-2xl">
        <img
          src={selectedPost.image}
          alt={selectedPost.dogName}
          className="w-full object-cover"
          style={{ maxHeight: 420 }}
        />
        {/* Overlay con info básica */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
          }}
        >
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">
                {selectedPost.dogName}
              </h1>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                  selectedPost.gender === "Macho"
                    ? "tag-male"
                    : "tag-female"
                }`}
              >
                {selectedPost.gender === "Macho" ? "♂ Macho" : "♀ Hembra"}
              </span>
            </div>
            {/* Likes */}
            <div className="text-right">
              <p className="text-white text-lg font-bold">
                {selectedPost.likes.length}
              </p>
              <p className="text-white/50 text-xs">me gusta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta de detalles */}
      <div className="glass rounded-3xl p-6 mb-4">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
          Información
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {details.map(({ icon: Icon, label, value, tag }) => (
            <div key={label} className="glass rounded-2xl p-3">
              <p className="text-white/40 text-xs mb-1">{label}</p>
              {tag ? (
                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                    value === "Macho" ? "tag-male" : "tag-female"
                  }`}
                >
                  {value}
                </span>
              ) : (
                <p className="text-white font-semibold text-sm">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Descripción */}
        {selectedPost.description && (
          <div className="mt-4 pt-4 border-t border-white/8">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
              Descripción
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              {selectedPost.description}
            </p>
          </div>
        )}
      </div>

      {/* Tarjeta del dueño */}
      {owner && (
        <div className="glass rounded-3xl p-5 mb-6">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            Dueño
          </h3>
          <div className="flex items-center gap-4">
            <img
              src={owner.avatar}
              alt={owner.displayName}
              className="w-14 h-14 rounded-2xl object-cover border border-white/15 bg-white/10"
            />
            <div className="flex-1">
              <p className="text-white font-bold text-base">
                {owner.displayName}
              </p>
              <p className="text-white/40 text-xs">@{owner.username}</p>
              <p className="text-white/55 text-xs mt-1">{owner.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      {!isOwn && (
        <div className="flex gap-3">
          <button
            onClick={handleContact}
            className="glass-btn-primary flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base"
          >
            <MessageCircle size={20} />
            Contactar
          </button>
          <button
            onClick={() => {
              if (!currentUser) navigate("profile");
              else toggleFavorite(selectedPost.id);
            }}
            className={`glass-btn w-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
              isFav ? "bg-red-500/20 border-red-400/40" : ""
            }`}
          >
            <Heart
              size={22}
              className={
                isFav
                  ? "text-red-400 fill-red-400"
                  : "text-white/60"
              }
            />
          </button>
          <button className="glass-btn w-16 flex items-center justify-center rounded-2xl">
            <Share2 size={20} className="text-white/60" />
          </button>
        </div>
      )}

      {isOwn && (
        <div className="glass rounded-2xl p-4 text-center">
          <p className="text-white/40 text-sm">
            Esta es tu publicación 🐾
          </p>
          <p className="text-white/25 text-xs mt-1">
            Puedes gestionarla desde tu perfil
          </p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
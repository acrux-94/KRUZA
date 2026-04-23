// src/components/PostCard.jsx
import React from "react";
import { MapPin, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";

const PostCard = ({ post }) => {
  const { navigate, toggleLike, currentUser, getUserById } = useApp();
  const owner = getUserById(post.userId);
  const isLiked = currentUser && post.likes.includes(currentUser.id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate("profile");
      return;
    }
    toggleLike(post.id);
  };

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative"
      onClick={() => navigate("postDetail", post)}
      style={{ aspectRatio: "3/4" }}
    >
      {/* Imagen */}
      <div className="absolute inset-0">
        <img
          src={post.image}
          alt={`${post.dogName} - ${post.breed}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Badge de género */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
            post.gender === "Macho" ? "tag-male" : "tag-female"
          }`}
        >
          {post.gender === "Macho" ? "♂ Macho" : "♀ Hembra"}
        </span>
      </div>

      {/* Botón like */}
      <button
        onClick={handleLike}
        className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <Heart
          size={15}
          className={
            isLiked ? "text-red-400 fill-red-400" : "text-white/70"
          }
        />
      </button>

      {/* Barra inferior con info */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-3"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-2">
          {/* Avatar dueño */}
          <div className="flex-shrink-0">
            <img
              src={owner?.avatar}
              alt={owner?.displayName}
              className="w-7 h-7 rounded-full object-cover border border-white/20 bg-white/10"
            />
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-semibold text-sm truncate leading-tight">
                {post.dogName}
              </p>
              <span className="text-white/40 text-xs">·</span>
              <p className="text-white/60 text-xs truncate">{post.breed}</p>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-white/40 flex-shrink-0" />
              <p className="text-white/40 text-xs truncate">{post.location}</p>
            </div>
          </div>
          {/* Likes count */}
          <div className="flex-shrink-0 text-right">
            <p className="text-white/40 text-xs">{post.likes.length} ❤️</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
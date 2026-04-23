// src/components/PostModal.jsx
import React, { useState, useRef } from "react";
import { X, Upload, Camera, Dog } from "lucide-react";
import { useApp } from "../context/AppContext";
import { dogBreeds } from "../data/mockData";

const PostModal = () => {
  const { showPostModal, setShowPostModal, addPost, currentUser, navigate } =
    useApp();

  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    dogName: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    location: "",
    description: "",
    image: "",
  });
  const [step, setStep] = useState(1);

  if (!showPostModal) return null;

  if (!currentUser) {
    return (
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        onClick={() => setShowPostModal(false)}
      >
        <div
          className="glass rounded-3xl p-8 max-w-sm w-full text-center animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-5xl mb-4">🐾</div>
          <h3 className="text-xl font-bold text-white mb-2">
            ¡Necesitas una cuenta!
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Inicia sesión para publicar tu perro en KRUZA.
          </p>
          <button
            onClick={() => {
              setShowPostModal(false);
              navigate("profile");
            }}
            className="glass-btn-primary w-full py-3 rounded-xl font-semibold"
          >
            Ir al perfil
          </button>
        </div>
      </div>
    );
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((f) => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.breed || !form.gender || !form.location) return;
    addPost({
      ...form,
      image:
        form.image ||
        `https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80`,
    });
    setShowPostModal(false);
    setForm({
      dogName: "",
      breed: "",
      age: "",
      gender: "",
      color: "",
      location: "",
      description: "",
      image: "",
    });
    setPreview(null);
    setStep(1);
  };

  const isStep1Valid =
    form.dogName && form.breed && form.age && form.gender && form.color;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
      onClick={() => setShowPostModal(false)}
    >
      <div
        className="glass-dark w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 glass-btn-primary rounded-xl flex items-center justify-center">
              <Dog size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Nueva publicación
              </h2>
              <p className="text-xs text-white/40">
                Paso {step} de 2
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPostModal(false)}
            className="glass-btn w-8 h-8 rounded-xl flex items-center justify-center"
          >
            <X size={16} className="text-white/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 ? (
            <div className="space-y-4 animate-fadeInUp">
              {/* Upload imagen */}
              <div
                onClick={() => fileRef.current?.click()}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ height: 180 }}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={28} className="text-white" />
                    </div>
                  </>
                ) : (
                  <div className="glass w-full h-full flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                    <Upload size={28} className="text-white/40" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-white/60">
                        Subir foto del perro
                      </p>
                      <p className="text-xs text-white/30">
                        Haz clic para seleccionar
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>

              {/* Nombre */}
              <input
                type="text"
                placeholder="Nombre del perro"
                value={form.dogName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dogName: e.target.value }))
                }
                className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                required
              />

              {/* Raza */}
              <select
                value={form.breed}
                onChange={(e) =>
                  setForm((f) => ({ ...f, breed: e.target.value }))
                }
                className="glass-input w-full rounded-xl px-4 py-3 text-sm appearance-none"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
                required
              >
                <option value="" style={{ background: "#1a1a2e" }}>
                  Seleccionar raza...
                </option>
                {dogBreeds.map((b) => (
                  <option key={b} value={b} style={{ background: "#1a1a2e" }}>
                    {b}
                  </option>
                ))}
              </select>

              {/* Edad + Color */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Edad (ej: 2 años)"
                  value={form.age}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, age: e.target.value }))
                  }
                  className="glass-input rounded-xl px-4 py-3 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Color del pelaje"
                  value={form.color}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, color: e.target.value }))
                  }
                  className="glass-input rounded-xl px-4 py-3 text-sm"
                />
              </div>

              {/* Género */}
              <div className="grid grid-cols-2 gap-3">
                {["Macho", "Hembra"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, gender: g }))}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      form.gender === g
                        ? g === "Macho"
                          ? "bg-blue-500/30 border-blue-400/50 text-blue-300"
                          : "bg-pink-500/30 border-pink-400/50 text-pink-300"
                        : "glass border-white/10 text-white/50 hover:border-white/25"
                    }`}
                  >
                    {g === "Macho" ? "♂ Macho" : "♀ Hembra"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => isStep1Valid && setStep(2)}
                disabled={!isStep1Valid}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isStep1Valid
                    ? "glass-btn-primary"
                    : "glass opacity-40 cursor-not-allowed text-white/50"
                }`}
              >
                Siguiente →
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeInUp">
              {/* Ubicación */}
              <input
                type="text"
                placeholder="Ubicación (ej: Madrid, Centro)"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                className="glass-input w-full rounded-xl px-4 py-3 text-sm"
                required
              />

              {/* Descripción */}
              <textarea
                placeholder="Descripción sobre tu perro, carácter, qué buscas..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={4}
                className="glass-input w-full rounded-xl px-4 py-3 text-sm resize-none"
              />

              {/* Preview resumen */}
              <div className="glass rounded-xl p-4 text-xs text-white/50 space-y-1">
                <p className="font-semibold text-white/70 mb-2">Resumen:</p>
                <p>🐕 {form.dogName} · {form.breed}</p>
                <p>📅 {form.age} · {form.gender === "Macho" ? "♂ Macho" : "♀ Hembra"}</p>
                {form.color && <p>🎨 {form.color}</p>}
                <p>📍 {form.location || "Sin ubicación"}</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="glass-btn flex-1 py-3.5 rounded-xl font-semibold text-sm"
                >
                  ← Atrás
                </button>
                <button
                  type="submit"
                  className="glass-btn-primary flex-1 py-3.5 rounded-xl font-bold text-sm"
                >
                  Publicar 🐾
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostModal;
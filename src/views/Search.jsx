// src/views/Search.jsx
import React, { useState, useMemo } from "react";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  X,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { dogBreeds } from "../data/mockData";
import PostCard from "../components/PostCard";

const COLORS = [
  "Negro", "Blanco", "Marrón", "Dorado", "Gris",
  "Atigrado", "Tricolor", "Crema", "Rojo", "Otro",
];

const Search = () => {
  const { posts } = useApp();

  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    color: "",
    location: "",
    sortBy: "recent",
  });
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);

  const setFilter = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? "" : value }));

  const clearAll = () => {
    setQuery("");
    setFilters({ gender: "", color: "", location: "", sortBy: "recent" });
  };

  const activeFiltersCount =
    [filters.gender, filters.color, filters.location].filter(Boolean).length;

  const results = useMemo(() => {
    let filtered = [...posts];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.breed.toLowerCase().includes(q) ||
          p.dogName.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (filters.gender) {
      filtered = filtered.filter((p) => p.gender === filters.gender);
    }

    if (filters.color) {
      filtered = filtered.filter((p) =>
        p.color?.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.sortBy === "distance") {
      filtered.sort((a, b) => {
        const distA = parseFloat(a.distance) || 99;
        const distB = parseFloat(b.distance) || 99;
        return distA - distB;
      });
    } else {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return filtered;
  }, [posts, query, filters]);

  const filteredBreeds = dogBreeds.filter((b) =>
    b.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10 animate-fadeInUp">
      {/* Barra de búsqueda */}
      <div className="relative mb-4">
        <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3.5">
          <SearchIcon size={18} className="text-white/40 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowBreedDropdown(e.target.value.length > 0);
            }}
            placeholder="Buscar por raza, nombre o ubicación..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
            onFocus={() => query && setShowBreedDropdown(true)}
            onBlur={() => setTimeout(() => setShowBreedDropdown(false), 150)}
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={16} className="text-white/40 hover:text-white/70 transition-colors" />
            </button>
          )}
        </div>

        {/* Dropdown razas */}
        {showBreedDropdown && filteredBreeds.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-20 mt-2 glass-dark rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            {filteredBreeds.slice(0, 8).map((breed) => (
              <button
                key={breed}
                onMouseDown={() => {
                  setQuery(breed);
                  setShowBreedDropdown(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/05 transition-colors flex items-center gap-2"
              >
                <span>🐕</span> {breed}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Barra de filtros */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            showFilters || activeFiltersCount > 0
              ? "glass-btn-primary"
              : "glass-btn"
          }`}
        >
          <SlidersHorizontal size={15} />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Ordenar */}
        <div className="flex gap-2">
          {[
            { id: "recent", label: "Recientes" },
            { id: "distance", label: "Cercanía" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilters((f) => ({ ...f, sortBy: id }))}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                filters.sortBy === id ? "glass-btn-primary" : "glass-btn"
              }`}
            >
              {id === "distance" && <MapPin size={12} />}
              {label}
            </button>
          ))}
        </div>

        {(query || activeFiltersCount > 0) && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs text-white/50 hover:text-white/80 glass-btn transition-colors"
          >
            <X size={13} />
            Limpiar
          </button>
        )}

        {/* Resultados count */}
        <span className="ml-auto text-xs text-white/30">
          {results.length} resultado{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Panel de filtros expandible */}
      {showFilters && (
        <div className="glass rounded-2xl p-5 mb-6 animate-fadeInUp space-y-5">
          {/* Género */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              Género
            </p>
            <div className="flex gap-2">
              {["Macho", "Hembra"].map((g) => (
                <button
                  key={g}
                  onClick={() => setFilter("gender", g)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    filters.gender === g
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
          </div>

          {/* Color */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              Color del pelaje
            </p>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setFilter("color", color)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    filters.color === color
                      ? "glass-btn-primary border-purple-400/50"
                      : "glass border-white/10 text-white/50 hover:border-white/25"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              Ubicación
            </p>
            <div className="relative">
              <MapPin
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="text"
                placeholder="Ciudad, barrio..."
                value={filters.location}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, location: e.target.value }))
                }
                className="glass-input w-full rounded-xl pl-9 pr-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Resultados */}
      {results.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-white/60 font-semibold text-lg">
            Sin resultados
          </p>
          <p className="text-white/30 text-sm mt-1">
            Prueba con otro término o ajusta los filtros
          </p>
          <button
            onClick={clearAll}
            className="glass-btn-primary mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {results.map((post, i) => (
            <div
              key={post.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
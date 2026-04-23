// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  mockPosts,
  mockUsers,
  mockMessages,
} from "../data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Auth
  const [currentUser, setCurrentUser] = useState(null);

  // Navegación
  const [currentView, setCurrentView] = useState("home");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Datos
  const [posts, setPosts] = useState(mockPosts);
  const [users] = useState(mockUsers);
  const [conversations, setConversations] = useState(mockMessages);

  // UI
  const [showHamburger, setShowHamburger] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // ─── Auth ──────────────────────────────────────────────
  const login = useCallback((username, password) => {
    const found = mockUsers.find(
      (u) => u.username === username || u.displayName === username
    );
    if (found && password.length >= 4) {
      setCurrentUser({ ...found, favorites: ["p2", "p5"] });
      showNotification("¡Bienvenido de vuelta! 🐾", "success");
      return true;
    }
    const newUser = {
      id: `u_${Date.now()}`,
      username,
      displayName: username,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`,
      bio: "¡Nuevo en KRUZA! 🐾",
      location: "España",
      favorites: [],
    };
    setCurrentUser(newUser);
    showNotification("¡Cuenta creada con éxito! 🎉", "success");
    return true;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentView("home");
    setShowHamburger(false);
    showNotification("Sesión cerrada", "info");
  }, []);

  // ─── Posts ─────────────────────────────────────────────
  const addPost = useCallback(
    (postData) => {
      const newPost = {
        id: `p_${Date.now()}`,
        userId: currentUser.id,
        ...postData,
        likes: [],
        createdAt: new Date().toISOString().split("T")[0],
        distance: "0.1 km",
      };
      setPosts((prev) => [newPost, ...prev]);
      showNotification("¡Publicación creada! 🐕", "success");
    },
    [currentUser]
  );

  const deletePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showNotification("Publicación eliminada", "info");
  }, []);

  const toggleFavorite = useCallback(
    (postId) => {
      if (!currentUser) return;
      setCurrentUser((prev) => {
        const favs = prev.favorites || [];
        const isFav = favs.includes(postId);
        const newFavs = isFav
          ? favs.filter((id) => id !== postId)
          : [...favs, postId];
        showNotification(
          isFav ? "Eliminado de favoritos" : "¡Añadido a favoritos! ❤️",
          isFav ? "info" : "success"
        );
        return { ...prev, favorites: newFavs };
      });
    },
    [currentUser]
  );

  const toggleLike = useCallback(
    (postId) => {
      if (!currentUser) return;
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const liked = p.likes.includes(currentUser.id);
          return {
            ...p,
            likes: liked
              ? p.likes.filter((id) => id !== currentUser.id)
              : [...p.likes, currentUser.id],
          };
        })
      );
    },
    [currentUser]
  );

  // ─── Mensajes ──────────────────────────────────────────
  const startConversation = useCallback(
    (withUserId) => {
      const existingKey = Object.keys(conversations).find((key) =>
        conversations[key].participants.includes(withUserId)
      );
      if (existingKey) {
        setSelectedConversation(existingKey);
      } else {
        const newKey = `conv_${Date.now()}`;
        setConversations((prev) => ({
          ...prev,
          [newKey]: {
            id: newKey,
            participants: ["currentUser", withUserId],
            messages: [],
          },
        }));
        setSelectedConversation(newKey);
      }
      setCurrentView("messages");
    },
    [conversations]
  );

  const sendMessage = useCallback(
    (convId, text) => {
      setConversations((prev) => ({
        ...prev,
        [convId]: {
          ...prev[convId],
          messages: [
            ...prev[convId].messages,
            {
              id: `msg_${Date.now()}`,
              from: "currentUser",
              text,
              time: new Date().toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        },
      }));
    },
    []
  );

  // ─── Notificaciones ────────────────────────────────────
  const showNotification = useCallback((message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // ─── Navegación ────────────────────────────────────────
  const navigate = useCallback((view, data = null) => {
    if (view === "postDetail" && data) setSelectedPost(data);
    setCurrentView(view);
    setShowHamburger(false);
  }, []);

  const getUserById = useCallback(
    (id) => {
      if (id === "currentUser" || id === currentUser?.id) return currentUser;
      return users.find((u) => u.id === id);
    },
    [users, currentUser]
  );

  const getPostById = useCallback(
    (id) => posts.find((p) => p.id === id),
    [posts]
  );

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentView,
        selectedPost,
        selectedConversation,
        posts,
        users,
        conversations,
        showHamburger,
        showPostModal,
        notification,
        login,
        logout,
        addPost,
        deletePost,
        toggleFavorite,
        toggleLike,
        startConversation,
        sendMessage,
        navigate,
        setShowHamburger,
        setShowPostModal,
        setSelectedConversation,
        getUserById,
        getPostById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
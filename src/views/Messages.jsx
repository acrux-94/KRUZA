// src/views/Messages.jsx
import React, { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, MessageCircle, Dog } from "lucide-react";
import { useApp } from "../context/AppContext";

const Messages = () => {
  const {
    currentUser,
    conversations,
    selectedConversation,
    setSelectedConversation,
    sendMessage,
    getUserById,
    navigate,
  } = useApp();

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, selectedConversation]);

  useEffect(() => {
    if (selectedConversation) setMobileShowChat(true);
  }, [selectedConversation]);

  if (!currentUser) {
    return (
      <div className="max-w-sm mx-auto px-4 py-10 text-center animate-fadeInUp">
        <div className="glass rounded-3xl p-10">
          <p className="text-5xl mb-4">💬</p>
          <h3 className="text-xl font-bold text-white mb-2">
            Tus mensajes
          </h3>
          <p className="text-white/40 text-sm mb-6">
            Inicia sesión para ver tus conversaciones
          </p>
          <button
            onClick={() => navigate("profile")}
            className="glass-btn-primary px-6 py-3 rounded-xl font-semibold"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  const convList = Object.values(conversations);

  const activeConv = selectedConversation
    ? conversations[selectedConversation]
    : null;

  const getOtherUser = (conv) => {
    const otherId = conv.participants.find(
      (p) => p !== "currentUser" && p !== currentUser.id
    );
    return getUserById(otherId);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConversation) return;
    sendMessage(selectedConversation, inputText.trim());
    setInputText("");
  };

  const handleSelectConv = (convId) => {
    setSelectedConversation(convId);
    setMobileShowChat(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 animate-fadeInUp">
      <div
        className="glass rounded-3xl overflow-hidden flex"
        style={{ height: "calc(100vh - 120px)", minHeight: 500 }}
      >
        {/* ── Columna izquierda: Lista de chats ── */}
        <div
          className={`flex-shrink-0 border-r border-white/8 flex flex-col ${
            mobileShowChat ? "hidden sm:flex" : "flex"
          } sm:w-72 w-full`}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 glass-btn-primary rounded-xl flex items-center justify-center">
                <MessageCircle size={15} className="text-white" />
              </div>
              <h2 className="text-base font-bold text-white">Mensajes</h2>
            </div>
          </div>

          {/* Lista conversaciones */}
          <div className="flex-1 overflow-y-auto p-2">
            {convList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Dog size={32} className="text-white/20 mb-3" />
                <p className="text-white/40 text-sm">
                  Sin conversaciones
                </p>
                <p className="text-white/25 text-xs mt-1">
                  Contacta a un dueño desde un anuncio
                </p>
              </div>
            ) : (
              convList.map((conv) => {
                const other = getOtherUser(conv);
                const lastMsg = conv.messages[conv.messages.length - 1];
                const isActive = selectedConversation === conv.id;

                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200 mb-1 ${
                      isActive
                        ? "glass-btn-primary"
                        : "hover:bg-white/05"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          other?.avatar ||
                          `https://api.dicebear.com/7.x/adventurer/svg?seed=default`
                        }
                        alt={other?.displayName || "Usuario"}
                        className="w-11 h-11 rounded-2xl object-cover border border-white/15 bg-white/10"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {other?.displayName || "Usuario desconocido"}
                      </p>
                      <p className="text-xs text-white/40 truncate mt-0.5">
                        {lastMsg
                          ? (lastMsg.from === "currentUser" ? "Tú: " : "") +
                            lastMsg.text
                          : "Inicia la conversación"}
                      </p>
                    </div>
                    {lastMsg && (
                      <p className="text-xs text-white/25 flex-shrink-0">
                        {lastMsg.time}
                      </p>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── Columna derecha: Chat activo ── */}
        <div
          className={`flex-1 flex flex-col min-w-0 ${
            mobileShowChat ? "flex" : "hidden sm:flex"
          }`}
        >
          {activeConv ? (
            <>
              {/* Header chat */}
              {(() => {
                const other = getOtherUser(activeConv);
                return (
                  <div className="p-4 border-b border-white/8 flex items-center gap-3">
                    <button
                      onClick={() => setMobileShowChat(false)}
                      className="sm:hidden glass-btn w-8 h-8 rounded-xl flex items-center justify-center"
                    >
                      <ArrowLeft size={16} className="text-white/70" />
                    </button>
                    <img
                      src={other?.avatar}
                      alt={other?.displayName}
                      className="w-9 h-9 rounded-xl object-cover border border-white/15 bg-white/10"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">
                        {other?.displayName || "Usuario"}
                      </p>
                      <p className="text-xs text-green-400">En línea</p>
                    </div>
                  </div>
                );
              })()}

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {activeConv.messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-4xl mb-3">🐾</p>
                    <p className="text-white/40 text-sm">
                      ¡Di hola! Empieza la conversación
                    </p>
                  </div>
                )}
                {activeConv.messages.map((msg, index) => {
                  const isMine = msg.from === "currentUser";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"} animate-fadeInUp`}
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl shadow-lg ${
                          isMine
                            ? "bubble-sent rounded-br-sm"
                            : "bubble-received rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm sm:text-base text-white leading-relaxed">
                          {msg.text}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isMine
                              ? "text-white/50 text-right"
                              : "text-white/40"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/8">
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="glass-input flex-1 rounded-2xl px-4 py-3 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) handleSend(e);
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      inputText.trim()
                        ? "glass-btn-primary"
                        : "glass opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="glass rounded-3xl p-10 max-w-xs">
                <p className="text-5xl mb-4">💬</p>
                <h3 className="text-lg font-bold text-white mb-2">
                  Tus mensajes
                </h3>
                <p className="text-white/40 text-sm">
                  Selecciona una conversación para empezar a chatear
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
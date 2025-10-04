import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// Language list with flags and fonts
const languages = [
  { code: "en", name: "English", flag: "🇺🇸", font: "Roboto, sans-serif", dir: "ltr" },
  { code: "es", name: "Spanish", flag: "🇪🇸", font: "Roboto, sans-serif", dir: "ltr" },
  { code: "fr", name: "French", flag: "🇫🇷", font: "Roboto, sans-serif", dir: "ltr" },
  { code: "de", name: "German", flag: "🇩🇪", font: "Roboto, sans-serif", dir: "ltr" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", font: "'Noto Sans', sans-serif", dir: "ltr" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩", font: "'Hind Siliguri', sans-serif", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", font: "'Amiri', serif", dir: "rtl" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳", font: "'Noto Sans SC', sans-serif", dir: "ltr" },
];


const TranslateLang = () => {
     const [selectedLang, setSelectedLang] = useState("en");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Inject Google Translate Script
  useEffect(() => {
    if (!document.querySelector("#google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  // Change language and apply font/dir
  const changeLanguage = (langCode) => {
    const lang = languages.find((l) => l.code === langCode);
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = lang.code;
      selectField.dispatchEvent(new Event("change"));
      setSelectedLang(lang.code);
      localStorage.setItem("language", lang.code);

      // Apply font and direction
      document.body.style.fontFamily = lang.font;
      document.body.dir = lang.dir;
    }
    setDropdownOpen(false);
  };

  // Load persisted language
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    changeLanguage(savedLang);
  }, []);

  const selectedLanguage = languages.find((l) => l.code === selectedLang);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Dropdown Button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#fff",
          userSelect: "none",
        }}
      >
        <span>{selectedLanguage.flag}</span>
        <span>{selectedLanguage.name}</span>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              listStyle: "none",
              margin: 0,
              padding: "4px 0",
              width: "160px",
              zIndex: 1000,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TranslateLang;
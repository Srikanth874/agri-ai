"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AshokaChakra from "@/components/AshokaChakra";
import { Locale, t } from "@/lib/translations";

/* ═══════════════════════════════════════════════════════════════════
   MARKET DATA — 50+ vegetables, fruits, grains & cash crops
   ═══════════════════════════════════════════════════════════════════ */
const marketData = {
  vegetables: [
    { name: "Tomato", emoji: "🍅", price: "₹2,500 – ₹3,200", trend: "up", unit: "/quintal" },
    { name: "Onion", emoji: "🧅", price: "₹1,800 – ₹2,100", trend: "down", unit: "/quintal" },
    { name: "Potato", emoji: "🥔", price: "₹1,200 – ₹1,500", trend: "stable", unit: "/quintal" },
    { name: "Green Chilli", emoji: "🌶️", price: "₹3,500 – ₹4,000", trend: "up", unit: "/quintal" },
    { name: "Cabbage", emoji: "🥬", price: "₹800 – ₹1,100", trend: "stable", unit: "/quintal" },
    { name: "Cauliflower", emoji: "🥦", price: "₹1,000 – ₹1,400", trend: "up", unit: "/quintal" },
    { name: "Brinjal", emoji: "🍆", price: "₹900 – ₹1,300", trend: "stable", unit: "/quintal" },
    { name: "Okra (Ladyfinger)", emoji: "🌿", price: "₹2,200 – ₹2,800", trend: "up", unit: "/quintal" },
    { name: "Bitter Gourd", emoji: "🥒", price: "₹2,500 – ₹3,000", trend: "stable", unit: "/quintal" },
    { name: "Ridge Gourd", emoji: "🥒", price: "₹1,800 – ₹2,200", trend: "down", unit: "/quintal" },
    { name: "Bottle Gourd", emoji: "🥒", price: "₹1,000 – ₹1,400", trend: "stable", unit: "/quintal" },
    { name: "Cucumber", emoji: "🥒", price: "₹1,200 – ₹1,600", trend: "up", unit: "/quintal" },
    { name: "Carrot", emoji: "🥕", price: "₹2,000 – ₹2,500", trend: "up", unit: "/quintal" },
    { name: "Radish", emoji: "🌱", price: "₹600 – ₹900", trend: "down", unit: "/quintal" },
    { name: "Pumpkin", emoji: "🎃", price: "₹700 – ₹1,000", trend: "stable", unit: "/quintal" },
    { name: "Green Peas", emoji: "🟢", price: "₹4,000 – ₹5,500", trend: "up", unit: "/quintal" },
    { name: "Spinach", emoji: "🌿", price: "₹1,500 – ₹2,000", trend: "stable", unit: "/quintal" },
    { name: "Fenugreek", emoji: "🌿", price: "₹2,000 – ₹2,500", trend: "stable", unit: "/quintal" },
    { name: "Garlic", emoji: "🧄", price: "₹10,000 – ₹14,000", trend: "up", unit: "/quintal" },
    { name: "Ginger", emoji: "🫚", price: "₹8,000 – ₹12,000", trend: "up", unit: "/quintal" },
    { name: "Capsicum", emoji: "🫑", price: "₹3,000 – ₹4,500", trend: "stable", unit: "/quintal" },
    { name: "Drumstick", emoji: "🌿", price: "₹5,000 – ₹7,000", trend: "up", unit: "/quintal" },
    { name: "Ash Gourd", emoji: "🍈", price: "₹600 – ₹900", trend: "down", unit: "/quintal" },
    { name: "Cluster Beans", emoji: "🌱", price: "₹3,000 – ₹4,000", trend: "stable", unit: "/quintal" },
  ],
  fruits: [
    { name: "Mango", emoji: "🥭", price: "₹4,000 – ₹8,000", trend: "up", unit: "/quintal" },
    { name: "Banana", emoji: "🍌", price: "₹1,500 – ₹2,200", trend: "stable", unit: "/quintal" },
    { name: "Papaya", emoji: "🍈", price: "₹1,200 – ₹1,800", trend: "stable", unit: "/quintal" },
    { name: "Watermelon", emoji: "🍉", price: "₹800 – ₹1,200", trend: "down", unit: "/quintal" },
    { name: "Grapes", emoji: "🍇", price: "₹6,000 – ₹9,000", trend: "up", unit: "/quintal" },
    { name: "Pomegranate", emoji: "🍎", price: "₹8,000 – ₹14,000", trend: "up", unit: "/quintal" },
    { name: "Guava", emoji: "🍐", price: "₹2,500 – ₹3,500", trend: "stable", unit: "/quintal" },
    { name: "Pineapple", emoji: "🍍", price: "₹3,000 – ₹5,000", trend: "stable", unit: "/quintal" },
    { name: "Coconut", emoji: "🥥", price: "₹1,500 – ₹2,500", trend: "up", unit: "/100 pcs" },
    { name: "Lemon", emoji: "🍋", price: "₹5,000 – ₹8,000", trend: "up", unit: "/quintal" },
    { name: "Orange", emoji: "🍊", price: "₹4,000 – ₹6,000", trend: "stable", unit: "/quintal" },
    { name: "Sapota (Chiku)", emoji: "🟤", price: "₹3,000 – ₹4,500", trend: "stable", unit: "/quintal" },
    { name: "Jackfruit", emoji: "🍈", price: "₹2,000 – ₹4,000", trend: "down", unit: "/quintal" },
    { name: "Custard Apple", emoji: "🍏", price: "₹6,000 – ₹9,000", trend: "up", unit: "/quintal" },
    { name: "Fig", emoji: "🍇", price: "₹12,000 – ₹18,000", trend: "up", unit: "/quintal" },
    { name: "Sweet Lime", emoji: "🍋", price: "₹3,500 – ₹5,000", trend: "stable", unit: "/quintal" },
  ],
  grains: [
    { name: "Rice (Paddy)", emoji: "🌾", price: "₹2,183 – ₹2,400", trend: "stable", unit: "/quintal" },
    { name: "Wheat", emoji: "🌾", price: "₹2,275 – ₹2,500", trend: "up", unit: "/quintal" },
    { name: "Maize (Corn)", emoji: "🌽", price: "₹1,850 – ₹2,100", trend: "stable", unit: "/quintal" },
    { name: "Soybean", emoji: "🫘", price: "₹4,600 – ₹5,200", trend: "up", unit: "/quintal" },
    { name: "Groundnut", emoji: "🥜", price: "₹6,400 – ₹7,000", trend: "up", unit: "/quintal" },
    { name: "Sunflower", emoji: "🌻", price: "₹6,760 – ₹7,200", trend: "stable", unit: "/quintal" },
    { name: "Cotton", emoji: "☁️", price: "₹7,020 – ₹7,500", trend: "up", unit: "/quintal" },
    { name: "Jowar (Sorghum)", emoji: "🌾", price: "₹3,180 – ₹3,500", trend: "stable", unit: "/quintal" },
    { name: "Bajra (Pearl Millet)", emoji: "🌾", price: "₹2,625 – ₹2,800", trend: "stable", unit: "/quintal" },
    { name: "Turmeric", emoji: "🟡", price: "₹8,000 – ₹12,000", trend: "up", unit: "/quintal" },
  ],
};

const LOCATION_KEY = "agri_last_location";
const LOCALE_KEY = "agri_locale";

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function getDayName(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return dayNames[d.getDay()];
}

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up")
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
        ↑ Up
      </span>
    );
  if (trend === "down")
    return (
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold">
        ↓ Down
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 text-[10px] font-bold">
      — Stable
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOCATION SUGGESTION TYPE
   ═══════════════════════════════════════════════════════════════════ */
interface LocationSuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  label: string;
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  /* Language — persist to localStorage */
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (saved && (saved === "en" || saved === "kn" || saved === "hi")) {
      setLocale(saved as Locale);
    }
  }, []);
  const handleLocaleChange = (l: Locale) => {
    setLocale(l);
    localStorage.setItem(LOCALE_KEY, l);
  };

  /* Location */
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showCityInput, setShowCityInput] = useState(false);

  /* Autocomplete */
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  /* Weather */
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  /* AI */
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");

  /* Market */
  const [marketTab, setMarketTab] = useState<"vegetables" | "fruits" | "grains">("vegetables");
  const [marketSearch, setMarketSearch] = useState("");

  /* ─ Close suggestions on outside click ─ */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ─ On mount: load saved location ─ */
  useEffect(() => {
    const saved = localStorage.getItem(LOCATION_KEY);
    if (saved) {
      try {
        const { lat, lon, city } = JSON.parse(saved);
        if (city) fetchWeatherByCity(city);
        else if (lat && lon) fetchWeather(lat, lon);
        else fetchWeather(12.9716, 77.5946);
      } catch {
        fetchWeather(12.9716, 77.5946);
      }
    } else {
      fetchWeather(12.9716, 77.5946);
    }
  }, []);

  /* ─ Autocomplete fetch ─ */
  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const res = await fetch(`/api/location-search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  const onCityInputChange = (val: string) => {
    setCityInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const selectSuggestion = (s: LocationSuggestion) => {
    setCityInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    setShowCityInput(false);
    fetchWeather(s.lat, s.lon);
  };

  /* ─ Fetch weather by coords ─ */
  const fetchWeather = async (lat: number, lon: number) => {
    setLoadingWeather(true);
    setLocationError("");
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        localStorage.setItem(LOCATION_KEY, JSON.stringify({ lat, lon }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWeather(false);
    }
  };

  /* ─ Fetch weather by city ─ */
  const fetchWeatherByCity = async (city: string) => {
    setLoadingWeather(true);
    setLocationError("");
    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        localStorage.setItem(LOCATION_KEY, JSON.stringify({ city }));
        setShowCityInput(false);
        setCityInput("");
      } else {
        setLocationError("City not found. Try another name.");
      }
    } catch {
      setLocationError("Failed to fetch weather for that city.");
    } finally {
      setLoadingWeather(false);
    }
  };

  /* ─ GPS ─ */
  const handleDetectLocation = () => {
    setLoadingLocation(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude);
        setLoadingLocation(false);
      },
      () => {
        setLocationError("Unable to retrieve your location. Try entering a city name.");
        setLoadingLocation(false);
      }
    );
  };

  /* ─ City form submit ─ */
  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) fetchWeatherByCity(cityInput.trim());
  };

  /* ─ AI ─ */
  const handleGetFertilizer = async () => {
    setAiLoading(true);
    try {
      const locName = weather?.location?.name || "my region";
      const temp = weather?.current?.temp_c || "unknown";
      const langLabel = locale === "en" ? "English" : locale === "kn" ? "Kannada" : "Hindi";
      const prompt = `I am a farmer in ${locName}. Current temperature is ${temp}°C. What type of soil is common here, and what crops and fertilizers (with estimated prices) should I use right now? Keep it brief and actionable in ${langLabel}.`;
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, locale }),
      });
      const data = await res.json();
      setAiRecommendation(res.ok ? data.reply : "Sorry, could not generate recommendation at this time.");
    } catch {
      setAiRecommendation("Failed to connect to AI assistant.");
    } finally {
      setAiLoading(false);
    }
  };

  /* ─ Market filter ─ */
  const filteredMarket = marketData[marketTab].filter((item) =>
    item.name.toLowerCase().includes(marketSearch.toLowerCase())
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t(locale, "dashboard.greeting.morning") : hour < 17 ? t(locale, "dashboard.greeting.afternoon") : t(locale, "dashboard.greeting.evening");

  /* ═══════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen text-gray-900 pb-24 relative overflow-hidden">
      {/* ═══ Background decorations ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grassland gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FBF5] via-[#F0F5EA] to-[#E5F0D8]" />
        {/* Saffron glow top-right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-saffron-200/20 blur-[150px]" />
        {/* Green glow bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-agri-200/15 blur-[150px]" />
        {/* Dot pattern */}
        <div className="absolute inset-0 pattern-overlay" />
        {/* Ashoka Chakra centered background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <AshokaChakra size={700} className="chakra-spinner" />
        </div>
        {/* Second smaller chakra bottom-right */}
        <div className="absolute bottom-20 right-10 opacity-[0.025]">
          <AshokaChakra size={350} className="chakra-spinner" />
        </div>
        {/* Tricolor strip at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 via-white to-agri-500" />
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: 5 + i * 3,
              height: 5 + i * 3,
              background: i % 3 === 0 ? "#FF9933" : i % 3 === 1 ? "#138808" : "#000080",
              top: `${10 + i * 11}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* ═══ Navbar ═══ */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100/80 sticky top-0 z-50 shadow-sm">
        <div className="tricolor-ribbon" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron-500 to-agri-500 flex items-center justify-center shadow-md shadow-saffron-500/20">
                  <span className="text-base">🌾</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-agri-400 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-display font-bold text-gray-900">
                  Agri<span className="text-gradient-saffron">Connect</span>
                </span>
                <p className="text-[7px] font-medium tracking-[0.15em] text-gray-400 uppercase hidden sm:block">
                  Freedom to Grow
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher locale={locale} onChange={handleLocaleChange} />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-100 to-agri-100 flex items-center justify-center text-agri-700 font-bold text-sm border border-agri-200/50">
                F
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ Main Content ═══ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ─ Header ─ */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-display font-bold text-gray-900">{greeting}</h1>
              <span className="text-3xl">👋</span>
            </div>
            <p className="text-gray-500 text-sm">{t(locale, "dashboard.subtitle")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              onClick={() => { setShowCityInput(!showCityInput); setSuggestions([]); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur border border-gray-200 rounded-xl hover:bg-white text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {t(locale, "dashboard.searchLocation")}
            </button>
            <button
              onClick={handleDetectLocation}
              disabled={loadingLocation}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-saffron-500/20 hover:shadow-lg transition-all disabled:opacity-50"
            >
              📍 {loadingLocation ? "Detecting…" : t(locale, "dashboard.detectLocation")}
            </button>
          </motion.div>
        </header>

        {/* ─ City search with autocomplete ─ */}
        <AnimatePresence>
          {showCityInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              <form onSubmit={handleCitySubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    autoFocus
                    value={cityInput}
                    onChange={(e) => onCityInputChange(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder="Type a city, village or district name…"
                    className="w-full px-4 py-3 pl-10 rounded-xl bg-white/90 backdrop-blur border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all shadow-sm"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>

                  {/* Autocomplete dropdown */}
                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.div
                        ref={suggestionsRef}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto"
                      >
                        {suggestions.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => selectSuggestion(s)}
                            className="w-full text-left px-4 py-3 hover:bg-saffron-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                          >
                            <span className="text-saffron-500 text-sm">📍</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{s.name}</p>
                              <p className="text-xs text-gray-400">{s.region}, {s.country}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {loadingSuggestions && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-saffron-300 border-t-saffron-600 rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-agri-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => { setShowCityInput(false); setSuggestions([]); }}
                  className="px-3 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-all"
                >
                  ✕
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {locationError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-50/80 backdrop-blur text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2"
          >
            <span>⚠️</span> {locationError}
          </motion.div>
        )}

        {/* ═══ GRID: Weather + AI on left, Location on right ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─ LEFT COLUMN ─ */}
          <div className="lg:col-span-2 space-y-6">

            {/* ▸ WEATHER CARD ◂ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100/80 shadow-sm relative overflow-hidden"
            >
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-50 via-agri-50/30 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none" />
              {/* Mini flag decoration */}
              <div className="absolute top-3 right-3 flex rounded-full overflow-hidden h-1 w-12 opacity-50">
                <div className="flex-1 bg-saffron-500" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-agri-500" />
              </div>

              <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2 relative">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-base">☁️</span>
                {t(locale, "dashboard.todayWeather")}
              </h2>

              {loadingWeather ? (
                <div className="animate-pulse space-y-3">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl" />
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-6 bg-gray-100 rounded w-1/3" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mt-4">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="h-24 bg-gray-100 rounded-xl" />
                    ))}
                  </div>
                </div>
              ) : weather ? (
                <div className="relative">
                  {/* Current conditions */}
                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-4">
                      {weather.current.icon && (
                        <img
                          src={weather.current.icon.startsWith("//") ? `https:${weather.current.icon}` : weather.current.icon}
                          alt="weather"
                          className="w-16 h-16 object-contain drop-shadow-sm"
                        />
                      )}
                      <div>
                        <div className="text-5xl font-display font-black text-gray-900 leading-none">
                          {weather.current.temp_c}°
                          <span className="text-lg font-normal text-gray-400 ml-0.5">C</span>
                        </div>
                        <div className="text-gray-500 font-medium mt-1">{weather.current.condition}</div>
                      </div>
                    </div>
                    <div className="border-l border-gray-200/60 pl-6 space-y-1.5 text-sm">
                      <div className="text-gray-500 flex items-center gap-2">
                        <span className="w-5 text-center">📍</span>
                        <span className="font-medium text-gray-700">{weather.location.name}, {weather.location.region}</span>
                      </div>
                      <div className="text-gray-500 flex items-center gap-2">
                        <span className="w-5 text-center">💧</span> Humidity: {weather.current.humidity}%
                      </div>
                      <div className="text-gray-500 flex items-center gap-2">
                        <span className="w-5 text-center">💨</span> Wind: {weather.current.wind_kph} km/h {weather.current.wind_dir}
                      </div>
                      <div className="text-gray-500 flex items-center gap-2">
                        <span className="w-5 text-center">🌡️</span> Feels like: {weather.current.feelslike_c}°C
                      </div>
                      <div className="text-gray-500 flex items-center gap-2">
                        <span className="w-5 text-center">☀️</span> UV Index: {weather.current.uv}
                      </div>
                    </div>
                  </div>

                  {/* Agriculture tips */}
                  {weather.agriculture?.tips?.length > 0 && (
                    <div className="bg-gradient-to-r from-agri-50/60 to-blue-50/40 rounded-xl p-4 border border-agri-100/60 mb-6">
                      <h4 className="text-sm font-display font-bold text-agri-800 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-agri-100 flex items-center justify-center text-xs">🌾</span>
                        {t(locale, "dashboard.farmingAdvice")}
                      </h4>
                      <ul className="space-y-1.5">
                        {weather.agriculture.tips.map((tip: string, idx: number) => (
                          <li key={idx} className="text-sm text-agri-700 flex items-start gap-2">
                            <span className="mt-0.5 text-agri-400">•</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ▸ 7-DAY FORECAST ◂ */}
                  {weather.forecast?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-display font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center text-xs">📅</span>
                        {t(locale, "dashboard.forecast")}
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                        {weather.forecast.map((day: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`rounded-xl p-3 text-center border transition-all cursor-default ${
                              idx === 0
                                ? "bg-gradient-to-b from-saffron-50 to-agri-50 border-saffron-200/60 shadow-sm ring-1 ring-saffron-100/50"
                                : "bg-white/60 border-gray-100 hover:bg-white hover:shadow-sm"
                            }`}
                          >
                            <p className={`text-xs font-bold mb-1.5 ${idx === 0 ? "text-saffron-700" : "text-gray-500"}`}>
                              {getDayName(day.date)}
                            </p>
                            {day.icon && (
                              <img
                                src={day.icon.startsWith("//") ? `https:${day.icon}` : day.icon}
                                alt={day.condition}
                                className="w-8 h-8 object-contain mx-auto mb-1"
                              />
                            )}
                            <p className="text-sm font-bold text-gray-800">{Math.round(day.maxtemp_c)}°</p>
                            <p className="text-xs text-gray-400">{Math.round(day.mintemp_c)}°</p>
                            <div className="mt-1 flex items-center justify-center gap-0.5">
                              <span className="text-blue-400 text-[10px]">💧</span>
                              <span className={`text-[10px] font-semibold ${Number(day.chance_of_rain) > 50 ? "text-blue-600" : "text-gray-400"}`}>
                                {day.chance_of_rain}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm py-8 text-center">Weather data unavailable. Try refreshing your location.</p>
              )}
            </motion.div>

            {/* ▸ AI RECOMMENDATION ◂ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100/80 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-saffron-50/40 to-transparent rounded-full -translate-y-1/2 -translate-x-1/3 opacity-60 pointer-events-none" />
              <div className="flex items-center justify-between mb-4 relative">
                <h2 className="text-lg font-display font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron-100 to-agri-100 flex items-center justify-center text-base">🤖</span>
                  {t(locale, "dashboard.aiAdvisor")}
                </h2>
                <button
                  onClick={handleGetFertilizer}
                  disabled={aiLoading}
                  className="px-4 py-2.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-saffron-500/15 disabled:opacity-50 flex items-center gap-2"
                >
                  {aiLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Thinking…
                    </>
                  ) : (
                    t(locale, "dashboard.getAiAdvice")
                  )}
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-agri-50/20 rounded-xl p-5 min-h-[140px] text-sm text-gray-700 whitespace-pre-wrap border border-gray-100/80 relative">
                {aiRecommendation ? (
                  aiRecommendation
                ) : (
                  <div className="text-gray-400 text-center py-6 space-y-2">
                    <div className="text-3xl">🌾</div>
                    <p>{t(locale, "dashboard.aiPlaceholder")}</p>
                    <p className="text-xs text-gray-300">{t(locale, "dashboard.aiSubtext")}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ─ RIGHT COLUMN ─ */}
          <div className="space-y-6">
            {/* ▸ LOCATION & SOIL ◂ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-agri-100/80 shadow-sm"
            >
              {/* Card background with mini flag gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-agri-50 via-white to-saffron-50/30" />
              {/* Mini Ashoka Chakra watermark */}
              <div className="absolute bottom-2 right-2 opacity-[0.05]">
                <AshokaChakra size={120} className="chakra-spinner" />
              </div>
              <div className="relative p-6">
                <h2 className="text-lg font-display font-bold text-agri-900 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-agri-100 flex items-center justify-center text-sm">📍</span>
                  {t(locale, "dashboard.locationSoil")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-agri-600 uppercase tracking-wider mb-1">{t(locale, "dashboard.region")}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {weather?.location?.name ? `${weather.location.name}, ${weather.location.region}` : "Not detected"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-agri-600 uppercase tracking-wider mb-1">{t(locale, "dashboard.soilEstimate")}</p>
                    <p className="text-sm font-medium text-gray-800">
                      {weather?.location?.region?.toLowerCase().includes("karnataka")
                        ? "🟤 Red Soil / Laterite"
                        : weather?.location?.region?.toLowerCase().includes("maharashtra")
                        ? "⬛ Black Cotton Soil"
                        : weather?.location?.region?.toLowerCase().includes("punjab")
                        ? "🟡 Alluvial Soil"
                        : weather?.location?.region?.toLowerCase().includes("rajasthan")
                        ? "🏜️ Sandy / Desert Soil"
                        : weather?.location?.region?.toLowerCase().includes("kerala")
                        ? "🟤 Laterite / Sandy Soil"
                        : weather?.location?.region?.toLowerCase().includes("tamil")
                        ? "🔴 Red / Alluvial Soil"
                        : "Use AI Advisor for soil analysis"}
                    </p>
                  </div>
                  {weather?.current && (
                    <div className="pt-3 border-t border-agri-200/40 grid grid-cols-2 gap-2">
                      <div className="bg-white/70 rounded-xl p-3 text-center border border-agri-100/50">
                        <p className="text-2xl font-display font-black text-agri-700">{weather.current.temp_c}°</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">{t(locale, "dashboard.temperature")}</p>
                      </div>
                      <div className="bg-white/70 rounded-xl p-3 text-center border border-blue-100/50">
                        <p className="text-2xl font-display font-black text-blue-600">{weather.current.humidity}%</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">{t(locale, "dashboard.humidity")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ▸ QUICK ALERTS ◂ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 border border-gray-100/80 shadow-sm"
            >
              <h3 className="text-sm font-display font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-saffron-50 flex items-center justify-center text-xs">🔔</span>
                {t(locale, "dashboard.smartAlerts")}
              </h3>
              <div className="space-y-2">
                {weather?.forecast?.[0]?.chance_of_rain > 50 && (
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-50/60 border border-blue-100/60">
                    <span className="text-sm mt-0.5">🌧️</span>
                    <div>
                      <p className="text-xs font-semibold text-blue-800">Rain Alert</p>
                      <p className="text-[11px] text-blue-600">{weather.forecast[0].chance_of_rain}% chance of rain today</p>
                    </div>
                  </div>
                )}
                {weather?.current?.temp_c > 35 && (
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-50/60 border border-red-100/60">
                    <span className="text-sm mt-0.5">🌡️</span>
                    <div>
                      <p className="text-xs font-semibold text-red-800">Heat Alert</p>
                      <p className="text-[11px] text-red-600">High temperature — increase irrigation</p>
                    </div>
                  </div>
                )}
                {weather?.current?.humidity > 80 && (
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/60 border border-amber-100/60">
                    <span className="text-sm mt-0.5">🍄</span>
                    <div>
                      <p className="text-xs font-semibold text-amber-800">Humidity Alert</p>
                      <p className="text-[11px] text-amber-700">High humidity — watch for fungal diseases</p>
                    </div>
                  </div>
                )}
                {weather?.agriculture?.irrigationNeeded && (
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-cyan-50/60 border border-cyan-100/60">
                    <span className="text-sm mt-0.5">💧</span>
                    <div>
                      <p className="text-xs font-semibold text-cyan-800">Irrigation Needed</p>
                      <p className="text-[11px] text-cyan-600">Low rain chance & warm — water your crops</p>
                    </div>
                  </div>
                )}
                {!weather?.forecast?.[0]?.chance_of_rain &&
                 !weather?.current?.temp_c &&
                 !weather?.current?.humidity && (
                  <p className="text-xs text-gray-400 text-center py-2">{t(locale, "dashboard.noAlerts")}</p>
                )}
                {weather && (weather.forecast?.[0]?.chance_of_rain <= 50 && weather.current?.temp_c <= 35 && weather.current?.humidity <= 80 && !weather.agriculture?.irrigationNeeded) && (
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-agri-50/60 border border-agri-100/60">
                    <span className="text-sm mt-0.5">✅</span>
                    <div>
                      <p className="text-xs font-semibold text-agri-800">{t(locale, "dashboard.allClear")}</p>
                      <p className="text-[11px] text-agri-600">{t(locale, "dashboard.allClearMsg")}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ MARKET PRICES ═══ Full width section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-100/80 shadow-sm relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-agri-50/30 to-transparent rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 relative">
            <div>
              <h2 className="text-lg font-display font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-saffron-50 flex items-center justify-center text-base">📊</span>
                {t(locale, "dashboard.marketPrices")}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5 ml-10">{t(locale, "dashboard.marketSubtext")}</p>
            </div>
            <div className="relative">
              <input
                value={marketSearch}
                onChange={(e) => setMarketSearch(e.target.value)}
                placeholder={t(locale, "dashboard.searchCrop")}
                className="px-4 py-2.5 pl-9 rounded-xl border border-gray-200 text-sm bg-white/80 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all w-full sm:w-56"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-5 flex-wrap relative">
            {(["vegetables", "fruits", "grains"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setMarketTab(tab); setMarketSearch(""); }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                  marketTab === tab
                    ? "bg-gradient-to-r from-saffron-500 to-agri-500 text-white shadow-lg shadow-saffron-500/15"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
                }`}
              >
                {tab === "vegetables" ? `🥦 ${t(locale, "dashboard.vegetables")}` : tab === "fruits" ? `🍎 ${t(locale, "dashboard.fruits")}` : `🌾 ${t(locale, "dashboard.grains")}`}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 relative">
            {filteredMarket.length > 0 ? (
              filteredMarket.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100/80 bg-white/60 hover:bg-white hover:shadow-md hover:border-saffron-100 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl w-7 text-center">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.unit}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-gray-900">{item.price}</p>
                    <TrendBadge trend={item.trend} />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400 text-sm">
                No results for &quot;{marketSearch}&quot;
              </div>
            )}
          </div>

          <div className="mt-5 text-xs text-center text-gray-400 relative">
            * {t(locale, "dashboard.marketDisclaimer")}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

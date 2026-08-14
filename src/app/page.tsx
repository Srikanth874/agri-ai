"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import AshokaChakra from "@/components/AshokaChakra";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Locale, t } from "@/lib/translations";

/* ================================================================
   NAVIGATION
   ================================================================ */
function Navbar({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { key: "nav.home", href: "#" },
    { key: "nav.features", href: "#features" },
    { key: "nav.weather", href: "#weather" },
    { key: "nav.market", href: "#market" },
    { key: "nav.cropHealth", href: "#crop-health" },
    { key: "nav.agriAI", href: "#agri-ai" },
    { key: "nav.about", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md shadow-gray-200/50 border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-agri-500 flex items-center justify-center shadow-md">
                <span className="text-xl">🌾</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-agri-400 rounded-full animate-pulse" />
            </div>
            <div>
              <span className={`text-xl font-display font-bold transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}>
                Agri<span className={scrolled ? "text-gradient-saffron" : "text-saffron-300"}>Connect</span>
              </span>
              <p className={`text-[8px] font-medium tracking-[0.15em] uppercase hidden sm:block transition-colors ${
                scrolled ? "text-gray-400" : "text-white/60"
              }`}>
                Freedom to Grow
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t(locale, item.key)}
            </a>
          ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <Link
              href="/login"
              className={`hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
                  : "text-white/80 hover:text-white border border-white/30 hover:bg-white/10"
              }`}
            >
              {t(locale, "nav.login")}
            </Link>
            <Link
              href="/signup"
              className="hidden sm:inline-flex px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl shadow-md shadow-saffron-500/20 hover:shadow-lg hover:shadow-saffron-500/30 transition-all"
            >
              {t(locale, "nav.signup")}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden pb-4 border-t border-gray-100"
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {t(locale, item.key)}
              </a>
            ))}
            <div className="flex gap-2 mt-3 px-4">
              <Link href="/login" className="flex-1 text-center py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium">
                {t(locale, "nav.login")}
              </Link>
              <Link href="/signup" className="flex-1 text-center py-2.5 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl text-white font-semibold text-sm">
                {t(locale, "nav.signup")}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

/* ================================================================
   HERO SECTION
   ================================================================ */
function HeroSection({ locale }: { locale: Locale }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const bgY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen background image with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20 pointer-events-none"
      >
        <img
          src="/hero-bg.jpg"
          alt="Indian farmland at sunset"
          className="w-full h-full object-cover object-center scale-110"
        />
      </motion.div>

      {/* Multi-layer overlay for premium text readability */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark gradient overlay bottom-to-top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        {/* Saffron-tinted top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        {/* Subtle color grade to match brand */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-green-900/20" />
        {/* Ashoka Chakra watermark */}
        <div className="absolute top-1/3 right-1/4 opacity-[0.06]">
          <AshokaChakra size={400} className="chakra-spinner" />
        </div>
      </div>

      <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        {/* Independence badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
          <span className="text-sm font-medium text-white/90">
            {t(locale, "hero.badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-display font-black leading-[0.95] mb-6 drop-shadow-2xl"
        >
          <span className="text-saffron-300">{t(locale, "hero.title1")}</span>
          <br />
          <span className="text-green-300">{t(locale, "hero.title2")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/80 mb-10 leading-relaxed drop-shadow"
        >
          {t(locale, "hero.subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/signup"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-bold text-lg shadow-xl shadow-saffron-500/40 hover:shadow-2xl hover:shadow-saffron-500/60 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            {t(locale, "hero.cta1")} →
          </Link>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:border-white/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            {t(locale, "hero.cta2")}
          </a>
        </motion.div>


      </motion.div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FAFBF8] via-[#FAFBF8]/60 to-transparent" />
    </section>
  );
}

/* ================================================================
   FEATURES SECTION
   ================================================================ */
const featureData = [
  { icon: "🌤️", titleKey: "features.weather.title", descKey: "features.weather.desc", accent: "bg-blue-50 border-blue-200", iconBg: "from-blue-100 to-blue-50" },
  { icon: "🌱", titleKey: "features.crop.title", descKey: "features.crop.desc", accent: "bg-green-50 border-green-200", iconBg: "from-green-100 to-green-50" },
  { icon: "📊", titleKey: "features.market.title", descKey: "features.market.desc", accent: "bg-saffron-50 border-saffron-200", iconBg: "from-saffron-100 to-saffron-50" },

  { icon: "💧", titleKey: "features.irrigation.title", descKey: "features.irrigation.desc", accent: "bg-cyan-50 border-cyan-200", iconBg: "from-cyan-100 to-cyan-50" },
  { icon: "🧪", titleKey: "features.fertilizer.title", descKey: "features.fertilizer.desc", accent: "bg-purple-50 border-purple-200", iconBg: "from-purple-100 to-purple-50" },
];

function FeaturesSection({ locale }: { locale: Locale }) {
  return (
    <section id="features" className="py-24 relative bg-[#FAFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 rounded-full bg-agri-50 border border-agri-200 text-agri-700 text-sm font-medium mb-4"
          >
            {t(locale, "features.badge")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            {t(locale, "features.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto text-gray-500"
          >
            {t(locale, "features.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-6 hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconBg} border ${feature.accent.split(" ")[1]} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                {t(locale, feature.titleKey)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(locale, feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   AGRI AI SECTION
   ================================================================ */
function AgriAISection({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [typing, setTyping] = useState(false);

  const exampleQuestions = [
    t(locale, "agriai.example1"),
    t(locale, "agriai.example2"),
    t(locale, "agriai.example3"),
  ];

  const handleSend = async (text?: string) => {
    const q = text || query;
    if (!q.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuery("");
    setTyping(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, locale }),
      });
      const data = await res.json();
      const reply = res.ok
        ? data.reply
        : "Sorry, I could not get a response right now. Please try again.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Failed to connect to AI assistant. Please check your connection." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <section id="agri-ai" className="py-24 relative bg-gradient-to-b from-[#FAFBF8] to-[#F0F5E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-700 text-sm font-medium mb-4">
            {t(locale, "agriai.badge")}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
            {t(locale, "agriai.title")}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-gray-500 max-w-lg mx-auto">
            {t(locale, "agriai.subtitle")}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card overflow-hidden">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-agri-50 to-saffron-50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron-500 to-agri-500 flex items-center justify-center text-sm">🤖</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">AgriAI Assistant</p>
              <p className="text-xs text-agri-600">Online • Ready to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🌾</div>
                <p className="text-gray-400 text-sm mb-6">Ask me anything about farming, crops, or agriculture</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {exampleQuestions.map((q, i) => (
                    <button key={i} onClick={() => handleSend(q)}
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs hover:bg-saffron-50 hover:border-saffron-200 hover:text-saffron-700 transition-all shadow-sm">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-saffron-500 text-white rounded-br-md shadow-md"
                    : "bg-white text-gray-700 rounded-bl-md border border-gray-100 shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-gray-100 bg-white">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder={t(locale, "agriai.placeholder")}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all" />
              <button type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-agri-500 text-white font-semibold text-sm hover:shadow-lg transition-all shadow-md">
                {t(locale, "agriai.send")}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-agri-500 flex items-center justify-center">
                <span className="text-xl">🌾</span>
              </div>
              <span className="text-xl font-display font-bold text-gray-900">
                Agri<span className="text-gradient-saffron">Connect</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{t(locale, "footer.tagline")}</p>
            <div className="flex rounded-full overflow-hidden h-1 w-24">
              <div className="flex-1 bg-saffron-500" />
              <div className="flex-1 bg-gray-300" />
              <div className="flex-1 bg-agri-500" />
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-4">{t(locale, "footer.quicklinks")}</h4>
            <ul className="space-y-2.5">
              {["nav.features", "nav.weather", "nav.market", "nav.cropHealth", "nav.agriAI"].map((key) => (
                <li key={key}><a href="#" className="text-sm text-gray-500 hover:text-saffron-600 transition-colors">{t(locale, key)}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-4">{t(locale, "footer.languages")}</h4>
            <ul className="space-y-2.5">
              {[
                { name: "English", flag: "🇬🇧" },
                { name: "ಕನ್ನಡ", flag: "🇮🇳" },
                { name: "हिंदी", flag: "🇮🇳" },
              ].map((lang) => (
                <li key={lang.name}>
                  <button className="text-sm text-gray-500 hover:text-saffron-600 transition-colors flex items-center gap-2">
                    <span>{lang.flag}</span> {lang.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-4">{t(locale, "footer.contact")}</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li className="flex items-center gap-2"><span>📧</span> support@agriconnect.in</li>
              <li className="flex items-center gap-2"><span>📞</span> 1800-AGRI-HELP</li>
              <li className="flex items-center gap-2"><span>📍</span> Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">{t(locale, "footer.rights")}</p>
          <p className="text-xs text-gray-400">{t(locale, "footer.madeWith")}</p>
        </div>
      </div>

      <div className="h-1">
        <div className="h-full bg-gradient-to-r from-saffron-500 via-gray-200 to-agri-500" />
      </div>
    </footer>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <>
      <div className="tricolor-ribbon" />
      <Navbar locale={locale} setLocale={setLocale} />
      <HeroSection locale={locale} />
      <FeaturesSection locale={locale} />
      <AgriAISection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}

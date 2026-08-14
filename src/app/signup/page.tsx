"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AshokaChakra from "@/components/AshokaChakra";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Locale, t } from "@/lib/translations";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function SignupPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await new Promise((r) => setTimeout(r, 1500));
      window.location.href = "/dashboard";
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-500/20 transition-all text-sm";

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FAFBF8] via-[#F5F8F0] to-[#F0F5E8]">
      <div className="tricolor-ribbon" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-saffron-300/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-agri-300/15 blur-[120px]" />
        <div className="absolute inset-0 pattern-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          <AshokaChakra size={600} className="chakra-spinner" />
        </div>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher locale={locale} onChange={setLocale} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-500 to-agri-500 flex items-center justify-center shadow-lg shadow-saffron-500/20">
                <span className="text-2xl">🌾</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  Agri<span className="text-gradient-saffron">Connect</span>
                </h1>
                <p className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase">Freedom to Grow</p>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">{t(locale, "signup.title")}</h2>
              <p className="text-gray-500 text-sm">{t(locale, "signup.subtitle")}</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1.5">{t(locale, "signup.name")}</label>
                <input id="signup-name" type="text" value={formData.name} onChange={(e) => update("name", e.target.value)} required className={inputClass} placeholder="Ramesh Kumar" />
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1.5">{t(locale, "signup.email")}</label>
                <input id="signup-email" type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required className={inputClass} placeholder="farmer@agriconnect.in" />
              </div>

              <div>
                <label htmlFor="signup-phone" className="block text-sm font-medium text-gray-700 mb-1.5">{t(locale, "signup.phone")}</label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 text-sm font-medium">+91</span>
                  <input id="signup-phone" type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required className={`flex-1 ${inputClass}`} placeholder="98765 43210" />
                </div>
              </div>

              <div>
                <label htmlFor="signup-state" className="block text-sm font-medium text-gray-700 mb-1.5">{t(locale, "signup.state")}</label>
                <select id="signup-state" value={formData.state} onChange={(e) => update("state", e.target.value)} required className={`${inputClass} appearance-none`}>
                  <option value="">Select State</option>
                  {indianStates.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1.5">{t(locale, "signup.password")}</label>
                  <input id="signup-password" type="password" value={formData.password} onChange={(e) => update("password", e.target.value)} required className={inputClass} placeholder="••••••••" />
                </div>
                <div>
                  <label htmlFor="signup-confirm" className="block text-sm font-medium text-gray-700 mb-1.5">{t(locale, "signup.confirmPassword")}</label>
                  <input id="signup-confirm" type="password" value={formData.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required className={inputClass} placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-agri-500 to-agri-600 hover:from-agri-600 hover:to-agri-700 text-white font-semibold text-sm shadow-lg shadow-agri-500/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Creating account...
                  </>
                ) : t(locale, "signup.submit")}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {t(locale, "signup.hasAccount")}{" "}
              <Link href="/login" className="text-saffron-600 hover:text-saffron-700 font-semibold transition-colors">{t(locale, "signup.loginLink")}</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

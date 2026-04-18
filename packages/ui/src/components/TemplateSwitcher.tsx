"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Rocket, Layout, ShoppingCart, ExternalLink, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Template {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const templates: Template[] = [
  {
    id: "landing",
    name: "Landing Page",
    description: "High-conversion lead generation",
    url: "https://templates-nexxa.vercel.app",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "website",
    name: "Site Vitrine",
    description: "Professional business presence",
    url: "https://website-olvl0b3gx-valentins-projects-7cad2c95.vercel.app",
    icon: <Layout className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Full-featured online store",
    url: "https://templatesdeploy.vercel.app",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "from-orange-500 to-amber-400",
  },
];

export function TemplateSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host;
      if (host.includes("3001")) setCurrentApp("landing");
      else if (host.includes("3002")) setCurrentApp("website");
      else if (host.includes("3003")) setCurrentApp("ecommerce");
    }
  }, []);

  const activeTemplate = templates.find((t) => t.id === currentApp) || templates[1];

  return (
    <div className="relative z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-md hover:bg-foreground/5 transition-all duration-300 group shadow-sm overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-md bg-gradient-to-br ${activeTemplate.color} text-white`}>
            {activeTemplate.icon}
          </div>
          <span className="font-medium text-sm hidden sm:inline-block">Découvrir</span>
          <ChevronDown className={`w-4 h-4 text-foreground/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[-1]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10, x: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10, x: -20 }}
              className="absolute top-full mt-3 right-0 w-80 rounded-2xl border border-foreground/10 bg-background/90 backdrop-blur-xl shadow-2xl p-2 overflow-hidden"
            >
              <div className="px-4 py-3 mb-2 border-b border-foreground/5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/40">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Solutions Disponibles
                </div>
              </div>
              
              <div className="space-y-1">
                {templates.map((template) => (
                  <a
                    key={template.id}
                    href={template.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-200 group ${
                      currentApp === template.id 
                      ? 'bg-foreground/5 border-foreground/10' 
                      : 'hover:bg-foreground/5 border-transparent'
                    } border`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${template.color} text-white shadow-lg shadow-opacity-20`}>
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold truncate">{template.name}</span>
                        {currentApp === template.id ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        ) : (
                          <ExternalLink className="w-3 h-3 text-foreground/20 group-hover:text-foreground/60 transition-colors" />
                        )}
                      </div>
                      <p className="text-xs text-foreground/50 leading-relaxed mt-0.5">
                        {template.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-2 p-3 bg-foreground/5 rounded-xl text-[10px] text-center text-foreground/30">
                Switch instantanément entre les démos
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

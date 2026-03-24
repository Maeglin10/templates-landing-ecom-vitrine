"use client";
import { Button, Container, Section } from "@repo/ui";
import { ShoppingBag, ArrowRight, Search, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function EcommercePage() {
  const products = [
    { title: "Minimal Alpha Chair", price: "$499", rating: 4.9, img: "bg-stone-200" },
    { title: "Concrete Desk Lamp", price: "$129", rating: 4.7, img: "bg-stone-300" },
    { title: "Lounge Concept Sofa", price: "$1,899", rating: 5.0, img: "bg-stone-200" },
    { title: "Monochrome Planter", price: "$85", rating: 4.8, img: "bg-stone-300" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24 bg-stone-50 dark:bg-neutral-950">
      
      {/* Navigation Layer */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-stone-200/50 dark:border-white/5 bg-white/80 dark:bg-black/50 backdrop-blur-2xl">
        <Container className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <ShoppingBag className="h-6 w-6" />
            <span className="translate-y-px">Aura.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-stone-500">
            <a href="#" className="hover:text-stone-900 dark:hover:text-white transition-colors">Shop</a>
            <a href="#" className="hover:text-stone-900 dark:hover:text-white transition-colors">Collections</a>
            <a href="#" className="hover:text-stone-900 dark:hover:text-white transition-colors">Designers</a>
            <a href="#" className="hover:text-stone-900 dark:hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button className="rounded-full px-6 bg-stone-900 hover:bg-stone-800 text-white shadow-xl shadow-stone-900/10">
              Cart (0)
            </Button>
          </div>
        </Container>
      </nav>

      {/* Hero Interactive */}
      <Section className="relative pt-32 lg:pt-48 mt-12 overflow-visible" spacing="none">
        <Container className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[2/1] md:aspect-[3/1] bg-stone-200 dark:bg-stone-900 rounded-[3rem] overflow-hidden group flex items-center justify-center isolation-auto shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            
            <div className="relative z-20 flex flex-col items-center text-white p-8 max-w-2xl transform translate-y-12 group-hover:translate-y-8 transition-transform duration-700">
              <span className="uppercase tracking-[0.2em] text-xs font-bold mb-4 opacity-80 mix-blend-overlay">New Collection</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">The Brutalist Series</h1>
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-stone-100 hover:scale-105 transition-all w-fit">
                Explore Collection
              </Button>
            </div>
            
            {/* Abstract Design Elements */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-stone-300 dark:bg-stone-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-float" />
          </motion.div>
        </Container>
      </Section>

      {/* Product Grid */}
      <Section animated id="products" spacing="xl">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tighter mb-2">Curated Editions</h2>
              <p className="text-stone-500 font-medium">Elevate your space with iconic pieces.</p>
            </div>
            <Button variant="ghost" className="font-semibold" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, i) => (
              <motion.div 
                key={i} 
                className="group cursor-pointer flex flex-col gap-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-full aspect-[4/5] ${product.img} rounded-[2rem] overflow-hidden relative shadow-inner p-4 flex flex-col justify-between`}>
                  <div className="self-end bg-white/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    New
                  </div>
                  
                  {/* Fake "add to cart" overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <Button className="w-full bg-black/80 backdrop-blur-md text-white border border-white/10 rounded-2xl shadow-xl h-12">
                      Quick Add — {product.price}
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 px-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg tracking-tight leading-tight max-w-[80%]">{product.title}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold mt-1">
                      <Star className="h-3 w-3 fill-stone-900" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <span className="text-stone-500 font-medium">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

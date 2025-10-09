"use client"

import { motion } from "framer-motion";
import { HardHat, Wrench, Construction } from "lucide-react";

export function EmConstrucao() {
  return (
    <div className="flex flex-col items-center justify-center  text-white text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-4">
          <HardHat className="w-10 h-10 text-yellow-400 animate-bounce" />
          <h1 className="text-4xl font-bold">Em Construção 🚧</h1>
        </div>

        <p className="text-slate-300 max-w-md mb-6">
          Calma, engenheiro! Essa página ainda está passando por reformas — estamos
          colocando os <span className="text-yellow-400">parafusos</span> no lugar certo!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 text-slate-200">
          <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-3">
            <Wrench className="w-5 h-5 text-yellow-400" />
            <span>“Estamos aparafusando ideias.”</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-3">
            <Construction className="w-5 h-5 text-yellow-400" />
            <span>“Volte depois, sem martelar a paciência!”</span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-10 flex items-center gap-3 bg-yellow-400 text-slate-900 font-semibold py-2 px-5 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          <HardHat className="w-5 h-5" />
          <span>Voltamos em breve!</span>
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-4 text-xs text-slate-500">
        Feito com ☕ e muito código por alguém que ainda está construindo sonhos. Assinado: Equipe Oportune :)
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function EmptyState({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-black/07 bg-white p-14 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-champagne/08 border border-champagne/15">
        <ShoppingBag size={28} className="text-champagne/60" />
      </div>
      <h3 className="text-2xl font-bold font-heading text-stone">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone/55">
        {description}
      </p>
      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </motion.div>
  );
}

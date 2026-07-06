import { motion } from "framer-motion";

export function EmptyState({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-[2rem] p-10 text-center shadow-2xl shadow-black/30"
    >
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 shadow-lg shadow-black/10">
        <div className="h-8 w-8 rounded-full bg-white/5 shadow-inner shadow-white/5" />
      </div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/65">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </motion.div>
  );
}

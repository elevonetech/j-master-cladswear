import { motion } from "framer-motion";

export function EmptyState({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-[2rem] bg-[#f8f8f8] p-10 text-center"
    >
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <div className="h-8 w-8 rounded-full bg-[#eee]" />
      </div>
      <h3 className="text-2xl font-semibold text-[#111]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#666]">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </motion.div>
  );
}

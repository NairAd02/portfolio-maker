"use client";
import { motion, Variants } from "framer-motion";
import { SearchX } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export default function EmptyContent({
  title = "No hay elementos disponibles",
  description = "No se encontraron elementos para mostrar",
}: Props) {
  const iconVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-muted p-8 text-center dark:border-gray-800 dark:bg-gray-950/50">
      <motion.div
        className="rounded-full bg-primary p-4 dark:bg-white"
        initial="hidden"
        animate="visible"
        variants={iconVariants}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatAnimation}
        >
          <SearchX className="h-12 w-12 text-secondary" />
        </motion.div>
      </motion.div>
      <motion.h3
        className="mt-4 text-secondary text-lg sm:text-3xl font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="mt-6 text-sm sm:text-xl text-secondary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
    </div>
  );
}

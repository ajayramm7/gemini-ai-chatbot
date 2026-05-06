import { motion } from 'framer-motion';

export default function Button({
  children,
  className = '',
  variant = 'primary',
  icon: Icon,
  title,
  ...props
}) {
  const styles = {
    primary: 'bg-white text-ink hover:bg-cyan-100',
    ghost: 'bg-white/7 text-white hover:bg-white/12 border border-white/10',
    accent: 'bg-cyan-300 text-ink hover:bg-cyan-200',
    danger: 'bg-coral/20 text-coral hover:bg-coral/30 border border-coral/30'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      title={title}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </motion.button>
  );
}

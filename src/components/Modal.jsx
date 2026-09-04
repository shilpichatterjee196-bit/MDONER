import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  icon: Icon
}) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={`relative bg-white rounded-2xl shadow-elevated border border-[#E2E8F0] w-full ${maxWidth} z-10 overflow-hidden will-change-transform flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-[#E2E8F0] gap-3 min-w-0">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {Icon && (
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3
                    id="modal-title"
                    className="text-base font-bold text-[#111827] leading-snug break-words line-clamp-2"
                    title={title}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <p
                      className="text-xs text-[#64748B] mt-0.5 leading-relaxed break-words line-clamp-2"
                      title={subtitle}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto min-w-0 break-words flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

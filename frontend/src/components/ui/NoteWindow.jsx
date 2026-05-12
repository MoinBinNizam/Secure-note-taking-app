import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const NoteWindow = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 20 }} 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    >
        <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-500" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 bg-slate-50">
                {children}
            </div>
        </div>
    </motion.div>
  );
};

export default NoteWindow;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SignUpFormData {
  type: 'email' | 'phone';
  value: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CustomButton: React.FC<{
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}> = ({ onClick, className = '', disabled, type = 'button', variant = 'primary', children }) => {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all";
  const variantStyles = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400"
    : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-400 disabled:text-blue-400";
  
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    type: 'email',
    value: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Validation
    if (!formData.value) {
      setError('Please enter a valid email or phone number');
      setLoading(false);
      return;
    }

    if (formData.type === 'email' && !formData.value.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.type === 'phone' && !/^\d{10}$/.test(formData.value.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSuccess('Thanks for subscribing! You'll receive our updates soon.');
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/api/placeholder/1920/1080"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center relative z-10">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to JerseyGirl
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl mb-8 max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Serving up local favorites and weekly specials right to your inbox or phone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CustomButton onClick={() => setIsModalOpen(true)}>
              Sign Up for Specials
            </CustomButton>
          </motion.div>
        </div>
      </header>

      {/* Rest of the sections remain the same until the Modal */}

      {/* Sign Up Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4">Sign Up for Weekly Specials</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4">
            <CustomButton
              onClick={() => setFormData(prev => ({ ...prev, type: 'email', value: '' }))}
              variant={formData.type === 'email' ? 'primary' : 'outline'}
              className="flex-1"
            >
              Email
            </CustomButton>
            <CustomButton
              onClick={() => setFormData(prev => ({ ...prev, type: 'phone', value: '' }))}
              variant={formData.type === 'phone' ? 'primary' : 'outline'}
              className="flex-1"
            >
              Phone
            </CustomButton>
          </div>

          <input
            type={formData.type === 'email' ? 'email' : 'tel'}
            placeholder={formData.type === 'email' ? 'Enter your email' : 'Enter your phone number'}
            value={formData.value}
            onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg">
              {success}
            </div>
          )}

          <CustomButton
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </CustomButton>
        </form>
      </Modal>
    </div>
  );
}

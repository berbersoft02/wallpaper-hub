"use client";

import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecommendationModal({ isOpen, onClose }: RecommendationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Failed to send recommendation:', error);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-card-bg border-4 border-neon-purple p-8 max-w-lg w-full rounded-2xl shadow-[0_0_40px_rgba(211,0,197,0.5)] transform transition-transform duration-300 scale-100" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pixel text-2xl md:text-3xl text-neon-purple">SEND A RECOMMENDATION</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={30} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-10">
            <h3 className="font-pixel text-2xl text-neon-cyan mb-4">THANK YOU!</h3>
            <p className="text-gray-300">Your recommendation has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="font-pixel text-sm text-gray-400 block mb-2">YOUR NAME</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Alex"
                className="w-full bg-dark-bg border-2 border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all"
                disabled={status === 'sending'}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-pixel text-sm text-gray-400 block mb-2">YOUR EMAIL</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., alex@domain.com"
                className="w-full bg-dark-bg border-2 border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all"
                disabled={status === 'sending'}
              />
            </div>
            <div>
              <label htmlFor="message" className="font-pixel text-sm text-gray-400 block mb-2">RECOMMENDATION</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Alucard from Hellsing"
                className="w-full bg-dark-bg border-2 border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all min-h-[100px]"
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && <p className="text-neon-pink mt-2 text-sm">Something went wrong. Please try again.</p>}
            
            <div className="mt-6 text-right">
              <button 
                type="submit" 
                disabled={status === 'sending' || !name.trim() || !email.trim() || !message.trim()}
                className="inline-flex items-center gap-3 font-pixel text-xl px-8 py-4 bg-neon-purple text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(211,0,197,0.4)]"
              >
                {status === 'sending' ? 'SENDING...' : 'SEND'}
                <Send size={20} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

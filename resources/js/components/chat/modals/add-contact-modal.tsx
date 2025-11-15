'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddContactModalProps {
  onClose: () => void;
}

export default function AddContactModal({ onClose }: AddContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding contact:', formData);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md 
      bg-card rounded-2xl shadow-xl z-50 scale-in border border-border">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-primary/10">
          <h2 className="text-xl font-bold text-primary">
            Add Contact
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter full name"
              className="w-full px-4 py-2.5 bg-input border border-primary/40 rounded-xl 
              text-foreground placeholder-primary/50 focus:outline-none focus:ring-2 
              focus:ring-primary/60 transition-colors hover:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter phone number"
              className="w-full px-4 py-2.5 bg-input border border-primary/40 rounded-xl 
              text-foreground placeholder-primary/50 focus:outline-none focus:ring-2 
              focus:ring-primary/60 transition-colors hover:border-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-primary/20 hover:bg-primary/30 
              text-primary rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary/90 
              text-primary-foreground rounded-xl font-semibold transition-colors shadow-md"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

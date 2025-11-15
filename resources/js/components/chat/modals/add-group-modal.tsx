'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface AddGroupModalProps {
  onClose: () => void;
}

export default function AddGroupModal({ onClose }: AddGroupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: [''],
  });

  const handleAddMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, ''],
    });
  };

  const handleRemoveMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index),
    });
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData({ ...formData, members: newMembers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating group:', formData);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
      w-full max-w-md bg-card rounded-2xl shadow-xl z-50 max-h-[90vh] 
      overflow-y-auto scale-in border border-border">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-primary">
          <h2 className="text-xl font-bold text-primary-foreground">
            Create Group
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div>
            <label className="block text-sm font-semibold mb-2 text-primary">
              Group Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter group name"
              className="w-full px-4 py-2.5 bg-primary/10 border border-primary 
              rounded-xl text-primary placeholder-primary/60 focus:outline-none 
              focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-primary">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter group description"
              rows={3}
              className="w-full px-4 py-2.5 bg-primary/10 border border-primary 
              rounded-xl text-primary placeholder-primary/60 focus:outline-none 
              focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Members */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-primary">
                Add Members
              </label>
              <button
                type="button"
                onClick={handleAddMember}
                className="text-xs text-primary font-semibold flex items-center gap-1 hover:text-primary/80"
              >
                <Plus className="w-3 h-3" />
                Add Member
              </button>
            </div>

            <div className="space-y-2">
              {formData.members.map((member, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    placeholder="Enter member name or phone"
                    className="flex-1 px-4 py-2.5 bg-primary/10 border border-primary 
                    rounded-xl text-primary placeholder-primary/60 focus:outline-none 
                    focus:ring-2 focus:ring-primary text-sm"
                  />
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="p-2.5 bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/90 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-xl 
              font-semibold transition-all shadow-md hover:bg-primary/90"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

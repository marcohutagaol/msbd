import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { categories } from './../../../data/mockReports';

interface AddReportFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReportFormData) => void;
}

interface ReportFormData {
  category: string;
  description: string;
  employeeName: string;
  department: string;
  items: { name: string; quantity: number; notes: string }[];
}

export const AddReportForm = ({ open, onClose, onSubmit }: AddReportFormProps) => {
  const [formData, setFormData] = useState<ReportFormData>({
    category: '',
    description: '',
    employeeName: '',
    department: '',
    items: [{ name: '', quantity: 1, notes: '' }],
  });
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, notes: '' }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      });
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.category || !formData.employeeName || !formData.department) {
      setError('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const validItems = formData.items.filter(item => item.name.trim() !== '');
    if (validItems.length === 0) {
      setError('Tambahkan minimal satu item');
      return;
    }

    onSubmit({ ...formData, items: validItems });
    
    // Reset form
    setFormData({
      category: '',
      description: '',
      employeeName: '',
      department: '',
      items: [{ name: '', quantity: 1, notes: '' }],
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] bg-background rounded-xl shadow-xl overflow-hidden mx-4 animate-scale-in">
        {/* Header */}
        <div className="p-6 pb-4 bg-secondary/30 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Buat Laporan Baru
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-foreground">
                  Kategori
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium text-foreground">
                  Departemen
                </label>
                <input
                  type="text"
                  id="department"
                  placeholder="Masukkan departemen"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="employeeName" className="text-sm font-medium text-foreground">
                Nama Pelapor
              </label>
              <input
                type="text"
                id="employeeName"
                placeholder="Masukkan nama lengkap"
                value={formData.employeeName}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Deskripsi
              </label>
              <textarea
                id="description"
                placeholder="Jelaskan detail laporan..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Daftar Item</label>
                <button 
                  type="button" 
                  onClick={addItem}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-input rounded-lg hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Item
                </button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg bg-muted/30 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Item {index + 1}
                      </span>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Nama item"
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="number"
                        placeholder="Jumlah"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="text"
                        placeholder="Catatan (opsional)"
                        value={item.notes}
                        onChange={(e) => updateItem(index, 'notes', e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 h-10 px-4 font-medium border border-input rounded-lg hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="flex-1 h-10 px-4 font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Simpan Laporan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

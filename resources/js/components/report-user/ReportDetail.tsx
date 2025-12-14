import { X, Calendar, Clock, User, Building2, FileText, Package } from 'lucide-react';
import { Report } from '@/types/report';

interface ReportDetailProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
}

export const ReportDetail = ({ report, open, onClose }: ReportDetailProps) => {
  if (!report || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl max-h-[90vh] bg-background rounded-xl shadow-xl overflow-hidden mx-4 animate-scale-in">
        {/* Header */}
        <div className="p-6 pb-4 bg-secondary/30 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">
                {report.category}
              </h2>
              <p className="text-muted-foreground mt-1">{report.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`status-badge ${
                  report.status === 'complete' ? 'status-complete' : 'status-process'
                }`}
              >
                {report.status === 'complete' ? 'Complete' : 'On Process'}
              </span>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Pelapor</p>
                <p className="font-medium text-sm">{report.employeeName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Departemen</p>
                <p className="font-medium text-sm">{report.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Tanggal</p>
                <p className="font-medium text-sm">{report.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Waktu</p>
                <p className="font-medium text-sm">{report.time}</p>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Items List */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Daftar Item ({report.itemCount})
            </h3>
            <div className="space-y-3">
              {report.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground">{item.notes}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Qty: {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Preview */}
          {report.pdfUrl && (
            <>
              <hr className="border-border" />
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Preview Dokumen
                </h3>
                <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
                  <iframe
                    src={report.pdfUrl}
                    className="w-full h-[400px]"
                    title="PDF Preview"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import { FileText, Filter } from 'lucide-react';

interface ReportHeaderProps {
  totalReports: number;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const ReportHeader = ({
  totalReports,
  statusFilter,
  onStatusFilterChange,
}: ReportHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Riwayat Laporan</h1>
          <p className="text-muted-foreground">
            {totalReports} laporan ditemukan
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filter:</span>
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">Semua Status</option>
          <option value="complete">Complete</option>
          <option value="process">On Process</option>
        </select>
      </div>
    </div>
  );
};

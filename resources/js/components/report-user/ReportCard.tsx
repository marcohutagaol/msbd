import { ShoppingCart, ShieldCheck, Package, ClipboardList, FileText, ChevronRight } from 'lucide-react';
import { Report } from '@/types/report';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
  index: number;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food & beverage':
      return ShoppingCart;
    case 'security':
      return ShieldCheck;
    case 'office supplies':
      return Package;
    case 'it equipment':
      return ClipboardList;
    default:
      return FileText;
  }
};

export const ReportCard = ({ report, onClick, index }: ReportCardProps) => {
  const Icon = getCategoryIcon(report.category);

  return (
    <div
      onClick={onClick}
      className="card-report flex items-center gap-4 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="icon-box">
        <Icon />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{report.category}</h3>
        <p className="text-sm text-muted-foreground">{report.itemCount} items</p>
      </div>

      <div className="flex items-center gap-4">
        <span className={`status-badge min-w-[110px] text-center ${report.status === 'complete' ? 'status-complete' : 'status-process'}`}
        > {report.status === 'complete' ? 'Complete' : 'On Process'}
        
        </span>

        <div className="text-right text-sm text-muted-foreground hidden sm:block">
          <p>{report.date}</p>
          <p>{report.time}</p>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  );
};

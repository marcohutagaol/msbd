export interface Report {
  id: string;
  category: string;
  itemCount: number;
  status: 'complete' | 'process';
  date: string;
  time: string;
  description: string;
  employeeName: string;
  department: string;
  pdfUrl?: string;
  items: ReportItem[];
}

export interface ReportItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
}

export type CategoryIcon =
  | 'shopping-cart'
  | 'shield-check'
  | 'package'
  | 'clipboard'
  | 'file-text'
  | 'leaf'
  | 'wrench'
  | 'megaphone'
  | 'settings';

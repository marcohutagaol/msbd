import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Report } from '@/types/report';
import { mockReports } from './../../../data/mockReports';
import { ReportCard } from '@/components/report-user/ReportCard';
import { ReportDetail } from '@/components/report-user/ReportDetail';
import { AddReportForm } from '@/components/report-user/AddReportForm';
import { ReportHeader } from '@/components/report-user/ReportHeader';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Laporan',
    href: '#',
  },
];


const Index = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = useMemo(() => {
    if (statusFilter === 'all') return reports;
    return reports.filter((report) => report.status === statusFilter);
  }, [reports, statusFilter]);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setDetailOpen(true);
  };

  const handleAddReport = (data: {
    category: string;
    description: string;
    employeeName: string;
    department: string;
    items: { name: string; quantity: number; notes: string }[];
  }) => {
    const now = new Date();
    const newReport: Report = {
      id: Date.now().toString(),
      category: data.category,
      itemCount: data.items.length,
      status: 'process',
      date: now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      description: data.description,
      employeeName: data.employeeName,
      department: data.department,
      items: data.items.map((item, idx) => ({
        id: `new-${idx}`,
        name: item.name,
        quantity: item.quantity,
        notes: item.notes || undefined,
      })),
    };

    setReports([newReport, ...reports]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <ReportHeader
          totalReports={filteredReports.length}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <div className="mt-6 space-y-4">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Tidak ada laporan ditemukan</p>
            </div>
          ) : (
            filteredReports.map((report, index) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => handleReportClick(report)}
                index={index}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setAddFormOpen(true)}
        className="fab-button"
        aria-label="Tambah Laporan"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Detail Modal */}
      <ReportDetail
        report={selectedReport}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      {/* Add Form Modal */}
      <AddReportForm
        open={addFormOpen}
        onClose={() => setAddFormOpen(false)}
        onSubmit={handleAddReport}
      />
    </div>
  );
};

Index.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);

export default Index;

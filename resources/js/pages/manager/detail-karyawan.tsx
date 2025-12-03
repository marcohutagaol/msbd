import EmployeeDetail from "@/components/manager_karyawan/employee_detail"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Karyawan",
    href: "/manager-karyawan",
  },
  {
    title: "Detail Karyawan",
    href: "#",
  },
]

interface Props {
  id: string | number
}

export default function DetailKaryawanPage({ id }: Props) {
  return <EmployeeDetail id={id} />
}

// pasang layout
DetailKaryawanPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
)

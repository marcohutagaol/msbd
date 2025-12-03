import EmployeeList from "@/components/manager_karyawan/employee-list"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Karyawan",
    href: "#",
  },
]

export default function Home() {
  return <EmployeeList />
}

Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
)
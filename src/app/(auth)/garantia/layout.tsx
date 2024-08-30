import Sidebar from "@/components/SideBar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex">
        <Sidebar />
        <div className="flex w-full h-full justify-center p-10">
        {children}
        </div>
      </section>
    )
  }
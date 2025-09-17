import Header from "@/components/docs/header"
import Sidebar from "@/components/docs/sidebar"
import Content from "@/components/docs/content/content"
import DownloadCTA from "@/components/download-cta"

export default function Docs() {
  return (
    <div className="flex flex-col min-h-screen mt-7">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Content />
        </main>
      </div>
      <DownloadCTA />
    </div>
  )
}
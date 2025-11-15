import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-700">
          <div>© {new Date().getFullYear()} Aashaa</div>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
  )
}

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-10 bg-[#EADCC3] border-t border-[#C8B99E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 
        flex flex-col md:flex-row items-center justify-between gap-4 
        text-sm text-[#4B3A34]"
      >
        <div>© {new Date().getFullYear()} Aashaa</div>

        <div className="flex gap-6">
          <Link 
            href="/privacy" 
            className="hover:text-[#7A5F45] transition-colors"
          >
            Privacy
          </Link>

          <Link 
            href="/terms" 
            className="hover:text-[#7A5F45] transition-colors"
          >
            Terms
          </Link>

          <Link 
            href="/contact" 
            className="hover:text-[#7A5F45] transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}


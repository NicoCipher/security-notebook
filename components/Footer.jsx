export default function Footer() {
  return (
    <footer className="max-w-[860px] mx-auto px-5 md:px-8 py-10 mt-10 border-t border-rule flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between font-mono text-[10.5px] text-mute relative z-10">
      <span>updated by hand, not auto-generated</span>
      <span className="flex gap-4">
        <a
          href="https://github.com/NicoCipher"
          className="hover:text-cream transition-colors"
        >
          github
        </a>
        {/* ✏️ drop your LinkedIn URL in here */}
        <a href="#" className="hover:text-cream transition-colors">
          linkedin
        </a>
        <a
          href="mailto:nicocipherr@gmail.com"
          className="hover:text-cream transition-colors"
        >
          email
        </a>
      </span>
    </footer>
  );
}

// Site footer — establishes developer identity for Play Console
// verification, and gives users a place to find legal + contact info.

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 pb-6 px-6 max-w-md mx-auto text-center text-xs text-inkMuted">
      <p className="leading-relaxed">
        © {year} <span className="font-semibold text-inkSoft">Numo AI</span> · A
        product by <span className="font-semibold text-inkSoft">Inspiration Tech</span>,
        Bengaluru, India
      </p>
      <p className="mt-2 leading-relaxed">
        <a
          href="https://numo-backend-production.up.railway.app/privacy"
          className="underline hover:text-ink"
          target="_blank"
          rel="noopener"
        >
          Privacy
        </a>
        {' · '}
        <a
          href="https://numo-backend-production.up.railway.app/terms"
          className="underline hover:text-ink"
          target="_blank"
          rel="noopener"
        >
          Terms
        </a>
        {' · '}
        <a
          href="https://numo-backend-production.up.railway.app/refund"
          className="underline hover:text-ink"
          target="_blank"
          rel="noopener"
        >
          Refund
        </a>
        {' · '}
        <a href="mailto:support@numo.ai" className="underline hover:text-ink">
          support@numo.ai
        </a>
      </p>
    </footer>
  );
}

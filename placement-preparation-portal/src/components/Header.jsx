export default function Header({ onHome }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={onHome} aria-label="Go to CampusPrep home">
          <span className="brand-mark">CP</span>
          <span>CampusPrep</span>
        </button>
        <span className="header-tagline">Practice. Track. Improve.</span>
      </div>
    </header>
  );
}

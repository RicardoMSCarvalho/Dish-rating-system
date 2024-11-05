export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <h1>Taste 2 Good</h1>
      </div>
      {children}
    </nav>
  );
}

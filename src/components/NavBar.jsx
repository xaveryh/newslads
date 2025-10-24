import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-xl font-bold">NewsLads.com</h1>
      </Link>
      <nav>
        <Link to="/">
          <button type="button" className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 mr-2">
            Home
          </button>
        </Link>
        <Link to="/search">
          <button type="button" className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 mr-2" id="navbar-search-button">
            Search
          </button>
        </Link>
        <Link to="/rss">
          <button type="button" className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800" id="navbar-rss-button">
            RSS
          </button>
        </Link>
      </nav>
    </header>
  );
}

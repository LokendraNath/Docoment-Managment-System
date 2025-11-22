import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Upload from "./Upload";
import Search from "./Search";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">
                  AllSoft
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Document Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="/admin"
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                Admin Panel
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "upload"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "search"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "upload" ? <Upload /> : <Search />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

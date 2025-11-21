import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import Search from "./Search";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Document Management
            </h1>
            <Link
              to="/admin"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "upload"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Upload Document
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === "search"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Search Documents
            </button>
          </div>

          <div className="p-6">
            {activeTab === "upload" ? <Upload /> : <Search />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

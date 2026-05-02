import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle, 
  CreditCard, 
  User, 
  LogOut 
} from "lucide-react"; // Professional SVG icons

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation(); // To highlight the active link

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/courses", icon: BookOpen },
    { name: "Attendance", path: "/attendance", icon: CheckCircle },
    { name: "Fees", path: "/fees", icon: CreditCard },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen sticky top-0 flex flex-col border-r border-gray-800">
      <div className="p-8 mb-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Student Portal
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">Management System</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <Icon size={20} className={`mr-3 ${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors group"
        >
          <LogOut size={20} className="mr-3 text-gray-500 group-hover:text-red-400" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
import { FaChartPie, FaInfoCircle, FaEnvelope, FaUserCircle } from 'react-icons/fa';

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-white via-gray-50 to-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-2">
                    <FaChartPie className="text-indigo-500 text-2xl" />
                    <h1 className="text-2xl font-bold text-gray-800">My Investment Portfolio</h1>
                </div>

                <nav>
                    <ul className="flex space-x-6 text-gray-600 text-sm font-medium">
                        <li>
                            <a
                                href="#"
                                className="hover:text-indigo-600 transition transform hover:scale-105 border-b-2 border-transparent hover:border-indigo-500 flex items-center space-x-1"
                            >
                                <FaChartPie /> <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-indigo-600 transition transform hover:scale-105 border-b-2 border-transparent hover:border-indigo-500 flex items-center space-x-1"
                            >
                                <FaInfoCircle /> <span>About</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-indigo-600 transition transform hover:scale-105 border-b-2 border-transparent hover:border-indigo-500 flex items-center space-x-1"
                            >
                                <FaEnvelope /> <span>Contact</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center space-x-3">
                    <FaUserCircle className="text-3xl text-gray-500 hover:text-indigo-500 transition" />
                    <span className="text-sm text-gray-700 font-medium hidden sm:block">Welcome, Investor</span>
                </div>
            </div>
        </header>
    );
}

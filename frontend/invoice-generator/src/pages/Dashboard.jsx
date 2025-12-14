import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalInvoices: 0,
        totalPaid: 0,
        totalUnpaid: 0
    });
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch all invoices to calculate stats
                // In a real large-scale app, you'd want a dedicated dashboard endpoint
                const response = await axiosInstance.get(API_PATHS.Invoices.GET_ALL);
                const invoices = response.data;

                // Calculate Stats
                const totalInv = invoices.length;

                const paidAmount = invoices
                    .filter(inv => inv.status === 'paid')
                    .reduce((acc, curr) => acc + (curr.total || 0), 0);

                const unpaidAmount = invoices
                    .filter(inv => inv.status !== 'paid')
                    .reduce((acc, curr) => acc + (curr.total || 0), 0);

                setStats({
                    totalInvoices: totalInv,
                    totalPaid: paidAmount,
                    totalUnpaid: unpaidAmount
                });

                // Get 5 most recent invoices
                // Assuming invoices are sorted by date or naturally ordered, otherwise sort here
                const sortedInvoices = [...invoices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentInvoices(sortedInvoices.slice(0, 5));
                setLoading(false);

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load dashboard data");
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Invoices */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Invoices</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</h3>
                    </div>
                </div>

                {/* Total Paid */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Paid</p>
                        <h3 className="text-2xl font-bold text-gray-900">${stats.totalPaid.toFixed(2)}</h3>
                    </div>
                </div>

                {/* Total Unpaid */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-5">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Unpaid</p>
                        <h3 className="text-2xl font-bold text-gray-900">${stats.totalUnpaid.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

            {/* Recent Invoices Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Invoices</h2>
                    <Link
                        to="/invoices"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentInvoices.length > 0 ? (
                                recentInvoices.map((invoice) => (
                                    <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {invoice.billTo?.clientName || "Unknown Client"}
                                            </div>
                                            <div className="text-sm text-gray-500">{invoice.invoiceNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ${invoice.total?.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'paid'
                                                    ? 'bg-green-100 text-green-800'
                                                    : invoice.status === 'overdue'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {invoice.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(invoice.dueDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">
                                        No recent invoices found. <Link to="/invoices/new" className="text-blue-600 hover:underline">Create your first invoice</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

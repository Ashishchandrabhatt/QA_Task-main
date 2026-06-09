import { Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard() {
    const { balance, recentTransactions, user } = usePage().props;

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <Link
                        href="/recharge"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        + New Recharge
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Wallet Balance</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">₹{balance}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Total Transactions</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{recentTransactions?.length || 0}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Account</p>
                        <p className="text-lg font-semibold text-gray-800 mt-2">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.mobile}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                    </div>
                    <div className="divide-y">
                        {recentTransactions && recentTransactions.length > 0 ? (
                            recentTransactions.slice(0, 5).map((txn) => (
                                <div key={txn.id} className="px-6 py-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {txn.operator} - {txn.mobile}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(txn.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-800">₹{txn.amount}</p>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                                            txn.status === 'success' ? 'bg-green-100 text-green-700' :
                                            txn.status === 'failed' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {txn.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500">
                                No transactions yet. Start with a recharge!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

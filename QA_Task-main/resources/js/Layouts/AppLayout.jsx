import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
                                WalletRecharge
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/recharge"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                            >
                                Recharge
                            </Link>
                            <Link
                                href="/transactions"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                            >
                                Transactions
                            </Link>
                            <Link
                                href="/profile"
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                            >
                                Profile
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                {auth?.user?.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}

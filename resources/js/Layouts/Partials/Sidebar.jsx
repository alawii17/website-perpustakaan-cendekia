import NavLink from '@/Components/NavLink';
import {
    IconAlertCircle,
    IconBook,
    IconBooks,
    IconBuildingCommunity,
    IconCategory,
    IconChartDots2,
    IconCircleKey,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconKeyframe,
    IconLayoutKanban,
    IconLogout,
    IconMoneybag,
    IconRoute,
    IconSettingsExclamation,
    IconStack3,
    IconUser,
    IconUsersGroup,
    IconVersions,
} from '@tabler/icons-react';

export default function Sidebar({ url, auth }) {
    return (
        <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
            {auth.role.some((role) => ['admin', 'operator', 'member'].includes(role)) && (
                <>
                    {/* Nav Menu Dashboard */}
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                    <NavLink
                        url={route('dashboard')}
                        active={url.startsWith('/dashboard')}
                        title="Dashboard"
                        icon={IconDashboard}
                    />
                </>
            )}

            {auth.role.some((role) => ['admin'].includes(role)) && (
                <>
                    {/* Nav Menu Statistik */}
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
                    <NavLink
                        url={route('admin.loan-statistics.index')}
                        active={url.startsWith('/admin/loan-statistics')}
                        title="Statistik Peminjaman"
                        icon={IconChartDots2}
                    />
                    <NavLink
                        url={route('admin.fine-reports.index')}
                        active={url.startsWith('/admin/fine-reports')}
                        title="Laporan Denda"
                        icon={IconMoneybag}
                    />
                    <NavLink 
                        url={route('admin.book-stock-reports.index')}
                        active={url.startsWith('/admin/book-stock-reports')} 
                        title="Laporan Stok Buku" 
                        icon={IconStack3} 
                    />
                </>
            )}

            {auth.role.some((role) => ['admin','operator'].includes(role)) && (
                <>
                    {/* Nav Menu Master */}
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                    <NavLink
                        url={route('admin.categories.index')}
                        active={url.startsWith('/admin/categories')}
                        title="Kategori"
                        icon={IconCategory}
                    />
                    <NavLink
                        url={route('admin.publishers.index')}
                        active={url.startsWith('/admin/publishers')}
                        title="Penerbit"
                        icon={IconBuildingCommunity}
                    />
                    <NavLink
                        url={route('admin.books.index')}
                        active={url.startsWith('/admin/books')}
                        title="Buku"
                        icon={IconBook}
                    />
                    <NavLink
                        url={route('admin.users.index')}
                        active={url.startsWith('/admin/users')}
                        title="Pengguna"
                        icon={IconUsersGroup}
                    />
                    <NavLink
                        url={route('admin.fine-settings.create')}
                        active={url.startsWith('/admin/fine-settings')}
                        title="Pengaturan Denda"
                        icon={IconSettingsExclamation}
                    />
                </>
            )}

            {auth.role.some((role) => ['admin'].includes(role)) && (
                <>
                    {/* Nav Menu Peran & Izin */}
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran & Izin</div>
                    <NavLink
                        url={route('admin.roles.index')}
                        active={url.startsWith('/admin/roles')}
                        title="Peran"
                        icon={IconCircleKey}
                    />
                    <NavLink
                        url={route('admin.permissions.index')}
                        active={url.startsWith('/admin/permissions')}
                        title="Izin"
                        icon={IconVersions}
                    />
                    <NavLink
                        url={route('admin.assign-permissions.index')}
                        active={url.startsWith('/admin/assign-permissions')}
                        title="Tetapkan Izin"
                        icon={IconKeyframe}
                    />
                    <NavLink
                        url={route('admin.assign-users.index')}
                        active={url.startsWith('/admin/assign-users')}
                        title="Tetapkan Peran"
                        icon={IconLayoutKanban}
                    />
                    <NavLink
                        url={route('admin.route-accesses.index')}
                        active={url.startsWith('/admin/route-accesses')}
                        title="Akses Rute"
                        icon={IconRoute}
                    />
                </>
            )}


            {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
                <>
                    {/* Transaksi */}
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
                    <NavLink
                        url={route('admin.loans.index')}
                        active={url.startsWith('/admin/loans')}
                        title="Peminjaman"
                        icon={IconCreditCardPay}
                    />
                    <NavLink
                        url={route('admin.return-books.index')}
                        active={url.startsWith('/admin/return-books')}
                        title="Pengembalian"
                        icon={IconCreditCardRefund}
                    />
                </>
            )}

            {auth.role.some((role) => ['member'].includes(role)) && (
                <>
                    <NavLink
                        url={route('front.books.index')}
                        active={url.startsWith('/books')}
                        title="Buku"
                        icon={IconBooks}
                    />
                    <NavLink
                        url={route('front.categories.index')}
                        active={url.startsWith('/categories')}
                        title="Kategori"
                        icon={IconCategory}
                    />
                    <NavLink
                        url={route('front.loans.index')}
                        active={url.startsWith('/loans')}
                        title="Peminjaman"
                        icon={IconCreditCardPay}
                    />
                    <NavLink
                        url={route('front.return-books.index')}
                        active={url.startsWith('/return-books')}
                        title="Pengembalian"
                        icon={IconCreditCardRefund}
                    />
                    <NavLink
                        url={route('front.fines.index')}
                        active={url.startsWith('/fines')}
                        title="Denda"
                        icon={IconMoneybag}
                    />
                </>
            )}

            {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
                <>
                   {/* Lainnya */}
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                    <NavLink
                        url={route('admin.announcements.index')}
                        active={url.startsWith('/admin/announcements')}
                        title="Pengumuman"
                        icon={IconAlertCircle}
                    />
                </>
            )}
            {/* Lainnya */}
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
            <NavLink
                url={route('profile.edit')}
                active={url.startsWith('/admin/profile')}
                title="Profile"
                icon={IconUser}
            />
            <NavLink
                url={route('logout')}
                title="Logout"
                icon={IconLogout}
                method="POST"
                as="button"
                className="w-full"
            />
        </nav>
    );
}

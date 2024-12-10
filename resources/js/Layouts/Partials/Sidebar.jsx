import NavLink from '@/Components/NavLink';
import {
    IconAlertCircle,
    IconBook,
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
            {/* Nav Menu Dashboard */}
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
            <NavLink
                url={route('dashboard')}
                active={url.startsWith('/dashboard')}
                title="Dashboard"
                icon={IconDashboard}
            />
            {/* Nav Menu Statistik */}
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
            <NavLink url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
            <NavLink url="#" title="Laporan Denda" icon={IconMoneybag} />
            <NavLink url="#" title="Laporan Stok Buku" icon={IconStack3} />
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
            {/* Nav Menu Peran & Izin */}
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran & Izin</div>
            <NavLink
                url={route('admin.roles.index')}
                active={url.startsWith('/admin/roles')}
                title="Peran"
                icon={IconCircleKey}
            />
            <NavLink url="#" title="Izin" icon={IconVersions} />
            <NavLink url="#" title="Tetapkan Izin" icon={IconKeyframe} />
            <NavLink url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
            <NavLink url="#" title="Akses Rute" icon={IconRoute} />
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
            {/* Lainnya */}
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
            <NavLink
                url={route('admin.announcements.index')}
                active={url.startsWith('/admin/announcements')}
                title="Pengumuman"
                icon={IconAlertCircle}
            />
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

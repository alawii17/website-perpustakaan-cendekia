import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';
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

export default function SidebarResponsive({ url, auth }) {
    return (
        <nav className="grid gap-6 text-lg font-medium">
            <ApplicationLogo />
            <nav className="grid items-start text-sm font-semibold lg:px-4">
                {/* Nav Menu Dashboard */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                <NavLinkResponsive
                    url={route('dashboard')}
                    active={url.startsWith('/dashboard')}
                    title="Dashboard"
                    icon={IconDashboard}
                />
                {/* Nav Menu Statistik */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
                <NavLinkResponsive url="#" title="Statistik Peminjaman" icon={IconChartDots2} />
                <NavLinkResponsive url="#" title="Laporan Denda" icon={IconMoneybag} />
                <NavLinkResponsive url="#" title="Laporan Stok Buku" icon={IconStack3} />
                {/* Nav Menu Master */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                <NavLinkResponsive
                    url={route('admin.categories.index')}
                    active={url.startsWith('/admin/categories')}
                    title="Kategori"
                    icon={IconCategory}
                />
                <NavLinkResponsive
                    url={route('admin.publishers.index')}
                    active={url.startsWith('/admin/publishers')}
                    title="Penerbit"
                    icon={IconBuildingCommunity}
                />
                <NavLinkResponsive
                    url={route('admin.books.index')}
                    active={url.startsWith('/admin/books')}
                    title="Buku"
                    icon={IconBook}
                />
                <NavLinkResponsive
                    url={route('admin.users.index')}
                    active={url.startsWith('/admin/users')}
                    title="Pengguna"
                    icon={IconUsersGroup}
                />
                <NavLinkResponsive url={route('admin.fine-settings.create')}
                active={url.startsWith('/admin/fine-settings')} title="Pengaturan Denda" icon={IconSettingsExclamation} />
                {/* Nav Menu Peran & Izin */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran & Izin</div>
                <NavLinkResponsive url="#" title="Peran" icon={IconCircleKey} />
                <NavLinkResponsive url="#" title="Izin" icon={IconVersions} />
                <NavLinkResponsive url="#" title="Tetapkan Izin" icon={IconKeyframe} />
                <NavLinkResponsive url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
                <NavLinkResponsive url="#" title="Akses Rute" icon={IconRoute} />
                {/* Transaksi */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
                <NavLinkResponsive url={route('admin.loans.index')}
                active={url.startsWith('/admin/loans')} title="Peminjaman" icon={IconCreditCardPay} />
                <NavLinkResponsive url="#" title="Pengembalian" icon={IconCreditCardRefund} />
                {/* Lainnya */}
                <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                <NavLinkResponsive url="#" title="Pengumuman" icon={IconAlertCircle} />
                <NavLinkResponsive url={route('profile.edit')} title="Profile" icon={IconUser} />
                <NavLinkResponsive
                    url={route('logout')}
                    title="Logout"
                    icon={IconLogout}
                    method="POST"
                    as="button"
                    className="w-full"
                />
            </nav>
        </nav>
    );
}

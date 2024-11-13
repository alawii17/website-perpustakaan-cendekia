import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Toaster } from '@/Components/ui/toaster';
import { Head, Link } from '@inertiajs/react';
import { IconAlertCircle, IconBook, IconBuildingCommunity, IconCategory, IconChartDots2, IconCircleKey, IconCreditCardPay, IconCreditCardRefund, IconDashboard, IconKeyframe, IconLayoutKanban, IconLayoutSidebar, IconLogout, IconMoneybag, IconRoute, IconSettingsExclamation, IconStack3, IconUser, IconUsersGroup, IconVersions } from '@tabler/icons-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import NavLinkResponsive from '@/Components/NavLinkResponsive';

export default function AppLayout({ title, children }) {
    return (
        <>
            <Head title={title} />

            <Toaster position="top-center" richColors />

            <div className="flex min-h-screen w-full flex-row">
                <div className="hidden w-1/5 border-r lg:block">
                    <div className="flex h-full min-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <ApplicationLogo />
                        </div>
                        <div className="flex-1">
                            {/* sidebar */}
                            <nav className='grid items-start px-2 text-sm font-semibold lg:px-4'>
                                {/* Nav Menu Dashboard */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Dashboard</div>
                                <NavLink url='#' title="Dashboard" icon={IconDashboard} />
                                {/* Nav Menu Statistik */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Statistik</div>
                                <NavLink url='#' title="Statistik Peminjaman" icon={IconChartDots2} />
                                <NavLink url='#' title="Laporan Denda" icon={IconMoneybag} />
                                <NavLink url='#' title="Laporan Stok Buku" icon={IconStack3} />
                                {/* Nav Menu Master */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Master</div>
                                <NavLink url='#' title="Kategori" icon={IconCategory} />
                                <NavLink url='#' title="Penerbit" icon={IconBuildingCommunity} />
                                <NavLink url='#' title="Buku" icon={IconBook} />
                                <NavLink url='#' title="Pengguna" icon={IconUsersGroup} />
                                <NavLink url='#' title="Pengaturan Denda" icon={IconSettingsExclamation} />
                                {/* Nav Menu Peran & Izin */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Peran & Izin</div>
                                <NavLink url='#' title="Peran" icon={IconCircleKey} />
                                <NavLink url='#' title="Izin" icon={IconVersions} />
                                <NavLink url='#' title="Tetapkan Izin" icon={IconKeyframe} />
                                <NavLink url='#' title="Tetapkan Peran" icon={IconLayoutKanban} />
                                <NavLink url='#' title="Akses Rute" icon={IconRoute} />
                                {/* Transaksi */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Transaksi</div>
                                <NavLink url='#' title="Peminjaman" icon={IconCreditCardPay} />
                                <NavLink url='#' title="Pengembalian" icon={IconCreditCardRefund} />
                                {/* Lainnya */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Lainnya</div>
                                <NavLink url='#' title="Pengumuman" icon={IconAlertCircle} />
                                <NavLink url={route('profile.edit')} title="Profile" icon={IconUser} />
                                <NavLink url='#' title="Logout" icon={IconLogout} />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col lg:w-4/5">
                    <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:justify-end lg:px-6">
                        {/* {sidebar responsive} */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                    <IconLayoutSidebar className='size-5'/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col max-h-screen overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <VisuallyHidden.Root>Sidebar Responsive</VisuallyHidden.Root>
                                    </SheetTitle>
                                    <SheetDescription>
                                        <VisuallyHidden.Root>Sidebar Responsive</VisuallyHidden.Root>
                                    </SheetDescription>
                                </SheetHeader>
                                {/* Menu Sidebar Responsive */}
                                <nav className='grid gap-6 text-lg font-medium'>
                                    <ApplicationLogo/>
                                    <nav className='grid items-start text-sm font-semibold lg:px-4'>
                                {/* Nav Menu Dashboard */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Dashboard</div>
                                <NavLinkResponsive url='#' title="Dashboard" icon={IconDashboard} />
                                {/* Nav Menu Statistik */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Statistik</div>
                                <NavLinkResponsive url='#' title="Statistik Peminjaman" icon={IconChartDots2} />
                                <NavLinkResponsive url='#' title="Laporan Denda" icon={IconMoneybag} />
                                <NavLinkResponsive url='#' title="Laporan Stok Buku" icon={IconStack3} />
                                {/* Nav Menu Master */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Master</div>
                                <NavLinkResponsive url='#' title="Kategori" icon={IconCategory} />
                                <NavLinkResponsive url='#' title="Penerbit" icon={IconBuildingCommunity} />
                                <NavLinkResponsive url='#' title="Buku" icon={IconBook} />
                                <NavLinkResponsive url='#' title="Pengguna" icon={IconUsersGroup} />
                                <NavLinkResponsive url='#' title="Pengaturan Denda" icon={IconSettingsExclamation} />
                                {/* Nav Menu Peran & Izin */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Peran & Izin</div>
                                <NavLinkResponsive url='#' title="Peran" icon={IconCircleKey} />
                                <NavLinkResponsive url='#' title="Izin" icon={IconVersions} />
                                <NavLinkResponsive url='#' title="Tetapkan Izin" icon={IconKeyframe} />
                                <NavLinkResponsive url='#' title="Tetapkan Peran" icon={IconLayoutKanban} />
                                <NavLinkResponsive url='#' title="Akses Rute" icon={IconRoute} />
                                {/* Transaksi */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Transaksi</div>
                                <NavLinkResponsive url='#' title="Peminjaman" icon={IconCreditCardPay} />
                                <NavLinkResponsive url='#' title="Pengembalian" icon={IconCreditCardRefund} />
                                {/* Lainnya */}
                                <div className='px-3 py-2 text-sm font-semibold text-foreground'>Lainnya</div>
                                <NavLinkResponsive url='#' title="Pengumuman" icon={IconAlertCircle} />
                                <NavLinkResponsive url={route('profile.edit')} title="Profile" icon={IconUser} />
                                <NavLinkResponsive url='#' title="Logout" icon={IconLogout} />
                                </nav>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        {/* {Dropdown} */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex gap-x-2">
                                    <span>Hi, Budi Setiawan</span>
                                    <Avatar>
                                        <AvatarFallback>BS</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Akun saya</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="#">
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="w-full">
                        <div className='relatif'>
                            <div
                                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                                aria-hidden="true"
                            >
                            <div
                                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-100 to-orange-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                            />
                            </div>
                            <div className="gap-4 p-4 lg:gap-6">{children}</div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

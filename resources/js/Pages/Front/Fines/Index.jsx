import GetFineStatusBadge from '@/Components/GetFineStatusBadge';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconEye, IconMoneybag } from '@tabler/icons-react';

export default function Index(props) {
    const { data: fines, meta } = props.fines;
    return (
        <div className="flex w-full flex-col space-y-4 pb-32">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconMoneybag}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tabel Denda</CardTitle>
                    <CardDescription>Menampilkan rincian semua denda anda</CardDescription>
                </CardHeader>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Kode Peminjaman</TableHead>
                                <TableHead>Kode Pengembalian</TableHead>
                                <TableHead>Tanggal Peminjaman</TableHead>
                                <TableHead>Batas Pengembalian</TableHead>
                                <TableHead>Tanggal Pengembalian</TableHead>
                                <TableHead>Denda Keterlambatan</TableHead>
                                <TableHead>Denda Lain-lain</TableHead>
                                <TableHead>Total Denda</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fines.map((fine, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{fine.loan.loan_code}</TableCell>
                                    <TableCell>{fine.return_book.return_book_code}</TableCell>
                                    <TableCell>{fine.loan.loan_date}</TableCell>
                                    <TableCell>{fine.loan.due_date}</TableCell>
                                    <TableCell>{fine.return_book.return_date}</TableCell>
                                    <TableCell className="text-red-500">{formatToRupiah(fine.late_fee)}</TableCell>
                                    <TableCell className="text-red-500">{formatToRupiah(fine.other_fee)}</TableCell>
                                    <TableCell className="text-red-500">{formatToRupiah(fine.total_fee)}</TableCell>
                                    <TableCell>
                                        <GetFineStatusBadge status={fine.payment_status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button varian="blue" size="sm" asChild>
                                                <Link
                                                    href={route('front.return-books.show', [
                                                        fine.return_book.return_book_code,
                                                    ])}
                                                >
                                                    <IconEye className="size-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                    <p className="mb-2 text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-orange-500">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} Denda
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && (
                            <Pagination>
                                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                    {meta.links.map((link, index) => (
                                        <PaginationItem key={index} className="lb:mb-0 mx-1 mb-1">
                                            <PaginationLink href={link.url} isActive={link.active}>
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

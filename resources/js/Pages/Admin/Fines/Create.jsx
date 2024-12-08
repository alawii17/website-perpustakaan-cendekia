import GetFineStatusBadge from '@/Components/GetFineStatusBadge';
import HeaderTitle from '@/Components/HeaderTitle';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { IconMoneybag } from '@tabler/icons-react';

export default function Index(props) {
    console.log(props.return_book);
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconMoneybag}
                />
            </div>

            <Card>
                <CardContent className="space-y-20 p-6">
                    <div>
                        <div className="rounded-lg px-4 py-6">
                            <dl className="flex flex-col gap-x-12 gap-y-4 text-sm leading-relaxed text-foreground lg:flex-row">
                                <div className="flex flex-col">
                                    <dt className="font-semibold">Kode Peminjaman</dt>
                                    <dd>{props.return_book.loan.loan_code}</dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="font-semibold">Kode Pengembalian</dt>
                                    <dd>{props.return_book.return_book_code}</dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="font-semibold">Tanggal Peminjaman</dt>
                                    <dd>{props.return_book.loan.loan_date}</dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="font-semibold">Batas Pengembalian</dt>
                                    <dd>{props.return_book.due_date}</dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="font-semibold">Tanggal Pengembalian</dt>
                                    <dd>{props.return_book.return_date}</dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="font-semibold">Total Denda</dt>
                                    <dd>{formatToRupiah(props.return_book.fine.total_fee)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <Table className="mt-6 w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pengguna</TableHead>
                                <TableHead>Buku</TableHead>
                                <TableHead>Denda Keterlambatan</TableHead>
                                <TableHead>Denda Lainnya</TableHead>
                                <TableHead>Total Denda</TableHead>
                                <TableHead>Status Pembayaran</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{props.return_book.user.name}</TableCell>
                                <TableCell>{props.return_book.book.title}</TableCell>
                                <TableCell>
                                    {formatToRupiah(props.return_book.fine.late_fee)}
                                    <span className="text-red-500">{props.return_book.dayslate}</span>
                                </TableCell>
                                <TableCell>
                                    {formatToRupiah(props.return_book.fine.other_fee)}
                                    <span className="text-red-500">
                                        ({props.return_book.return_book_check.condition})
                                    </span>
                                </TableCell>
                                <TableCell>{formatToRupiah(props.return_book.fine.total_fee)}</TableCell>
                                <TableCell>
                                    <GetFineStatusBadge status={props.return_book.fine.payment_status} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="mt-6 grid w-full items-center gap-1.5">
                        <Label>Catatan:</Label>
                        <Textarea
                            className="resize-none"
                            value={props.return_book.return_book_check.notes ?? '-'}
                            disabled
                        ></Textarea>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

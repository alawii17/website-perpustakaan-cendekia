import CardStat from '@/Components/CardStat';
import GetFineStatusBadge from '@/Components/GetFineStatusBadge';
import HeaderTitle from '@/Components/HeaderTitle';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { UseFilter } from '@/hooks/UseFilter';
import AppLayout from '@/Layouts/AppLayout';
import { FINEPAYMENTSTATUS, formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconArrowsDownUp, IconChecklist, IconCircleCheck, IconCreditCardRefund, IconEye, IconMoneybag, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';

export default function Show(props) {
    const { SUCCESS } = FINEPAYMENTSTATUS;
    return (
        <div className="flex w-full flex-col pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconCreditCardRefund}
                />
            </div>

            <Card>
                <CardHeader className='flex flex-col gap-6 text-sm border-b border-muted lg:flex-row lg:items-center lg:justify-between
                lg:px-6'>
                    <div>
                        <dt className='font-medium text-foreground'>Kode Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_book.loan.loan_code}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Peminjam</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_book.user.name}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Tanggal Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_book.loan.loan_date}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Kode Pengembalian</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_book.return_book_code}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Status</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.return_book.status}</dd>
                    </div>
                </CardHeader>
                <CardContent className='py-6 divide-y divide-gray-200'>
                    <div className='flex items-center lg:items-start'>
                        <div className='flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg lg:h-40 lg:w-40'>
                            <img
                                src={props.return_book.book.cover}
                                alt={props.return_book.book.title}
                                className='object-cover object-center w-full h-full'
                            />
                        </div>
                        <div className='flex-1 ml-6 text-sm'>
                            <h5 className='text-lg font-bold leading-relaxed'>{props.return_book.book.title}</h5>
                            <p className='hidden text-muted-foreground lg:mt-2 lg:block'>{props.return_book.book.synopsis}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <div className='flex items-center'>
                        <IconCircleCheck className='size-5 text-green-500' />
                        <p className='ml-2 text-sm font-medium text-muted-foreground'>
                            Dikembalikan pada tanggal <time dateTime={props.return_book.return_date}>{props.return_book.return_date}</time>
                        </p>
                    </div>
                    <div className='flex pt-6 text-sm font-medium lg:items-center lg:border-none lg-pt-0'>
                        <div className='flex justify-center flex-1'>
                            <Button variant='link'>
                                <Link href={route('front.books.show', [props.return_book.book.slug])}>
                                    Lihat Buku
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card> 

            {props.return_book.fine && (
                <h2 className='font-semibold leading-relaxed text-foreground'>Informasi Denda</h2>
            )}

            {props.return_book.fine && props.return_book.fine.payment_status !== SUCCESS && (
                <Alert variant='destructive'>
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                        Setelah melalui pengecekan, peminjaman buku anda terkena denda. Harap untuk melunasi pembayaran denda terlebih dahulu
                    </AlertDescription>
                </Alert>
            )}

            {props.return_book.fine && (
                <Card>
                    <CardContent className='p-6 space-y-20'>
                        <div>
                            <div className='px-4 py-6 rounded-lg'>
                                <dl className='flex flex-col text-sm leading-relaxed gap-x-12 gap-y-4 text-foreground lg:flex-row'>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Kode Peminjaman</dt>
                                        <dd>{props.return_book.loan.loan_code}</dd>
                                    </div>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Tanggal Peminjaman</dt>
                                        <dd>
                                            <time dateTime={props.return_book.loan.loan_date}>{props.return_book.loan.loan_date}</time>
                                        </dd>
                                    </div>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Batas Pengembalian</dt>
                                        <dd>
                                            <time dateTime={props.return_book.loan.due_date}>{props.return_book.loan.due_date}</time>
                                        </dd>
                                    </div>
                                    <div className='flex flex-col'>
                                        <dt className='font-semibold'>Total Denda</dt>
                                        <dd className='text-red-500'>{formatToRupiah(props.return_book.fine.total_fee)}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Table className='w-full mt-6'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pengguna</TableHead>
                                        <TableHead>Buku</TableHead>
                                        <TableHead>Denda Keterlambatan</TableHead>
                                        <TableHead>Denda Lain-lain</TableHead>
                                        <TableHead>Total Denda</TableHead>
                                        <TableHead>Status Pembayaran</TableHead>
                                        {props.return_book.fine.payment_status !== 'Sukses' && (
                                            <TableHead>Aksi</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{props.return_book.user.name}</TableCell>
                                        <TableCell>{props.return_book.book.title}</TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_book.fine.late_fee)}
                                            <span className='text-red-500'>({props.return_book.dayslate})</span>
                                        </TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_book.fine.other_fee)}
                                            <span className='text-red-500'>({props.return_book.return_book_check.condition})</span>
                                        </TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_book.fine.total_fee)}
                                        </TableCell>
                                        <TableCell>
                                            <GetFineStatusBadge status={props.return_book.fine.payment_status} />
                                        </TableCell>
                                        {props.return_book.fine.payment_status !== SUCCESS && (
                                            <TableCell>
                                                <Button 
                                                    variant='outline' 
                                                    onClick={(e) => console.log('Bayar')}
                                                >
                                                    Bayar
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <p className='mt-12 text-sm'>
                                <span className='font-medium'>Catatan: </span>
                                {props.return_book.return_book_check.notes}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

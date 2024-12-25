import HeaderTitle from '@/Components/HeaderTitle';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { UseFilter } from '@/hooks/UseFilter';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import {
    IconArrowsDownUp,
    IconCircleCheck,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconEye,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Show(props) {
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconCreditCardPay}
                />
            </div>

            <Card>
                <CardHeader className='flex flex-col gap-6 text-sm border-b border-muted lg:flex-row lg:items-center lg:justify-between
                lg:px-6'>
                    <div>
                        <dt className='font-medium text-foreground'>Kode Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.loan.loan_code}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Peminjam</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.loan.user.name}</dd>
                    </div>
                    <div>
                        <dt className='font-medium text-foreground'>Tanggal Peminjaman</dt>
                        <dd className='mt-1 text-muted-foreground'>{props.loan.loan_date}</dd>
                    </div>
                </CardHeader>
                <CardContent className='py-6 divide-y divide-gray-200'>
                    <div className='flex items-center lg:items-start'>
                        <div className='flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg lg:h-40 lg:w-40'>
                            <img
                                src={props.loan.book.cover}
                                alt={props.loan.book.title}
                                className='object-cover object-center w-full h-full'
                            />
                        </div>
                        <div className='flex-1 ml-6 text-sm'>
                            <h5 className='text-lg font-bold leading-relaxed'>{props.loan.book.title}</h5>
                            <p className='hidden text-muted-foreground lg:mt-2 lg:block'>{props.loan.book.synopsis}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <div className='flex items-center'>
                        <IconCircleCheck className='size-5 text-green-500' />
                        <p className='ml-2 text-sm font-medium text-muted-foreground'>
                            Kembalikan sebelum tanggal <time dateTime={props.loan.due_date}>{props.loan.due_date}</time>
                        </p>
                    </div>
                    <div className='flex pt-6 text-sm font-medium lg:items-center lg:border-none lg-pt-0'>
                        <div className='flex justify-center flex-1'>
                            <Button variant='link'>
                                <Link href={route('front.books.show', [props.loan.book.slug])}>
                                    Lihat Buku
                                </Link>
                            </Button>
                            {!props.loan.return_book && (
                                <Button 
                                    variant='orange' 
                                    onClick={() => 
                                        router.post(
                                            route('front.return-books.store', [
                                                props.loan.book.slug,
                                                props.loan.loan_code,
                                            ]),
                                            {},
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                                onSuccess: (success) => {
                                                    const flash = flashMessage(success);
                                                    if (flash) toast[flash.type](flash.message)
                                                }
                                            }
                                        )
                                    }
                                >
                                Kembalikan
                            </Button>
                            )}
                        </div>
                    </div>
                </CardFooter>
            </Card>            
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

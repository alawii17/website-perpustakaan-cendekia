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
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { IconAlertCircle, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Index(props) {
    const { data: announcements, meta } = props.announcements;

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconAlertCircle}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.announcements.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Pesan</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Aktif</TableHead>
                                <TableHead>Dibuat pada</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {announcements.map((announcement, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{announcement.message}</TableCell>
                                    <TableCell>{announcement.url}</TableCell>
                                    <TableCell>{announcement.is_active}</TableCell>
                                    <TableCell>{announcement.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="blue" size="sm" asChild>
                                                <Link href={route('admin.announcements.edit', [announcement])}>
                                                    <IconPencil className="size-4" />
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="red" size="sm">
                                                        <IconTrash className="size-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah anda benar-benar yakin?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak dapat dibatalkan. Tindakan ini akan
                                                            menghapus data secara permanen dan menghapus data anda dari
                                                            server kami
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(
                                                                    route('admin.announcements.destroy', [
                                                                        announcement,
                                                                    ]),
                                                                    {
                                                                        preserveScroll: true,
                                                                        preserveState: true,
                                                                        onSuccess: (success) => {
                                                                            const flash = flashMessage(success);
                                                                            if (flash) toast[flash.type](flash.message);
                                                                        },
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
                        {meta.total} kategori
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

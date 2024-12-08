import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCreditCardRefund } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, reset, put, processing, errors } = useForm({
        loan_date: props.loan.loan_date,
        loan_code: props.loan.loan_code,
        due_date: props.loan.due_date,
        return_date: props.date.return_date,
        condition: null,
        notes: '',
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        put(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    const onHandleReset = () => {
        reset();
    };

    return (
        <div className="flex w-full flex-col space-y-4 pb-32">
            <div className="gp-y-4 mb-8 flex flex-col items-start justify-between lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconCreditCardRefund}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.return-books.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Peminjam</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Nama</Label>
                            <Input type="text" value={props.loan.user.name} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Username</Label>
                            <Input type="text" value={props.loan.user.username} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Email</Label>
                            <Input type="text" value={props.loan.user.email} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Nomor Handphone</Label>
                            <Input type="text" value={props.loan.user.phone} disabled />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Data Buku</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Kode Buku</Label>
                            <Input type="text" value={props.loan.book.book_code} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Judul Buku</Label>
                            <Input type="text" value={props.loan.book.title} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Penulis</Label>
                            <Input type="text" value={props.loan.book.author} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Penerbit</Label>
                            <Input type="text" value={props.loan.book.publisher.name} disabled />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Peminjaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="loan_code">Kode Peminjaman</Label>
                            <Input
                                name="loan_code"
                                id="loan_code"
                                type="text"
                                value={data.loan_code}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.loan_code && <InputError message={errors.loan_code} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="loan_date">Tanggal Peminjaman</Label>
                            <Input
                                name="loan_date"
                                id="loan_date"
                                type="date"
                                value={data.loan_date}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.loan_date && <InputError message={errors.loan_date} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="due_date">Batas Peminjaman</Label>
                            <Input
                                name="due_date"
                                id="due_date"
                                type="date"
                                value={data.due_date}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.due_date && <InputError message={errors.due_date} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="return_date">Tanggal Pengembalian</Label>
                            <Input
                                name="return_date"
                                id="return_date"
                                type="date"
                                value={data.return_date}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.return_date && <InputError message={errors.return_date} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="condition">Kondisi Buku</Label>
                            <Select
                                defaultValue={data.condition}
                                onValueChange={(value) => setData('condition', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.conditions.find((condition) => condition.value == data.condition)
                                            ?.label ?? 'Pilih kondisi'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.conditions.map((condition, index) => (
                                        <SelectItem key={index} value={condition.value}>
                                            {condition.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.condition && <InputError message={errors.condition} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="notes">Catatan</Label>
                            <Textarea
                                name="notes"
                                id="notes"
                                onChange={onHandleChange}
                                placeholder="Masukkan catatan..."
                                value={data.notes}
                            ></Textarea>
                            {errors.notes && <InputError message={errors.notes} />}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="orange" size="lg">
                                Kembalikan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

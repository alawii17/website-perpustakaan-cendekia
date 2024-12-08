import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        message: props.announcement.message ?? '',
        url: props.announcement.url ?? '',
        is_active: props.announcement.is_active ?? false,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
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
        <div className="flex w-full flex-col pb-32">
            <div className="gp-y-4 mb-8 flex flex-col items-start justify-between lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconAlertCircle}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.announcements.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="message">Pesan</Label>
                            <Input
                                name="message"
                                id="message"
                                type="text"
                                placeholder="Masukkan pesan..."
                                value={data.message}
                                onChange={onHandleChange}
                            />
                            {errors.message && <InputError message={errors.message} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                name="url"
                                id="url"
                                type="text"
                                placeholder="Masukkan url..."
                                value={data.url}
                                onChange={onHandleChange}
                            />
                            {errors.url && <InputError message={errors.url} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <div className="items-top flex space-x-2">
                                <Checkbox
                                    id="is_active"
                                    name="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <div className="gap-1/5 grid leading-none">
                                    <Label htmlFor="is_active">Apakah Aktif</Label>
                                </div>
                            </div>
                            {errors.is_active && <InputError message={errors.is_active} />}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="orange" size="lg">
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

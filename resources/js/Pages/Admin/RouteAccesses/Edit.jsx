import ComboBox from '@/Components/ComboBox';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconRoute } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        route_name: props.routeAccess.route_name ?? null,
        role: props.routeAccess.role?.name ?? null,
        permission: props.routeAccess.permission?.name ?? null,
        _method: props.page_settings.method,
    });

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
                    icon={IconRoute}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.route-accesses.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="route_name">Rute</Label>
                            <ComboBox
                                items={props.routes.filter((route) => route.value !== null)}
                                selectedItem={data.route_name}
                                onSelect={(currentValue) => setData('route_name', currentValue)}
                            />
                            {errors.route_name && <InputError message={errors.route_name} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="role">Peran</Label>
                            <ComboBox
                                items={props.roles}
                                selectedItem={data.role}
                                onSelect={(currentValue) => setData('role', currentValue)}
                            />
                            {errors.role && <InputError message={errors.role} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="permission">Izin</Label>
                            <ComboBox
                                items={props.permissions}
                                selectedItem={data.permission}
                                onSelect={(currentValue) => setData('permission', currentValue)}
                            />
                            {errors.permission && <InputError message={errors.permission} />}
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

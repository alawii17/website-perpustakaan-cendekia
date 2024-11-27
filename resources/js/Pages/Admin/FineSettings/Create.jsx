import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCategory, IconSettingsExclamation } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        late_fee_per_day: props.fine_setting?.late_fee_per_day ?? 0,
        damage_fee_percentage: props.fine_setting?.damage_fee_percentage ?? 0,
        lost_fee_percentage: props.fine_setting?.lost_fee_percentage ?? 0,
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
        fileInputCover.current.value = null;
    };
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="gp-y-4 mb-8 flex flex-col items-start justify-between lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconSettingsExclamation}
                />
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="late_fee_per_day">Denda Keterlambatan</Label>
                            <Input
                                name="late_fee_per_day"
                                id="late_fee_per_day"
                                type="number"
                                value={data.late_fee_per_day}
                                onChange={onHandleChange}
                            />
                            {errors.late_fee_per_day && <InputError message={errors.late_fee_per_day} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="damage_fee_percentage">Denda Kerusakan (%)</Label>
                            <Input
                                name="damage_fee_percentage"
                                id="damage_fee_percentage"
                                type="number"
                                value={data.damage_fee_percentage}
                                onChange={onHandleChange}
                            />
                            {errors.damage_fee_percentage && <InputError message={errors.damage_fee_percentage} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="lost_fee_percentage">Denda Kehilangan (%)</Label>
                            <Input
                                name="lost_fee_percentage"
                                id="lost_fee_percentage"
                                type="number"
                                value={data.lost_fee_percentage}
                                onChange={onHandleChange}
                            />
                            {errors.lost_fee_percentage && <InputError message={errors.lost_fee_percentage} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;

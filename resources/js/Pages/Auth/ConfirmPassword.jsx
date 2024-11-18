import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const onHandlesubmit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Konfirmasi Password</CardTitle>
                <CardDescription>
                    This is a secure area of the application. Please confirm your password before continuing.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={onHandlesubmit}>
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        {errors.password && <InputError message={errors.password} />}
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Button variant="orange" size="xl" disabled={processing}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

ConfirmPassword.layout = (page) => <AppLayout children={page} title="Konfirmasi Password" />;

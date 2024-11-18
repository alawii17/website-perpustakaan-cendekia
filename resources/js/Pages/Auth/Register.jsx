import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="size-12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-40">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Daftar</h1>
                                <p className="text-balance text-muted-foreground">
                                    Masukkan data diri anda dibawah ini, untuk membuat akun anda
                                </p>
                            </div>
                            <form onSubmit={submit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>

                                        <Input
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            autoComplete="name"
                                            onChange={onHandleChange}
                                        />

                                        {errors.name && <InputError message={errors.name} />}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            type="email"
                                            autoComplete="username"
                                            onChange={onHandleChange}
                                        />

                                        {errors.email && <InputError message={errors.email} />}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>

                                        <Input
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={onHandleChange}
                                        />

                                        {errors.password && <InputError message={errors.password} />}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>

                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={onHandleChange}
                                        />

                                        {errors.password_confirmation && (
                                            <InputError message={errors.password_confirmation} />
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="orange"
                                        size="xl"
                                        className="w-full"
                                        disable={processing}
                                    >
                                        Daftar
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-1 text-center text-sm">
                                Sudah punya akun?{' '}
                                <Link href={route('login')} className="underline">
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-mued hidden lg:block">
                    <img
                        src="/images/login.webp"
                        alt="login"
                        className="h-full w-full object-cover dark:brightness-[0.4] dark:grayscale-0"
                    />
                </div>
            </div>
        </>
    );
}

Register.layout = (page) => <GuestLayout children={page} title="Daftar" />;

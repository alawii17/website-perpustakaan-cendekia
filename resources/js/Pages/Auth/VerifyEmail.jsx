import ApplicationLogo from '@/Components/ApplicationLogo';
import PrimaryButton from '@/Components/PrimaryButton';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="size-12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-40">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                {status === 'verification-link-sent' && (
                                    <Alert variant="success">
                                        <AlertDescription>
                                            A new verification link has been sent to the email address you provide
                                            during registration.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <h1 className="text-3xl font-bold">Verifikasi Email</h1>
                                <p className="text-balance text-muted-foreground">
                                    Thanks for signing up! Before getting started, could you verify your email address
                                    by clicking on the link we just emailed to you? If you didn't receive the email, we
                                    will gladly send you another.
                                </p>
                            </div>
                            {/* Form */}
                            <form onSubmit={onHandleSubmit}>
                                <div className='grid gap-4'>
                                    <Button
                                        variant="orange"
                                        size="xl"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Resend Verification Email
                                    </Button>
                                </div>
                            </form>
                            <div className='mt-4 text-center text-sm'>
                                <Link
                                    href={route('logout')}
                                    method='post'
                                    as='button'
                                    className='underline'
                                >
                                    Logout
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

VerifyEmail.layout = (page) => <GuestLayout children={page} title="Verifikasi Email" />;

import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { messages } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";

export default function ErrorHandling({status})
{
    const errorMessages = messages[status];

    return (
        <>
            <Head title={errorMessages.title} />
            <Card className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
                <Card className="text-center">
                    <CardContent className="p-8">
                        <p className="text-base font-semibold text-orange-500">{errorMessages.status}</p>
                        <h1 className="text-5xl mt-4 font-bold tracking-tighter text-foreground">
                            {errorMessages.title}
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                            {errorMessages.description}
                        </p>
                        <div className="flex items-start justify-center mt-10 gap-x-6">
                            <Button variant='orange' asChild>
                                <Link href='/'>
                                    Kembali ke Halaman Awal
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Card>
        </>
    )
}
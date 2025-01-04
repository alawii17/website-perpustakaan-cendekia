import { Link } from '@inertiajs/react';

export default function BookCard({ item }) {
    return (
        <div className="group relative">
            <div className="relative overflow-hidden rounded-lg bg-muted/40">
                <img src={item.cover} alt={item.title} className="h-full w-full object-cover object-center" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-foreground backdrop-blur backdrop-filter">
                        Lihat buku
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium leading-relaxed text-foreground">
                <h3 className="line-clamp-1">
                    <Link href={route('front.books.show', [item.slug])}>
                        <span className="absolute inset-0" />
                        {item.title}
                    </Link>
                </h3>
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed tracking-tighter text-muted-foreground">
                {item.synopsis}
            </p>
        </div>
    );
}

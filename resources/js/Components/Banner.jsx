import { Link } from '@inertiajs/react';

export default function Banner({ message, url = '#' }) {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 lg:px-8 lg:pb-5">
            <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                <p className="text-sm leading-6 text-white">
                    <Link href={url}>
                        <strong className="font-semibold">Pengumuman</strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        {message}
                    </Link>
                </p>
            </div>
        </div>
    );
}

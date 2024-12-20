import { Link } from "@inertiajs/react";

export default function CategoryCard({item}){
    return (
        <Link 
            href={route('front.categories.show', [item.slug])}
            className="relative flex flex-col w-full p-8 rounded-lg h-80 hover:opacity-75 xl:w-auto"
        >
            <span className="absolute inset-0">
                <img src={item.cover} alt={item.name} className="object-cover object-top w-full h-full" />
            </span>
            <span className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-r from-gray-800"/>
            <span className="relative mt-auto text-xl font-bold text-center text-white">
                {item.name}
            </span>
        </Link>
    )
}
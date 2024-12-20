import BookCard from "@/Components/BookCard";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconBooks } from "@tabler/icons-react";

export default function Index(props){
    return (
        <div className="flex flex-col w-full pb-32 space-y-6">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconBooks}
                />
            </div>
            {props.categories.map((category, index) => (
                <div key={index} className="py-2">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold leading-relaxed text-foreground">
                            {category.name}
                        </h2>
                        <Button variant="link" asChild>
                            <Link href={route('front.categories.show', [category.slug])}>Lihat Semua</Link>
                        </Button>
                    </div>
                    <div className="grid gap-4 py-10 border-b border-dashed border-muted md:gap-8 lg:grid-cols-4">
                        {category.books.map((book, index) => (
                            <BookCard key={index} item={book} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />
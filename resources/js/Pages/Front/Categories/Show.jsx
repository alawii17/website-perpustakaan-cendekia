import BookCard from "@/Components/BookCard";
import CategoryCard from "@/Components/CategoryCard";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/Components/ui/pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconBooks, IconCategory } from "@tabler/icons-react";

export default function Show(props){
    const { data: books, meta } = props.books;
    return (
        <div className="flex flex-col w-full pb-32 space-y-6">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconCategory}
                />
            </div>

            <div className="grid gap-4 py-10 md:gap-8 lg:grid-cols-4">
                {books.map((book, index) => (
                    <BookCard key={index} item={book} />
                ))}
            </div>

            {meta.has_pages && (
                <Pagination>
                    <PaginationContent>
                        {meta.links.map((link, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href={link.url} isActive={link.active}>
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

Show.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />
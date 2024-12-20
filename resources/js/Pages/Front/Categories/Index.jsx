import BookCard from "@/Components/BookCard";
import CategoryCard from "@/Components/CategoryCard";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/Components/ui/pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconBooks, IconCategory } from "@tabler/icons-react";

export default function Index(props){
    const { data: categories, meta } = props.categories;
    return (
        <div className="flex flex-col w-full pb-32 space-y-6">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subTitle={props.page_settings.subtitle}
                    icon={IconCategory}
                />
            </div>
            <div className="box-content py-2 h-90">
                <div className="flex flex-col gap-8 mb-24 lg:grid lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} item={category}/>
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
        </div>
    )
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />
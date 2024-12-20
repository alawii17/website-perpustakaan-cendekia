import { Button } from "@/Components/ui/button"
import AppLayout from "@/Layouts/AppLayout"

export default function Show(props){
    return(
        <div className="flex flex-col w-full pb-32 space-y-12">
            <div className="lg:grid lg:grid-cols-12 lg:grid-row lg:gap-x-8 lg:gap-y-10">
                <div className="lg:col-span-4 lg:row-end-1">
                    <div className="max-w-sm overflow-hidden bg-gray-100 rounded-lg aspect-h-3 aspect-w-4">
                        <img src={props.book.cover} alt={props.book.title} />
                    </div>
                </div>

                <div className="mt-14 lg:col-span-8 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                    <div className="flex flex-col-reverse">
                        <div className="mt-4">
                            <h2 className="text-xl font-bold tracking-tighter text-foreground">{props.book.title}</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                (Ditambahkan pada <time dateTime={props.book.created_at}>{props.book.created_at}</time>)
                            </p>
                        </div>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{props.book.synopsis}</p>

                    <div className="flex mt-10">
                        {props.book.stock.available > 0 ? (
                            <Button 
                                size="lg"
                                onClick={() => console.log('buku berhasil dipinjam')}
                            >
                                Pinjam Sekarang
                            </Button>
                        ) : (
                            <Button 
                                size="lg"
                                disabled
                            >
                                Buku Habis
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col justify-start gap-10 mt-10 pt-10 border-t border-gray-200 lg:flex-row">
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Tahun Publikasi</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.publication_year}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-foreground">ISBN</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.isbn}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Jumlah Halaman</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.number_of_pages}</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start gap-10 mt-10 pt-10 border-t border-gray-200 lg:flex-row">
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Penulis</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.author}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Kategori</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.category.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Penerbit</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.publisher.name}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

Show.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title}/>
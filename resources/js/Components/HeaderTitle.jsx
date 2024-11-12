export default function HeaderTitle({title, subTitle, icon: Icon}){
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-x-1">
                <Icon className='size-6'/>
                <h1 className="text-lg font-bold lg:text-2xl">{title}</h1>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{subTitle}</p>
        </div>
    )
}
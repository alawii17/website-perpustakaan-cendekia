import { Link } from "@inertiajs/react";
import { IconInnerShadowBottom, IconInnerShadowBottomRight } from "@tabler/icons-react";

export default function ApplicationLogo({url= '#', size= 'size-9', isTitle= true}){
    return (
        <Link
            href={url}
            className="flex items-center gap-2">
                <IconInnerShadowBottomRight
                className="{cn(
                'text-orange-500',
                size
            )}"/>
            {isTitle && (
                <div className="flex flex-col">
                    <span className="font-bold leading-none text-foreground">Cendekia</span>
                    <span className="text-xs font-medium text-muted-foreground">Pengetahuan Tanpa Batas</span>
                </div>
            )}

        </Link>
    )
}
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {navigation} from "@/datas/navigation";


export const NavbarDesktop = () =>{
    const pathname = usePathname();
    return(
        <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navigation principale">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                        'px-4 py-2 rounded-md text-sm font-medium transition-colors relative group',
                        pathname === item.href
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}>
                    {pathname === item.href && (
                        <span className="absolute inset-0 rounded-md bg-primary/10"></span>
                    )}
                    <span className="relative">{item.name}</span>
                    <span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
            ))}
        </nav>
    )
}
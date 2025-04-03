// src/components/shared/header/mobile-menu.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigation } from "@/datas/navigation";
import { usePathname } from "next/navigation";
import { MobileMenuButtonProps } from '@/types/mobile-menu-button-props';

export const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen }: MobileMenuButtonProps) => {
    const pathname = usePathname();
    return (
        <>
            {mobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute inset-x-0 top-16 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border">
                    <div className="container py-6 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn('block py-2 text-base font-medium transition-colors', pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                                onClick={() => setMobileMenuOpen(false)}
                                aria-current={pathname === item.href ? 'page' : undefined}>
                                {item.name}
                            </Link>
                        ))}
                        <Button asChild className="w-full mt-4 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300">
                            <Link href="/contact">Contact</Link>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
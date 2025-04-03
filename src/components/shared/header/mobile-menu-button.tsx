import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {MobileMenuButtonProps} from "@/types/mobile-menu-button-props";


export const MobileMenuButton = ({ mobileMenuOpen, setMobileMenuOpen }: MobileMenuButtonProps) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
            ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
            )}
        </Button>
    );
}
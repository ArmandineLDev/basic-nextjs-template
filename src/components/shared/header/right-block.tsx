import {LogoBlock} from "@/components/shared/header/logo-block";
import {NavbarDesktop} from "@/components/shared/header/navbar-desktop";
import {ThemeSwitch} from "@/components/shared/header/theme-switch";
import {ContactButtonDesktop} from "@/components/shared/header/contact-button-desktop";
import {MobileMenuButton} from "@/components/shared/header/mobile-menu-button";
import {useState} from "react";
import {MobileMenuButtonProps} from "@/types/mobile-menu-button-props";

export const RightBlock =  ({ mobileMenuOpen, setMobileMenuOpen }: MobileMenuButtonProps) => {

    return ( <div className="container flex items-center justify-between">
        <LogoBlock />

        {/* Navigation desktop */}
        <NavbarDesktop />

        <div className="flex items-center gap-2">
            <ThemeSwitch/>

            {/* Bouton Contact (visible uniquement sur desktop) */}
            <ContactButtonDesktop/>

            {/* Bouton menu mobile */}
            <MobileMenuButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        </div>
    </div>)
}
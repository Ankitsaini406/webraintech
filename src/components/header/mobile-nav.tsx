import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

function MobileNav() {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <AlignJustify className="w-6 h-6 text-foreground" />
                </SheetTrigger>
                <SheetContent className="p-4">
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>

                    {/* Mobile Menu Links */}
                    <div className="space-y-4 flex flex-col items-center mt-10 gap-8">
                        <Link href="/" className="block text-lg font-medium text-foreground hover:text-primary">
                            Home
                        </Link>
                        <Link href="/about-us" className="block text-lg font-medium text-foreground hover:text-primary">
                            About
                        </Link>
                        <Link href="/services" className="block text-lg font-medium text-foreground hover:text-primary">
                            Services
                        </Link>
                        <Link href="/contact" className="block text-lg font-medium text-foreground hover:text-primary">
                            Contact
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNav;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Siraisi Notes",
    description:
        "This website shares technical notes that covers hardware design, software design and some technical experiences.",
    icons: {
        icon: "/img/logo.svg",
    },
};

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="mb-6">
                <MainNav />
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
}

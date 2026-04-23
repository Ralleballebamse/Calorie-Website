
function Footer() {
    return (
        <footer className="flex items-center bg-white shadow pl-6 h-auto relative justify-between pr-30 py-10">
            {/* Left side information*/}
            <aside>
                <h2 className="text-xl text-[#116a2aca] my-2">VitaTrack</h2>
                <p>Precision weight management for </p>
                <p>modern era. Your health, decided.</p>
                <p className="py-5 text-[#116a2aca]">© 2024 VitaTrack Health. Precision Wellness.</p>
            </aside>

            {/* Company and nav under */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[#116a2aca]">Company</h3>
                <nav className="flex flex-col gap-2 items-start underline">
                    <button>About us</button>
                    <button>Careers</button>
                    <button>Contact</button>
                </nav>
            </div>

            {/* Legal and nav under */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[#116a2aca]">Legal</h3>
                <nav className="flex flex-col gap-2 items-start underline">
                    <button>Privacy Policy</button>
                    <button>Terms of Service</button>
                    <button>Legal</button>
                </nav>
            </div>

            {/* Support and nav under */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[#116a2aca]">Support</h3>
                <nav className="flex flex-col gap-2 items-start underline">
                    <button>Help Center</button>
                    <button>Guides</button>
                    <button>API Docs</button>
                </nav>
            </div>

        </footer>
    );
}

export default Footer;
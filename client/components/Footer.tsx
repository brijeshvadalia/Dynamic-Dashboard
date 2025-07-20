export default function Footer() {
    return (
        <footer className=" py-4 mt-12">
            <div className="max-w-6xl mx-auto text-center text-sm">
                © {new Date().getFullYear()} My Investment Portfolio. All rights reserved.
            </div>
        </footer>
    );
}

import { Footer, NavBar } from "../components/_index";

const MainTemplate = ({ children }) => {
    return (
        <main>
            
            <NavBar />
            <section className="min-h-screen">
                {children}
            </section>
            <Footer />
        </main>
    );
}

export default MainTemplate;

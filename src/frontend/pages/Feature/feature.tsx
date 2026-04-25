import "../../App.css"
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import StartYourProfile from "../../Components/startYourProfile";

function Feature() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
            <Header />
            <main>
                <div>
                    <div>
                        <h1>Everything you need to master your health</h1>
                        <h3>Experience a precision-engineered ecosystem that translates
                            complex physiological data into clear, actionable health insights.
                            Built for those who prioritize longevity and scientific clarity.
                        </h3>
                        <button>Start Free Trial</button>
                    </div>
                </div>

                <StartYourProfile />
            </main>

            <Footer />
        </div>
    );
}

export default Feature;
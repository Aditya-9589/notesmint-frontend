import Navbar from "../components/layout/Navbar";

const Home = () => {
    return (
        <>
            {/* <Navbar /> */}

            <div className="text-center mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Welcome to NotesMint
                </h1>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                    Buy premium notes and boost your learning experience
                </p>

                <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center px-2">
                    <img
                        src="/images/hero-illustration.png"
                        alt="Study notes and learning illustration"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
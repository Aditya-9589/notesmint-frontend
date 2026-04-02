import Navbar from "../components/layout/Navbar";

const Home = () => {
    return (
        <>
            <Navbar />

            <div className="text-center mt-20">
                <h1 className="text-4xl font-bold">
                    Welcome to NotesMint 🚀
                </h1>

                <p className="mt-4 text-gray-600">
                    Buy premium notes and boost your learning experience
                </p>
            </div>
        </>
    );
};

export default Home;
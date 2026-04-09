
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, setLoading, setError } from "../../store/slices/authSlice";
import { loginAPI, registerAPI } from "../../services/authService";

const AuthModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading());

            const res = isLogin
                ? await loginAPI({
                    email: formData.email,
                    password: formData.password,
                })
                : await registerAPI(formData);

            dispatch(setCredentials(res.data));
            onClose();
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Error"));
        }
    };

    return (
        // <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={onClose}
        >
            {/* <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg"> */}
            <div
                className="bg-white p-6 rounded-2xl w-[350px] shadow-xl border border-green-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* <h2 className="text-xl font-bold mb-4 text-center"> */}
                <h2 className="text-xl font-bold mb-4 text-center text-green-600">
                    {/* {isLogin ? "Login" : "Register"} */}
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            // className="border p-2 rounded"
                            className="border p-2 rounded focus:outline-green-500"
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        // className="border p-2 rounded"
                        className="border p-2 rounded focus:outline-green-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        // className="border p-2 rounded"
                        className="border p-2 rounded focus:outline-green-500"
                    />

                    {/* <button className="bg-black text-white py-2 rounded"> */}
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded transition">
                        {isLogin ? "Login" : "Register"}
                        {/* {isLogin ? "Welcome Back" : "Create Account"} */}
                    </button>
                </form>

                <p className="text-sm mt-4 text-center">
                    {/* {isLogin ? "Don't have an account?" : "Already have an account?"} */}
                    {isLogin ? "New here?" : "Already have an account?"}
                    <span
                        // className="text-blue-500 cursor-pointer ml-1"
                        className="text-green-600 cursor-pointer ml-1 font-medium"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {/* {isLogin ? "Register" : "Login"} */}
                        {isLogin ? "Create account" : "Login"}
                    </span>
                </p>

                {/* <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-lg"
                >
                    ✕
                </button> */}

            </div>
        </div>
    );
};

export default AuthModal;
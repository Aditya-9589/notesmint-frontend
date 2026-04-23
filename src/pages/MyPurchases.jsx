import { useEffect, useState } from "react";
import { getMyPurchases } from "../services/userService";

const MyPurchases = () => {
    const [bundles, setBundles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const res = await getMyPurchases();
                setBundles(res.data.bundles);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Purchases</h1>

            {bundles.length === 0 ? (
                <p>No purchases yet</p>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {bundles.map((bundle) => (
                        <div key={bundle._id} className="border rounded p-4 shadow-sm">
                            <img
                                src={bundle.thumbnailUrl}
                                alt=""
                                className="w-full h-40 object-cover rounded"
                            />

                            <h2 className="text-lg font-semibold mt-2">
                                {bundle.title}
                            </h2>

                            <p className="text-gray-600 text-sm mt-1">
                                {bundle.description}
                            </p>

                            <button className="mt-3 bg-green-600 text-white px-4 py-1 rounded">
                                Access Notes
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPurchases;
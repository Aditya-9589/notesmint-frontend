
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBundles } from "../store/slices/bundleSlice";
import Navbar from "../components/layout/Navbar";
import BundleCard from "../components/bundle/BundleCard";

const Bundles = () => {

    const dispatch = useDispatch();
    const { bundles, loading, error } = useSelector(
        (state) => state.bundles 
    );

    useEffect(() => {
        dispatch(fetchBundles());
    }, [dispatch]);

    return (
        <>
            {/* <Navbar /> */}

            <div className="p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" >All Bundles</h1>

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" >
                    {bundles.map((bundle) => (
                        <BundleCard key={bundle._id} bundle={bundle} ></BundleCard>
                    ))}
                </div>

            </div>
        </>
    );
};

export default Bundles;
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import apiClient from '../services/apiClient'
import { fetchBundleById } from '../store/slices/bundleSlice'


const BundleNotes = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { singleBundle, loading } = useSelector(
        state => state.bundles
    );

    useEffect(() => {
        dispatch(fetchBundleById(id));
    }, [dispatch, id]);


    const handleOpenPdf = async (pdfId) => {
        try {
            const res = await apiClient.get(
                `/bundles/${id}/pdf/${pdfId}/download`
            );

            window.open(
                res.data.downloadUrl,
                "_blank"
            );
            
        } catch (error) {
            console.error(error);
            alert("Unable to open note")
        }
    }

    if (loading || !singleBundle) {
        return <p className='p-6' >Loading Notes...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6">

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                {singleBundle.title} Notes
            </h1>


            <div className="space-y-4">

                {singleBundle.pdfs.map((pdf) => (
                    <div
                        key={pdf._id}
                        className="border rounded p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4"
                    >

                        <h2 className="font-medium text-sm sm:text-base">
                            📄 {pdf.title}
                        </h2>

                        <button
                            onClick={() => handleOpenPdf(pdf._id)}
                            className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto text-sm sm:text-base"
                        >
                            Open Note
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default BundleNotes
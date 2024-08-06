'use client';
import React, { useState } from 'react';
import DashboardLayout from '../page';


const AddGlasses = () => {
    const [formData, setFormData] = useState({
        name: '',
        discountPercentage: '',
        mainImage: null,
        additionalImages: [],
        description: '',
        oldPrice: '',
        newPrice: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMainImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({ ...formData, mainImage: selectedFile });
    };

    const handleAdditionalImagesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFormData({ ...formData, additionalImages: selectedFiles });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData();
        form.append('name', formData.name);
        form.append('discountPercentage', formData.discountPercentage);
        form.append('mainImage', formData.mainImage);
        formData.additionalImages.forEach((file, index) => {
            form.append(`additionalImages`, file);
        });
        form.append('description', formData.description);
        form.append('oldPrice', formData.oldPrice);
        form.append('newPrice', formData.newPrice);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/glasses-post`, {
                method: 'POST',
                body: form
            });

            if (response.ok) {
                const product = await response.json();
                console.log('Product added:', product);
                setSuccessMessage('Product added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds
                setFormData({
                    name: '',
                    discountPercentage: '',
                    mainImage: null,
                    additionalImages: [],
                    description: '',
                    oldPrice: '',
                    newPrice: ''
                });
            } else {
                console.error('Error adding product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add Glasses</h2>
                {successMessage && (
                    <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Discount Percentage</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Main Image</label>
                    <input
                        type="file"
                        name="mainImage"
                        onChange={handleMainImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Additional Images</label>
                    <input
                        type="file"
                        name="additionalImages"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Old Price</label>
                    <input
                        type="number"
                        name="oldPrice"
                        value={formData.oldPrice}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Price</label>
                    <input
                        type="number"
                        name="newPrice"
                        value={formData.newPrice}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
        </DashboardLayout >
    );
};

export default AddGlasses;

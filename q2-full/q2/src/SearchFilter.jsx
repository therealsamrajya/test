import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const customAnimations = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}
@keyframes fadeInError {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInError {
    animation: fadeInError 0.3s ease-out;
}
@keyframes fadeInNoResults {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInNoResults {
    animation: fadeInNoResults 0.3s ease-out;
}
`;

const SearchFilter = () => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://q2-backend.onrender.com/items');
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (err) {
            setError('Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Debounce function for filtering
    const debouncedFilter = useCallback(
        (query) => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            const newTimeout = setTimeout(() => {
                const lowerCaseQuery = query.toLowerCase();
                const filtered = items.filter(item =>
                    item.toLowerCase().includes(lowerCaseQuery)
                );
                setFilteredItems(filtered);
                setShowSuccess(filtered.length > 0);
                setTimeout(() => setShowSuccess(false), 3000); 
            }, 300); // 300ms debounce delay

            setDebounceTimeout(newTimeout);
        },
        [items, debounceTimeout]
    );

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearch(query);
        debouncedFilter(query);
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = customAnimations;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col justify-center items-center p-6 text-white">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105">
                <div className="p-6 space-y-6">
                    <h1 className="text-3xl font-extrabold text-center text-gray-800 animate-pulse">
                        Find Your Month
                    </h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search for a month..."
                            className="w-full py-3 px-4 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                        />
                        <svg
                            className="absolute right-3 top-3 h-6 w-6 text-gray-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    {error && (
                        <div className="text-red-500 text-center font-semibold animate-fadeInError">
                            {error}
                        </div>
                    )}
                    {showSuccess && (
                        <div className="text-green-500 text-center font-semibold animate-bounce">
                            Month found successfully!
                        </div>
                    )}
                </div>
                <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <li
                                key={index}
                                className="p-4 hover:bg-indigo-50 transition duration-300 cursor-pointer text-gray-800 animate-fadeIn"
                            >
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="p-4 text-center text-gray-500 animate-fadeInNoResults">
                            No matching items found
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SearchFilter;

import { useState } from 'react';
import { nlpSearchCreators } from '../../api/brand';
import Button from '../ui/Button';

const NLPSearchBar = ({ brandId, onSearchResults, onLoading }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError('Please enter a search query');
            return;
        }

        setIsSearching(true);
        setError('');
        onLoading?.(true);

        try {
            const results = await nlpSearchCreators(brandId, query);
            onSearchResults?.(results);
            setShowResults(true);
        } catch (err) {
            setError(err.message || 'Failed to search creators');
            console.error('Search error:', err);
        } finally {
            setIsSearching(false);
            onLoading?.(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6 mb-8">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AI-Powered Creator Search
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Describe the type of creator you're looking for in natural language. Our AI will match you with the best fits.
                </p>

                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setError('');
                            }}
                            placeholder="e.g., 'Looking for fitness creators with over 100k Instagram followers in US focused on sustainable living'"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            disabled={isSearching}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSearching}
                        className="whitespace-nowrap"
                    >
                        {isSearching ? (
                            <>Searching...</>
                        ) : (
                            'Search'
                        )}
                    </Button>
                </form>

                {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {error}
                    </div>
                )}

                {showResults && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                        Search completed! Results are displayed below.
                    </div>
                )}
            </div>
        </div>
    );
};

export default NLPSearchBar;

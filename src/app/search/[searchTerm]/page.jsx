import Results from '@/components/Results';

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;

  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error('Missing API_KEY environment variable');
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const results = data.results;

    return (
      <div>
        {results && results.length === 0 && (
          <h1 className="text-center pt-6">No results found</h1>
        )}
        {results && results.length > 0 && <Results results={results} />}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

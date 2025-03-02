import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-6 py-8">
      <SearchBar />
      <div className="mt-8">
        <Stats />
      </div>
    </div>
  );
}

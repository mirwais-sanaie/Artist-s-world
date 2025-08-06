import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  // Update URL when `search` changes (debounced or immediate)
  useEffect(() => {
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  }, [search, setSearchParams]);

  return (
    <div className="hidden md:flex relative w-full max-w-lg mx-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A0]" />

      <Input
        type="text" // 👈 change to "text" to prevent browser clear button
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search artwork, artists..."
        className="selection:bg-myPurple pl-10 pr-10 py-3 rounded-full bg-[#1E1E24] border-myPurple text-white placeholder-[#A0A0A0] focus-visible:ring-myPurple focus-visible:border-myPurple text-sm h-11"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-myPurple hover:text-myPurple-hover"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;

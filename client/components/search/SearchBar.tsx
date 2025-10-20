import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  showRealTimeResults?: boolean;
}

const SearchBar = ({ 
  placeholder = "Search destinations, hotels, experiences...", 
  className = "",
  onSearch,
  showRealTimeResults = true
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock suggestions data
  const mockSuggestions = [
    "Victoria Falls", "South Luangwa National Park", "Lower Zambezi National Park",
    "Kafue National Park", "Lusaka", "Livingstone", "Kasanka National Park",
    "North Luangwa National Park", "Bangweulu Wetlands", "Liuwa Plain National Park"
  ];

  // Debounced search for real-time suggestions
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (!showRealTimeResults || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    debounceTimeoutRef.current = setTimeout(() => {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
      setIsLoading(false);
    }, 300);
  }, [showRealTimeResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (showRealTimeResults) {
      debouncedSearch(value);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          {isLoading ? (
            <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => showRealTimeResults && query.length >= 2 && setShowSuggestions(true)}
            className="pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
          />
        </div>
        <Button 
          type="submit" 
          size="sm" 
          className="rounded-lg px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700"
        >
          Search
        </Button>
      </form>

      {/* Real-time suggestions dropdown */}
      {showRealTimeResults && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2 className="size-5 text-primary animate-spin mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Searching...</div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-150 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-3 w-3 text-muted-foreground" />
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No suggestions found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
import { React, useState, useEffect } from 'react';
import SearchBar from './SearchResultsDropDown';
import RightBar from './layout/Rightbar';
import {
  getSearchResultSuggestions, getCartItems, removeCartItem,
} from '../fetcher';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [allCartItems, setAllCartItems] = useState([]);
  const handleSearchBarInput = async (value) => {
    if (value.length > 0) {
      await getSearchResultSuggestions(value).then((res) => {
        if (res.length > 0) {
          setSearchResults(res);
        } else {
          setSearchResults([]);
        }
      });
    } else {
      setSearchResults([]);
    }
  };
  const goToItem = (id) => {
    window.location = `/search?id=${id}`;
  };

  const recheckInfo = () => {
    getCartItems().then((res) => {
      if (res.length > 0) {
        setAllCartItems(res);
      } else {
        setAllCartItems([]);
      }
    });
  };

  const handleKeyUp = (event) => {
    event.preventDefault();
    handleSearchBarInput(event.target.value);
    if (event.key === 'Enter') {
      goToItem(event.target.value);
    }
  };

  const removeDisplayItem = (id) => {
    const exist = allCartItems.find((x) => x.id === id);
    if (exist) {
      setAllCartItems(
        allCartItems.filter((x) => x.id !== id),
      );
      removeCartItem(id).then(() => {
        recheckInfo();
      });
    }
  };
  useEffect(() => {
    recheckInfo();
  }, []);

  return (
    <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform">
      <RightBar removeDisplayItem={removeDisplayItem} allCartItems={allCartItems} />
      <div className="mainComponent flex flex-col justify-between h-[93vh] w-[100vh - 16rem] overflow-scroll">
        <header className="relative  m-0 pb-3 mb-0 pl-5 pt-3 pr-5">
          <div className="text-2xl font font-bold pt-0 mt-2 text-black pb-1">
            Item Search
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              autoComplete="false"
              id="zoomzoom"
              onKeyUp={handleKeyUp}
              onKeyDown={(event) => {
                handleSearchBarInput(event.target.value);
              }}
              className="bg-white border border-gray-300 text-gray-900 text-md rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  "
              placeholder="Search for an item by name, Lawson number or nickname"
            />
            <div className="absolute w-full">
              <SearchBar id="searchbardropdown" data={searchResults} />
            </div>
          </div>
        </header>

        <div>
          <div className="ml-4 text-2xl font font-bold pt-0 mt-4 text-black pb-1">
            Search By Category
          </div>
          <div className="grid grid-cols-4 gap-4 p-4 inset-x-0 mb-10">
            <button
              data-testid="cardiology"
              type="button"
              onClick={() => {
                window.location = '/search?id=Cardiology&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Cardiology
            </button>
            <button
              data-testid="er"
              type="button"
              onClick={() => {
                window.location = '/search?id=ER&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              ER
            </button>
            <button
              data-testid="pediatric"
              type="button"
              onClick={() => {
                window.location = '/search?id=Pediatric&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Pediatric
            </button>
            <button
              data-testid="emergency"
              type="button"
              onClick={() => {
                window.location = '/search?id=Emergency&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Emergency
            </button>
            <button
              data-testid="neurology"
              type="button"
              onClick={() => {
                window.location = '/search?id=Neurology&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Neurology
            </button>
            <button
              data-testid="orthapedic"
              type="button"
              onClick={() => {
                window.location = '/search?id=Orthopedic&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Orthopedic
            </button>
            <button
              data-testid="oncology"
              type="button"
              onClick={() => {
                window.location = '/search?id=Oncology&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Oncology
            </button>
            <button
              type="button"
              onClick={() => {
                window.location = '/search?id=Cardiology&flag=true';
              }}
              className="p-5 border-2 border-slate-600 font-['Work Sans'] text-xl font-medium hover:bg-slate-100 grid-row-1 rounded-xl"
            >
              Cardiology
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/* eslint-disable array-bracket-spacing */
/* eslint-disable comma-dangle */
import { React, useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pagination from '@mui/material/Pagination';
import RightBar from './layout/Rightbar';

import {
  getSearchResults, getSearchByCategoryResults, addCartItem, getCartItems, removeCartItem,
} from '../fetcher';
import ItemCardAglom from './ItemCardAglom';

function SearchPage() {
  const { location } = window;
  const { search } = location;
  const [, getQuery, ] = search.split('?');
  const params = decodeURIComponent(getQuery.split('=')[1].split('&')[0]);
  const otherparams = decodeURIComponent(getQuery.split('=')[1].split('&')[1]);
  const categorySearchFlag = otherparams === 'flag';

  const [alignment, setAlignment] = useState('A-Z');
  const [allCartItems, setAllCartItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);

  const recheckInfo = () => {
    if (categorySearchFlag) {
      // console.log('here');
      getSearchByCategoryResults(params, alignment, page).then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          // console.log('here2');
          setSearchResults(res.data);
          setTotalPages(Math.ceil(res.num / 9));
        } else {
          setSearchResults([]);
          setTotalPages(Math.ceil(res.num / 9));
        }
      });
    } else {
      getSearchResults(params, alignment, page).then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          setSearchResults(res.data);
          setTotalPages(Math.ceil(res.num / 9));
        } else {
          setSearchResults([]);
          setTotalPages(Math.ceil(res.num / 9));
        }
      });
    }
    getCartItems().then((res) => {
      if (res.length > 0) {
        setAllCartItems(res);
      } else {
        // console.log('empty');
        setAllCartItems([]);
      }
    });
  };

  const handlePageChange = (event, value) => {
    if (categorySearchFlag) {
      // console.log('here');
      getSearchByCategoryResults(params, alignment, value).then((res) => {
        // console.log(res);
        setPage(value);
        if (res.data.length > 0) {
          // console.log('here2');
          // setTotalPages(res.headers["x-total-count"]);
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
        }
      });
    } else {
      getSearchResults(params, alignment, value).then((res) => {
        // console.log(res);
        setPage(value);
        if (res.data.length > 0) {
          // setTotalPages(res.headers["x-total-count"]);
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
        }
      });
    }
  };

  const removeDisplayItem = (id) => {
    const exist = allCartItems.find((x) => x.id === id);
    // console.log('remove call');
    if (exist) {
      setAllCartItems(
        allCartItems.filter((x) => x.id !== id),
      );
      removeCartItem(id).then(() => {
        recheckInfo();
      });
      // console.log('success');
    } else {
      // console.log('failure to remove');
    }
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (categorySearchFlag) {
      // console.log('here');
      getSearchByCategoryResults(params, newAlignment, page).then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          // console.log('here2');
          // setTotalPages(res.headers["x-total-count"]);
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
        }
      });
    } else {
      getSearchResults(params, newAlignment, page).then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          // setTotalPages(res.headers["x-total-count"]);
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
        }
      });
    }
  };

  let title = <div> </div>;

  if (categorySearchFlag) {
    title = (
      <div>
        {' '}
        Items in Category:
        {' '}
        {params}
        {' '}
      </div>
    );
  } else {
    title = (
      <div>
        {' '}
        Search Results for:
        {' '}
        {params}
        {' '}
      </div>
    );
  }

  useEffect(() => {
    recheckInfo();
  }, []);

  return (
    <div className="flex">
      <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform">
        <RightBar removeDisplayItem={removeDisplayItem} allCartItems={allCartItems} />
        <div className="mainComponent h-[93vh] w-[100vh - 16rem] overflow-scroll">
          <header className="relative fixed  m-0 pr-0 pb-3 mb-0 pl-5 pt-5 pr-5">
            <div className="text-3xl font font-bold pt-0 flex align-center justify-between mt-4 text-black pb-1">
              {title}
              <div>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="A-Z">A-Z</ToggleButton>
                  <ToggleButton value="Z-A">Z-A</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>

          </header>

          <div className="container">

            <ItemCardAglom
              items={searchResults}
              passDownFunc={(id, name, image, description, categories) => {
                addCartItem(id, name, image, description, categories)
                  .then(() => recheckInfo());
                recheckInfo();
              }}
              allCartItems={allCartItems}
            />

          </div>
          <footer data-testid="paginationchange" className="absolute bottom-10 w-full flex justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              siblingCount={1}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

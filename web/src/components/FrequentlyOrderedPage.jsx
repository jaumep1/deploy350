import { React, useState, useEffect } from 'react';

import {
  getFrequentlyOrdered, addCartItem, getCartItems, removeCartItem,
} from '../fetcher';
import RightBar from './layout/Rightbar';
import ItemCardAglom from './ItemCardAglom';

function FrequentlyOrderedPage() {
  const [allCartItems, setAllCartItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const recheckInfo = () => {
    getFrequentlyOrdered().then((res) => {
      if (res.length > 0) {
        setSearchResults(res);
      } else {
        setSearchResults([]);
      }
    });

    getCartItems().then((res) => {
      // console.log(res);
      // console.log('got it');
      if (res.length > 0) {
        setAllCartItems(res);
      } else {
        setAllCartItems([]);
      }
    });
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
    } else {
      console.log('failure to remove');
    }
  };

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
              Frequently Ordered
            </div>

          </header>

          <div data-testid="containerforcards" className="container">

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
        </div>
      </div>
    </div>
  );
}

export default FrequentlyOrderedPage;

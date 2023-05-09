/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable array-bracket-spacing */
import { React, useState, useEffect } from 'react';
import RightBar from './layout/Rightbar';
import {
  removeCartItem, getItemByID, getNicknamesByID, editNicknamesByID, getCartItems, addCartItem,
} from '../fetcher';

function CategoryAglom({ categories }) {
  return (
    <div>
      <ul data-testid="categories" className="p-4 pt-1 ml-3 list-disc">
        {categories.map((ting, index) => (<li id={index} key={ting}>{ting}</li>))}
      </ul>
    </div>
  );
}

function NickNameAglom({ nicknames, removeNickname }) {
  if (nicknames.length < 1 || nicknames == null || nicknames === undefined) {
    return <ul data-testid="nicknames" />;
  }
  return (
    <ul data-testid="nicknames" id="nicknameAglom225" className="bg-slate-100 mt-3 border border-gray-200 w-full text-gray-900">
      {nicknames.map((ting, index) => (
        <li key={JSON.stringify(ting)} id={JSON.stringify(ting)} className="px-3 py-1 border-b border-gray-200 w-full">
          <div className="flex items-center justify-between p-0 m-0">
            <div className="flex items-center">
              <div className="justify-self-start p-0 w-36 text-base font-semibold">
                {' '}
                {ting.nickname}
                {' '}
              </div>
              <div className=" justify-self-center text-base p-0">
                {' '}
                {ting.submitter}
              </div>
            </div>
            <div className=" justify-self-end">
              <button type="submit" onClick={() => removeNickname(index, JSON.stringify(ting))} className="text-white  bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-2 py-1"> Remove</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ItemPageButton({ inCart, onClickFunction }) {
  if (inCart) {
    return (
      <button data-testid="ItemPageButton" type="button" className="text-white bg-stone-700  font-small rounded-xl text-sm mt-1 mb-1 ml-3 px-2 py-0 pt-0 pb-0 ">
        Already in Cart
      </button>
    );
  }
  return (
    <button data-testid="ItemPageButton" type="button" onClick={() => onClickFunction()} className="text-white bg-green-700 hover:bg-green-800 font-small rounded-xl text-sm mt-1 mb-1 ml-3 px-2 py-0 pt-0 pb-0 ">
      Add to Cart
    </button>
  );
}

function ItemPage() {
  const [nicknames, setNicknames] = useState([
  ]);

  const [allCartItems, setAllCartItems] = useState([]);
  const [item, setItemInfo] = useState({
    _id: 1, name: 'd', image: '', description: '', categories: '["1", "2", "3"]',
  });

  const { location } = window;
  const { search } = location;
  const [, getQuery, ] = search.split('?');
  const [, params, ] = getQuery.split('=');

  const removeNicknameParentFunction = (indexToRemove) => {
    const curr = nicknames;
    const holder = curr.splice(indexToRemove, 1);
    editNicknamesByID(item._id, curr).then((res) => {
      setNicknames(res.nicknames);
      console.log('removed nickname: ', holder);
    });
  };

  const addNicknameParentFunction = (input) => {
    const curr = nicknames;
    const ting = { nickname: input, submitter: 'You' };
    curr.splice(0, 0, ting);

    editNicknamesByID(params, curr).then((res) => {
      setNicknames(res.nicknames);
    });
  };

  const [categories, setCategories] = useState([]);

  const recheckInfo = () => {
    getItemByID(params).then((res) => {
      setItemInfo(res);
      setCategories(res.categories);
      getNicknamesByID(params).then((response) => {
        setNicknames(response.nicknames);
      });
    });
    getCartItems().then((res) => {
      if (res.length > 0) {
        setAllCartItems(res);
      } else {
        setAllCartItems([]);
      }
    });
  };

  useEffect(() => {
    recheckInfo();
  }, []);

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

  // const DEFAULT_IMG_URL = 'https://pointatech.com/wp-content/uploads/2022/02/71DEhbJBTiL._AC_SL1500_.jpg';
  return (
    <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform">
      <RightBar removeDisplayItem={removeDisplayItem} allCartItems={allCartItems} />
      <div className="mainComponent h-[93vh] w-[100vh - 16rem] overflow-scroll">
        <header className="relative  m-0 pb-3 mb-0 pl-5 pt-4 pr-5">
          <div className="text-2xl flex font-bold mt-2 text-black">
            <p>
              {' '}
              {item.name}
            </p>
            <ItemPageButton
              inCart={allCartItems.some((x) => x.id === item._id)}
              onClickFunction={() => addCartItem(
                item._id,
                item.name,
                item.image,
                item.description,
                item.categories
              ).then(
                () => {
                  recheckInfo();
                }
              )}
            />
          </div>
          <div className="text-stone-400 textlg font font-semibold mb-2 ">
            {' '}
            Lawson Number:
            {item._id}
          </div>
        </header>
        <div className="flex columns-3">
          <div className="mt-2 ml-3 min-w-fit border-2 border-stone-300 p-4 rounded-lg ">
            <img className="aspect-square max-h-80 max-w-72" src={item.image} alt="React" />
          </div>
          <div className="mt-2 ml-3 border-2 min-w-min border-stone-300 rounded-lg">
            <div className="mt-0 w-56 p-2 pt-3 rounded-t-lg text-lg font font-bold"> Categories Included In </div>
            <CategoryAglom categories={categories} />
          </div>
          <div className="mt-2 ml-3 pl-0 mr-5 w-full max-w-6/12 min-h-full">
            <div className="mt-0 ml-0 mr-5 p-3 w-full max-w-screen-sm content-between justify-between flex flex-col min-h-full min-w-96 border-2 border-stone-300 rounded-lg">
              <div>
                <div className="px-0 py-0 w-full rounded-t-lg text-lg font font-bold"> Nicknames </div>
                <NickNameAglom data-testid="nicknameaglom" nicknames={nicknames} removeNickname={removeNicknameParentFunction} />
              </div>
              <div>
                <div className="px-0 py-0 w-full rounded-t-lg text-lg font mt-3 font-bold"> Add Nickname </div>
                <form className="mt-2 justify-items-center">
                  <div className="relative">
                    <input id="comment-adder-9000" type="search" placeholder="Type Nickname Here" className="block w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent" />
                  </div>
                  <div className="flex justify-end mt-3 w-100 place-content-center">
                    <button
                      data-testid="submit-nickname"
                      type="submit"
                      onClick={(event) => {
                        addNicknameParentFunction(document.getElementById('comment-adder-9000').value); event.preventDefault();
                      }}
                      className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      {' '}
                      Submit Nickname
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-screen-xl w-full">
          <div className="h-max-3/12 ml-3 mt-3 w-full mb-2 border-2 border-stone-300 font-['Work Sans'] rounded-xl pt-2 pb-2 mr-4 pl-4 text-lg font-medium ">
            <div className="px-0 py-0 rounded-t-lg w-full text-lg font font-bold">  Description </div>
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export { NickNameAglom, CategoryAglom };
export default ItemPage;

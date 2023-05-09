/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function ButtonOption({
  inCart, iputFunction,
}) {
  if (!inCart) {
    return (
      <button type="button" data-testid="addtocartbutton" onClick={iputFunction} className=" flex justify-end p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-xl group border-2 bg-green-600 hover:bg-green-500 border-green-600">
        <span className="flex px-2 py-0 transition-all text-black ease-in duration-90 rounded-full group-hover:bg-opacity-0">
          <div className="text-md pr-1 text-white flex pl-1 justify-start"> Add to Cart</div>
        </span>
      </button>
    );
  }
  return (
    <button
      data-testid="alreadyincartbutton"
      type="button"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className=" flex justify-end p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-xl group border-2 bg-stone-600"
    >
      <span className="flex px-2 py-0.5 transition-all text-black ease-in duration-90 rounded-full group-hover:bg-opacity-0">
        <div className="text-md pr-1 text-white flex pl-1 justify-start"> Already in Cart</div>
      </span>
    </button>
  );
}

function ItemCard({
  Lawson, image, ItemName, inCart, passDownFunc, categories, description,
}) {
  return (
    <div
      data-testid={Lawson}
      className="mb-0 pt-3 pb-3 group flex border-2 border-color-bg-slate-100 hover:bg-slate-100 rounded-xl pl-3 pr-3"
      id={Lawson}
      onClick={() => {
        window.location = `/item?id=${Lawson}`;
      }}
    >
      <div className=" col-6 flex p-0 min-w-fit">
        <img data-testid={image} className="static aspect-square w-24 min-w-0" src={image} alt="React" />
      </div>
      <div className="col-6 ml-2 flex w-full pl-6">
        <div className="container">
          <div className="pb-0 mb-0 rounded-lg">
            <div
              className="text-lg  font-bold text-gray-900 mt-1 mb-0 pb-0"
              onClick={() => {
                window.location = `/item?id=${Lawson}`;
              }}
            >
              {ItemName}
            </div>
            <div data-testid="LawsonHolder" className="font-['Work Sans'] text-lg font-medium text-gray-500 pb-2 pt-0 mt-0 mb-0 ">
              Lawson:
              {' '}
              {Lawson}
            </div>
            <ButtonOption
              inCart={inCart}
              iputFunction={(e) => {
                e.stopPropagation(); passDownFunc(Lawson, ItemName, image, description, categories);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemCardAglom({ passDownFunc, items, allCartItems }) {
  if (items != null && items.length > 0) {
    const listItems = items.map((item) => (
      <ItemCard
        key={item._id}
        id={item._id}
        ItemName={item.name}
        description={item.description}
        inCart={allCartItems.some((x) => x.id === item._id)}
        categories={item.categories}
        passDownFunc={passDownFunc}
        Lawson={item._id}
        image={item.image}
      />
    ));
    return (
      <div className="grid grid-cols-3 gap-4 p-4  mb-10">
        {listItems}
      </div>
    );
  } return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col">
        <div className="text-lg"> Oops, it doesn&apos;t look like we have anything that matches. Lets try another search! </div>
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={() => {
              window.location = '/';
            }}
            className="w-fit mt-4 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-xl group border-2 bg-blue-600 hover:bg-blue-500 border-blue-600"
          >
            <span className="flex px-2 py-0 transition-all text-black ease-in duration-90  rounded-full group-hover:bg-opacity-0">
              <div data-testid="eerr" className="text-lg pr-1 text-white flex pl-1 justify-start"> Take me back</div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCardAglom;

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/aria-role */
import React from 'react';

const goToItem = (id) => {
  window.location = `/item?id=${id}`;
};

function SearchResultsDropDown({ data }) {
  if (data.length > 0) {
    return (
      <div className="w-full text-gray-900 bg-white border border-gray-200 rounded-lg">
        {data.map((item) => (
          <button type="button" role="button" onClick={() => goToItem(item._id)} className="relative inline-flex items-center px-2 py-2 w-full text-md font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:fill-blue-700 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8l4 4-4 4M8 12h7" />
            </svg>
            {item.name}
          </button>
        ))}
      </div>
    );
  }
  return (<div data-testid="no-results" />);
}

export default SearchResultsDropDown;

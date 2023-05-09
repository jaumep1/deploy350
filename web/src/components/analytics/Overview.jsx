import React from 'react';

function Overview() {
  return (
    <div data-testid="overview" id="overview" className="mx-3 mt-2">
      <div className="text-lg tracking-wide font-semibold mb-2">
        Overview
      </div>
      <div className="grid grid-rows-2">
        <div className="grid grid-cols-3 pb-2 border-b-[1px]">
          <div className="flex flex-col text-center">
            <span>21,900</span>
            <span className="text-xs mt-1">Total Supplies</span>
          </div>
          <div className="flex flex-col text-center">
            <span>1,100</span>
            <span className="text-xs mt-1">Used/day</span>
          </div>
          <div className="flex flex-col text-center">
            <span>1,400</span>
            <span className="text-xs mt-1">Restocked/day</span>
          </div>
        </div>
        <div className="grid grid-cols-4 pt-2">
          <div className="flex flex-col text-center">
            <span>643</span>
            <span className="text-xs mt-1">Avg per unit</span>
          </div>
          <div className="flex flex-col text-center">
            <span>400</span>
            <span className="text-xs mt-1">Avg per unit</span>
          </div>
          <div className="flex flex-col text-center">
            <span>500</span>
            <span className="text-xs mt-1">Avg restocked</span>
          </div>
          <div className="flex flex-col text-center">
            <span>3,200</span>
            <span className="text-xs mt-1">Avg consumed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;

import React from 'react'

function StrategyHeader({strategy}) {
  return (
    <div class='w-full flex flex-col'>
    <div class='w-[100%] flex justify-between px-5 py-2 text-white font-open font-[400]'>
          <div class='w-fit flex flex-row'>
            <span class='mr-4'>
              {strategy}
            </span>
            <span class="material-symbols-outlined font-extralight text-md">
              settings
            </span>
            <span>
              
            </span>
          </div>
          <div>
            <label class="switch px-5">
              <input type="checkbox"/>
              <span class="slider round"></span>
            </label>
            <span class=' px-5 py-2'>Deep Backtesting</span>
          </div>
        </div>
                <div class='w-[calc(85%-2.5rem)] flex flex-row mx-5 border-b-4 border-[#2A2E39] rounded-[1px] ' >
                <div class='tradingPanel text-md font-open py-2 mr-5 font-[300]'>
                  Overview
                </div>
                <div class='text-white text-md font-open my-2 mx-5 font-[300]'>
                  Performance Summary
                </div>
                <div class='text-white text-md font-open my-2 mx-5 font-[300]'>
                 List of Trades
                </div>
                <div class='text-white text-md font-open my-2 mx-5 font-[300]'>
                  Properties
                </div>
              </div>
              </div>
  )
}

export default StrategyHeader
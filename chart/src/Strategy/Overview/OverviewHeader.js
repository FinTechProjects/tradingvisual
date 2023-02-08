import React from 'react'

function OverviewHeader({netProfit, netPercentProfit, maxDrawdownPercent, closedTrades, percentProfitable,profitFactor, maxDrawdown, avgTrade, avgTradePercent, avgBar}) {
  return (
    <div class='flex flex-row justify-between w-[calc(100%-2.5rem)] py-2' >

    {netProfit >= 0 ? <div class='text-[#039981] text-sm font-open py-2 mr-5 font-[400] flex flex-col'>
      <span className='text-white'>Net Profit</span>
      <span>{netProfit} USDT {netPercentProfit}%</span>
    </div> : <div class='text-[#F23545] text-sm font-open py-2 mr-5 font-[400] flex flex-col'>
      <span className='text-white'>Net Profit</span>
      <span>{netProfit} USDT {netPercentProfit}%</span>
    </div>}
    
    <div class='text-white text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
      <span>Total Closed Trades</span>
      <span>{closedTrades}</span>
    </div>

    {percentProfitable >= 0 ? <div class='text-[#039981] text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
     <span  class='text-white'>Percent Profitable</span>
     <span>{percentProfitable}%</span>
    </div> : <div class='text-[#F23545] text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
     <span  class='text-white'>Percent Profitable</span>
     <span>{percentProfitable}%</span>
    </div>}

    {profitFactor >= 1 ? <div class='text-[#039981] text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
     <span class='text-white'>Profit Factor</span>
     <span>{profitFactor}</span>
    </div> : <div class='text-[#F23545]  text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
     <span class='text-white'>Profit Factor</span>
     <span>{profitFactor}</span>
    </div>}


    <div class='text-[#F23545] text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
      <span  class='text-white'>Max Drawdown</span>
      <span>{maxDrawdown} USDT {maxDrawdownPercent}%</span>
    </div>

    {avgTrade >= 0 ? <div class='text-[#039981] text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
     <span class='text-white'>Avg Trade</span>
     <span>{avgTrade} USDT {avgTradePercent}%</span>
    </div> : <div class='text-[#F23545]  text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
     <span class='text-white'>Avg Trade</span>
     <span>{avgTrade} USDT {avgTradePercent}%</span>
    </div>}

    <div class='text-white text-sm font-open my-2 mx-5 font-[400] flex flex-col'>
      <span>Avg # Bars in Trade</span>
      <span>{avgBar}</span>
    </div>
  </div>
  )
}

export default OverviewHeader
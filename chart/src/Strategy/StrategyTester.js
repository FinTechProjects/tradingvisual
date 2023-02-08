import React from 'react'
import OverviewHeader from './Overview/OverviewHeader'
import ProfitChart from './ProfitChart'
import StrategyHeader from './StrategyHeader'

function StrategyTester({strategy,netProfit, netPercentProfit, maxDrawdownPercent, closedTrades, percentProfitable,profitFactor, maxDrawdown, avgTrade, avgTradePercent, avgBar}) {
  return (
        <div class='w-[85%]'>
          <div className='w-full flex flex-col items-center'>         <StrategyHeader strategy={strategy}/>
          <OverviewHeader netProfit={netProfit} netPercentProfit={netPercentProfit} 
          maxDrawdownPercent={maxDrawdownPercent} closedTrades={closedTrades} 
          percentProfitable={percentProfitable} profitFactor={profitFactor} maxDrawdown={maxDrawdown} 
          avgTrade={avgTrade} avgTradePercent={avgTradePercent} avgBar={avgBar}/></div>
 
          <div class='w-[calc(100%-4px-1.25rem)] ml-[1.25rem]'><ProfitChart widthPercent={1} height={200} 
        background={"#131722"}
        wickUpColor={"rgb(54, 116, 217)"}
        upColor={"rgb(54, 116, 217)"}
        wickDownColor={"rgb(225, 50, 85)"}
        downColor={"rgb(225, 50, 85)"}/></div>
                
        </div>
  )
}

export default StrategyTester
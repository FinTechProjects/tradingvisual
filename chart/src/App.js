import React, { useEffect, useState } from "react";
// import StrategyTester from "./Strategy/StrategyTester";
import Trader from "./Trader";
// import ProfitChart from "./Strategy/ProfitChart";
import SideBarHeader from "./SideBar/SideBarHeader";
import { Chart } from "./graph";
export default function App() {
  const [coin, setCoin] = useState("ETHUSDT")
  // const [tradingPanel, setTradingPanel] = useState(true)
  // const [indicators, setIndicators] = useState(false)
  // const [account, setAccount] = useState(false)
  // const [performance, setPerformance] = useState(false)
  const [strategy, setStrategy] = useState("Pivot Point Strategy")
  const t =  new Trader()
  return (
    <div class="bg-[#131722] w-screen h-screen flex flex-row">
      <div class='flex flex-row w-screen'>
      <div class='border-r-4 border-[#2A2E39] w-[85%] h-screen'>
      <Chart widthPercent={1} height={400} 
        background={"#1b1f2a"}
        wickUpColor={"rgb(54, 116, 217)"}
        upColor={"rgb(54, 116, 217)"}
        wickDownColor={"rgb(225, 50, 85)"}
        downColor={"rgb(225, 50, 85)"} trader={t}/>
          <div class='w-screen flex flex-col' >
        <div class='w-[85%] flex flex-row  border-b-2 border-t-8 border-[#2A2E39] ' >
          <div class='tradingPanel text-md font-open py-2 px-5 font-[400]'>
            {/* Strategy Tester {t.entry} */}
          </div>
          <div onClick={()=>{alert(t.omoney())}} class='text-white text-md font-open py-2 px-5 font-[400]'>
            Indicators {t.omoney()}
          </div>
          <div class='text-white text-md font-open py-2 px-5 font-[400]'>
            Account
          </div>
          <div class='text-white text-md font-open py-2 px-5 font-[400]'>
            Performance
          </div>
          
        </div>
        {/* <StrategyTester strategy={strategy} netProfit={t.netProfit()} netPercentProfit={t.netPercentProfit()} 
          maxDrawdownPercent={t.maxDrawdownPercent()} closedTrades={t.tradeNum} 
          percentProfitable={t.percentProfit()} profitFactor={t.profitFactor()} maxDrawdown={t.maxDrawdown} 
          avgTrade={t.avgTrade()} avgTradePercent={t.avgTradePercent()} avgBar={t.avgBar}/> */}
        </div>
      
        </div>
        <SideBarHeader coin={"ETHUSDT"}/>
        </div>
    </div>
    
  );
}
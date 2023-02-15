import { createChart, ColorType, CrosshairMode, LineStyle} from 'lightweight-charts';
import React, { useEffect, useRef, useState} from 'react';
import Indicators from './Indicators';
export const Chart = ({widthPercent=1, height=300,
    background='black', 
    textColor='white', fontSize=11, fontFamily="'Trebuchet MS', Roboto, Ubuntu, sans-serif", 
    upColor="green", downColor="red", wickVisible=true, wickUpColor = "green", wickDownColor="red", barSpacing=10,
    vertLine="#444", horzLine="#444",
    currency = "USD",
    chvlWidth = 8, chvlColor = "#C3BCDB44", chvlbgColor="#9B7DFF",
    chhlColor="#9B7DFF", chhlbgColor="#9B7DFF", trader}) => {
	  const chartContainerRef = useRef();
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")

    const points = []
    const pointsLength = 100;

    var timeIndex = 0

    const candleList = []
    const candelListLength = 30

    const markers = []  
    const markersLength = 5 

    const prevCandle = {time: 0, open:0, close: 0, high: 0, low:0}
    const candle = {time: 0, open:0, close: 0, high: 0, low:0}
    var entry = 0

    var prevEMA12 = 0
    var EMA12 = 0
    
    var prevEMA26 = 0
    var EMA26 = 0

    const MACD = []
    const macdLength = 10

    var prevMACD = 0

    const delta = []
    const deltaLength = 5 

    var aMACD = 0

    const ind = new Indicators();
    
    function storeData() {
      let money = trader.omoney()
      console.log(money);
      fetch('http://localhost:3001/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({candle, money}),
      })
    }
    function findTime(time) {
        return Math.floor((time)/1000)
    }
    function updatEMA(){
        let length12 = ind.updateEMA(candleList, prevEMA12, 12, EMA12)
        let length26 = ind.updateEMA(candleList, prevEMA26, 26, EMA26)
        EMA12 = length12[0]
        prevEMA12 = length12[1]
        EMA26 = length26[0]
        prevEMA26 = length26[1]
        MACD.push(EMA12-EMA26)
        if (MACD.length > 9){
            let length9 = ind.updateEMA(MACD, prevMACD, 9, aMACD)
            aMACD = length9[0]
            prevMACD = length9[1]
            delta.push(MACD[MACD.length-1] - aMACD)
        }

        
        
    }
    function update(){
      createNormalCandle()
    }
    function createHeikinCandle(){
        var high = 0
        var low = 1000000
        for (var i  = timeIndex; i<points.length; i++){
            if (points[i].p > high)
                high = points[i].p
            if (points[i].p < low)
                low = points[i].p
        }
        candle.time = points[timeIndex].t
        candle.high = high
        candle.low = low
        if (prevCandle.time == 0){
            candle.open = points[timeIndex].p
            candle.close = points[points.length-1].p
        } else{
            candle.open = (prevCandle.open+prevCandle.close)/2
            candle.close = (candle.open+candle.low+candle.high)/3
        }
        if (points.length > 1 && points[points.length-1].t > points[timeIndex].t){
            timeIndex = points.length-1
            if (candle.time != 0){
                candleList.push({...candle})
          
                prevCandle.open = candle.open
                prevCandle.time = candle.time
                prevCandle.close = candle.close
                prevCandle.high = candle.high
                prevCandle.low = candle.low
            }
      }
    }
    function createNormalCandle(){
      var high = 0
      var low = 1000000
      for (var i  = timeIndex; i<points.length; i++){
          if (points[i].p > high)
              high = points[i].p
          if (points[i].p < low)
              low = points[i].p
      }
      candle.time = points[timeIndex].t
      candle.high = high
      candle.low = low
      candle.open = points[timeIndex].p
      candle.close = points[points.length-1].p
      if (points.length > 1 && points[points.length-1].t > points[timeIndex].t){
        timeIndex = points.length-1
        if (candle.time != 0){
            candleList.push({...candle})
            if (candleList.length > 30){
              updatEMA()
            }
            prevCandle.open = candle.open
            prevCandle.time = candle.time
            prevCandle.close = candle.close
            prevCandlef.high = candle.high
            prevCandle.low = candle.low
            storeData()
            buy()
            
        }
      }
    }
    function buy(){
      if (delta.length > 2){
        if ((delta[delta.length-1] >= 0 && delta[delta.length-2] <= 0)){
            markers.push({
                time: candle.time,
                position: 'belowBar',
                color: '#2196F3',
                shape: 'arrowUp',
                text: 'MACD BUY@ ',
            });
            entry = trader.tradeLong(points[points.length-1].p)
            
        } else if ((delta[delta.length-1] <= 0 && delta[delta.length-2] >= 0)){
            markers.push({
                time: candle.time,
                position: 'aboveBar',
                color: '#e91e63',
                shape: 'arrowDown',
                text: 'MACD SELL@ ',
            });
            entry = trader.tradeShort(points[points.length-1].p)
        }
      }   
    }

        
    useEffect( 
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth*widthPercent});
			};
			const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: background },
                    textColor: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                },
                grid: {
                    vertLines: { color: vertLine },
                    horzLines: { color: horzLine },
                  },
				width: chartContainerRef.current.clientWidth*widthPercent,
				height: height,
			});
      chart.timeScale().applyOptions({
        barSpacing: barSpacing,
        timeVisible: true,
      });
      chart.applyOptions({
          crosshair: {
            mode: CrosshairMode.Normal,

            vertLine: {
              width: chvlWidth,
              color: chvlColor,
              style: LineStyle.Solid,
              labelBackgroundColor: chvlbgColor,
            },

            horzLine: {
              color: chhlColor,
              labelBackgroundColor: chhlbgColor,
            },
          },
      });
      const currentLocale = window.navigator.languages[0];
      const myPriceFormatter = Intl.NumberFormat(currentLocale, {
        style: "currency",
        currency: currency,
      }).format;
      // Apply the custom priceFormatter to the chart
      chart.applyOptions({
        localization: {
          priceFormatter: myPriceFormatter,
        },
      });
      const areaSeries = chart.addAreaSeries({
        lastValueVisible: false, // hide the last value marker for this series
        crosshairMarkerVisible: false, // hide the crosshair marker for this series
        lineColor: "transparent", // hide the line
      });
      const EMA12Chart = chart.addLineSeries({
        color: "rgb(0, 255, 48)"
      })
      const EMA26Chart = chart.addLineSeries({
        color: "rgb(255, 0, 239)"
      })
      const entryChart = chart.addLineSeries()
      const MACDChart = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        // set the positioning of the volume series
        scaleMargins: {
            top: 0.7, // highest point of the series will be 70% away from the top
            bottom: 0,
        },
      })
      const aMACDChart = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        // set the positioning of the volume series
        scaleMargins: {
            top: 0.85, // highest point of the series will be 70% away from the top
            bottom: 0.0,
        },
      })
      const newSeries = chart.addCandlestickSeries();
      newSeries.applyOptions({
          upColor: upColor, 
          downColor: downColor, 
          wickVisible: wickVisible,
          wickUpColor: wickUpColor,
          wickDownColor: wickDownColor})
      socket.onopen = function(e) {
          alert("[open] Connection established");
          alert("Sending to server");
      };
      socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        points.push({t: parseInt(findTime(data.T)), p: parseFloat(data.p)})
        update();
        newSeries.update(candle)
        newSeries.setMarkers(markers);

        areaSeries.applyOptions({
            lastValueVisible: false, // hide the last value marker for this series
            crosshairMarkerVisible: false, // hide the crosshair marker for this series
            // lineColor: "transparent", // hide the line
            topColor: ((!trader.inProfit(points[points.length-1].p)) ? "rgba(155,0,0,0.6)" : "rgba(8,255,8,0.6)"),
            bottomColor: ((!trader.inProfit(points[points.length-1].p)) ? "rgba(155,0,0,0.1)" : "rgba(8,255,8,0.1)"),
          });
        if (EMA12 != 0){
            EMA12Chart.update({time: candle.time, value: EMA12})
        }
        if (EMA26 != 0){
            EMA26Chart.update({time: candle.time, value: EMA26})
        }
        areaSeries.update({time: candle.time, value: candle.close})
        if (MACD.length > 1){
            if (MACD[MACD.length-1] > 0){
                MACDChart.update({time: candle.time, value: MACD[MACD.length-1], color:"rgba(0, 255, 0, 1)"})
            } else {
                MACDChart.update({time: candle.time, value: MACD[MACD.length-1], color:"rgba(255, 0, 0, 1)"})
            }
            
        }
        if (delta.length > 1){
            if (delta[delta.length-1] > 0){
                aMACDChart.update({time: candle.time, value: delta[delta.length-1], color: "rgba(0, 0, 255, 1)"})
            } else {
                aMACDChart.update({time: candle.time, value: delta[delta.length-1], color: "rgba(255, 149, 0, 1)"})
            }
            
        }
        if (entry != 0){
            entryChart.update({time: candle.time, value: entry})
        }
        
      };
      socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          alert('[close] Connection died');
        }
      };
      socket.onerror = function(error) {
        alert(`[error]`);
      };
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[]
	);



	return (
    <div>
      <div ref={chartContainerRef}/>
      <div class='text-white'>
          {delta}
      </div>
    </div>
        
	);
};
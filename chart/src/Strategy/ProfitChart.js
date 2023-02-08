import { createChart, ColorType, CrosshairMode, LineStyle} from 'lightweight-charts';
import React, { useEffect, useRef, useState} from 'react';
// import Trader from './Trader';
function ProfitChart({height=300,
    background='black', 
    textColor='white', fontSize=11, fontFamily="'Trebuchet MS', Roboto, Ubuntu, sans-serif", 
    currency = "USD",
    chvlWidth = 8, chvlColor = "#C3BCDB44", chvlbgColor="#9B7DFF",
    chhlColor="#9B7DFF", chhlbgColor="#9B7DFF", data=[], trader}) {
    const chartContainerRef = useRef();
    
    useEffect(
        
		() => {
            // alert(data);
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth,
            });
			};
			const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: background },
                    textColor: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                },
                grid: {
                    vertLines: {
                        visible: false
                    },
                    horzLines: {
                        visible: false
                    }
                  },
				width: chartContainerRef.current.clientWidth,
				height: height,
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
              chart.timeScale().fitContent();
              chart.timeScale().applyOptions({
                lockVisibleTimeRangeOnResize: true,
                    fixRightEdge: true,
                    fixLeftEdge: true,
              })

              const lossSeries = chart.addLineSeries({              });
            //   const winSeries = chart.addAreaSeries({
            //     lastValueVisible: false, // hide the last value marker for this series
            //     crosshairMarkerVisible: false, // hide the crosshair marker for this series
            //     lineColor: "transparent", // hide the line
            //     topColor: "rgba(155,0,0,0.6)",
            //     bottomColor: "rgba(155,0,0,0.1)",
            // });
            //   winSeries.setData(winData);
            //   lossSeries.setData(lossData);
              
            // const newSeries = chart.addCandlestickSeries();
            // newSeries.applyOptions({
            //     upColor: upColor, 
            //     downColor: downColor, 
            //     wickVisible: wickVisible,
            //     wickUpColor: wickUpColor, 
            //     wickDownColor: wickDownColor})
            // newSeries.setData([
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000, open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+1*3600, open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+2*3600, open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+3*3600, open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+4*3600, open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+5*3600, open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+6*3600, open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+7*3600, open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+8*3600, open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
            //     { time: (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0))).getTime() / 1000+9*3600, open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
            // ]);



			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[]
	);
  return (
    <div
			ref={chartContainerRef}
		/>
  )
}

export default ProfitChart
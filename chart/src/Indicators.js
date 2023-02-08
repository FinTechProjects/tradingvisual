class Indicators {
    constructor(){
    }

    pivotHigh(candles, left, right){
        var mainIndex = (candles.length-1-right)
        var rightIndex = mainIndex+1
        var leftIndex = mainIndex-left
        var pivot = true
        for (var i = 0; i<right; i++){
            if (candles[mainIndex].high <= candles[rightIndex+i].high){
                pivot = false
            } 
        }
        for (var i = 0; i<left; i++){
            if (candles[mainIndex].high <= candles[leftIndex+i].high){
                pivot = false
            }
        }
        return (pivot ? candles[mainIndex].high : NaN)
    }
    
    pivotLow(candles, left, right){
        var mainIndex = (candles.length-1-right)
        var rightIndex = mainIndex+1
        var leftIndex = mainIndex-left
        var pivot = true
        for (var i = 0; i<right; i++){
            if (candles[mainIndex].high >= candles[rightIndex+i].high){
                pivot = false
            }
        }
        for (var i = 0; i<left; i++){
            if (candles[mainIndex].high >= candles[leftIndex+i].high){
                pivot = false
            }
        }
        return (pivot ? candles[mainIndex].high : NaN)
    }
    
    leastSquareMovingAverage(candles){

    }
    
    relativeStrengthIndex(candles){

    }
    
    movingAverageConverganceDivergance(candles){

    }
    
    bollingerBands(candles, stdDev){

    }
    isTurning(candle){
        var up = (candle.open < candle.close )
        if (
        (candle.high - (up ? candle.close : candle.open) > 3*Math.abs(candle.close-candle.open) || 
        ((up ? candle.open : candle.close) - candle.low)  > 3*Math.abs(candle.close-candle.open)) 
        ){
            return true
        }
        return false
    }
    updateEMA(candle, prevEMA, length, EMA){
        if (prevEMA == 0){
            for (var i = 0; i<length;i++){
                if (typeof candle[candle.length-1-i] == 'number'){
                    prevEMA += candle[candle.length-1-i]
                } else {
                    prevEMA += candle[candle.length-1-i].close
                }
                
            }
            prevEMA /= length
        } else {
            prevEMA = EMA
        }
        if (typeof candle[candle.length-1] == 'number'){
            return [(2/(length+1)*(candle[candle.length-1] - prevEMA)+prevEMA), prevEMA];
        } else {
            return [(2/(length+1)*(candle[candle.length-1].close - prevEMA)+prevEMA), prevEMA];
        }
    }
    candlePattern(candle){
        // var up = (candle[candle.length-1].open < candle[candle.length-1].close )
        // if (
        // (candle[candle.length-1].high - (up ? candle[candle.length-1].close : candle[candle.length-1].open) > 3*Math.abs(candle[candle.length-1].close-candle[candle.length-1].open) || 
        // ((up ? candle[candle.length-1].open : candle[candle.length-1].close) - candle[candle.length-1].low)  > 3*Math.abs(candle[candle.length-1].close-candle[candle.length-1].open)) 
        // ){
        //     if (candle[candle.length-4].close > candle[candle.length-1].close){
        //         return -1
        //     }
        //     else return 1
        //     // if (candle[candle.length-2].open < candle[candle.length-2].close != up){
                
        //     // }
        // }
        for (var i = 1; i<4;i++){
            if (this.isTurning(candle[candle.length-i])){
                if (candle[candle.length-i].open > candle[candle.length-i].close != candle[candle.length-1].open > candle[candle.length-1].close || i == 1){
                    if (candle[candle.length-1].open > candle[candle.length-1].close){
                        return -1
                    } else {
                        return 1
                    }
                }
            }
        }
        return 0
        
    }

    
}
export default Indicators
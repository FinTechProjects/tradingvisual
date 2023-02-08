class Trader {
    constructor(){
        this.long = false
        this.short = false
        this.entry = 0
        this.initialmoney = 1000
        this.money = 1000
        this.tradeNum = 0
        this.trades = [{"time": new Date(1674766953), "trade #": 1, "type": "Short", "entry": 1569.59, "exit": 1612.74, 'amount': 1000, "profitMoney": 15.72, "profitPercent": 1.23, "signal": "pivothigh", "coin": "ETHUSDT", "totalProfit": 1420.4}]
        // this.netProfit = 0
        this.lossTrades = 0
        this.winTrades = 0
        this.winVolume = 0
        this.lossVolume = 0
        // this.profitFactor = 0
        this.maxDrawdown = 0
        this.avgBar = 0
        this.tradeVolume = 0

    }

    omoney(){
        return this.money
    }

    get netPercentProfit(){
        if (this.initialmoney == 0){
            return 0
        }
        return this.netProfit/this.initialmoney
    }
    get percentProfit(){
        return this.winTrades/this.lossTrades
    }
    get profitFactor(){
        return this.winVolume/this.lossVolume
    }
    get netProfit(){
        return this.money-this.initialmoney
    }
    get maxDrawdownPercent(){
        if (this.initialmoney == 0){
            return 0
        }
        return this.maxDrawdown/this.initialmoney
    }
    get avgTradePercent(){
        if (this.tradeVolume== 0){
            return 0
        }
        return this.netProfit/this.tradeVolume
    }
    get avgTrade(){
        if (this.tradeNum == 0){
            return 0
        }
        return this.netProfit/this.tradeNum;
    }
    tradeLong(price){
        // alert("TRADE")
        if (!this.long){
            this.tradeStop(price)
            this.long = true
            this.entry = price
        }
        return this.entry
        // alert(this.money)
    }
    tradeShort(price){
        // alert("TRADE")
        if (!this.short){
            this.tradeStop(price)
            this.short = true
            this.entry = price
        }
        return this.entry
        // alert(this.money)
    }
    getMoney(){
        return this.money
    }
    tradeStop(price){

        if (this.long){
            // var start = this.money
            this.money*=(1+(price-this.entry)/this.entry)
            // if (this.money - start > 0){
            //     this.winVolume += this.money - start
            // } else {
            //     this.lossVolume += start - this.money
            // }
            this.long = false
            this.entry = 0
            // this.tradeNum+=1
            // if (this.inProfit(price)){
            //     this.winTrades +=1
            // } else{
            //     this.lossTrades -=1
            // }
        } else if (this.short){
            // var start = this.money
            this.money*=(1+(this.entry-price)/this.entry)
            // if (this.money - start > 0){
            //     this.winVolume += this.money - start
            // } else {
            //     this.lossVolume += start - this.money
            // }
            this.short = false
            this.entry = 0
            // this.tradeNum+=1
            // if (this.inProfit(price)){
            //     this.winTrades +=1
            // } else{
            //     this.lossTrades -=1
            // }
        }
        
        return this.money
    }
    inProfit(price){
        //  
        if (this.long){
            return this.entry <= price
        } else if (this.short){
            return this.entry >= price
        }
        return false
    }
}
export default Trader
function roundToWhole(n : number) {
    return Math.floor(Number((n).toFixed(2)));
}

function round(number: number, precision: number) {
    if (precision < 0) {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }
    else
      return +(Math.round(Number(number + "e+" + precision)) +
        "e-" + precision);
}

enum AccountType {
    Cash,
    Margin
}

class TradingDayResult {
    id: number;
    balance: number;
    profit: number;
    tradeCount: number;
    sharesCount: number;
}

class DayTradingForecaster {
    expectedProfitPerShare: number;
    costPerShare: number;
    initialBalance: number;
    numTradingDays: number;
    accountType: AccountType;
    results: TradingDayResult[];

    constructor(
        expectedProfitPerShare: number = 0.05, 
        costPerShare: number = 4.0, 
        initialBalance: number = 1000.0, 
        numTradingDays: number = 50, 
        accountType: AccountType = AccountType.Cash
    ) {
        this.expectedProfitPerShare = expectedProfitPerShare;
        this.costPerShare = costPerShare;
        this.initialBalance = initialBalance;
        this.numTradingDays = numTradingDays;
        this.accountType = accountType;
        this.results = [];
    }

    generate(n = 1, previousDayResult: TradingDayResult | undefined = undefined) {
        let currentDayResult = new TradingDayResult();
        
        let startBalance = (previousDayResult != undefined ? previousDayResult.balance : this.initialBalance);
        currentDayResult.id = n;
        currentDayResult.sharesCount = roundToWhole(startBalance / this.costPerShare);
        currentDayResult.profit = round(currentDayResult.sharesCount * this.expectedProfitPerShare, 3);
        currentDayResult.balance = round(startBalance + currentDayResult.profit, 3);
        if (this.accountType == AccountType.Cash) currentDayResult.tradeCount = 1;
        else currentDayResult.tradeCount = -1; // Margin Account not implemented

        this.results.push(currentDayResult);
        if (n <= this.numTradingDays) this.generate(++n, currentDayResult);
    }
}

let forecaster = new DayTradingForecaster();
forecaster.generate();

console.log(forecaster.results);





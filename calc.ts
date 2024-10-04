
// This function rounds to a whole number.
function roundToWhole(n : number) {
    return Math.floor(Number((n).toFixed(2)));
}

// This function rounds to 2 decimal places since we are dealing with currency.
function round(number: number, precision: number) {
    if (precision < 0) {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }
    else
      return +(Math.round(Number(number + "e+" + precision)) +
        "e-" + precision);
}

// These are the types of trading accounts that can used.
enum AccountType {
    Cash,
    Margin
}

// This class is for representing individual trading days.
class TradingDayResult {
    id: number;
    balance: number;
    profit: number;
    tradeCount: number;
    sharesCount: number;

    constructor(){
        this.id = 0;
        this.balance = 0;
        this.profit = 0;
        this.tradeCount = 0;
        this.sharesCount = 0;
    }
}

// This is the class that generates the forecast
class DayTradingForecaster {
    expectedProfitPerShare: number;
    costPerShare: number;
    initialBalance: number;
    numTradingDays: number;
    accountType: AccountType;
    results: TradingDayResult[];

    constructor(
        expectedProfitPerShare: number = 0.05, 
        costPerShare: number = 3.0, 
        initialBalance: number = 1000.0, 
        numTradingDays: number = 50, 
        accountType: AccountType = AccountType.Cash
    ) {
        if (expectedProfitPerShare <= 0 || costPerShare <= 0 || initialBalance <=0 || numTradingDays <= 0)
            throw new RangeError('Values for all numerical fields must be greater than 0');
        this.expectedProfitPerShare = expectedProfitPerShare;
        this.costPerShare = costPerShare;
        this.initialBalance = initialBalance;
        this.numTradingDays = numTradingDays;
        this.accountType = accountType;
        this.results = [];
    }

    async generate(n = 1, previousDayResult: TradingDayResult | undefined = undefined) {
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

export { DayTradingForecaster };






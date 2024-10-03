function roundToWhole(n) {
    return Math.floor(Number((n).toFixed(2)));
}
function round(number, precision) {
    if (precision < 0) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
    else
        return +(Math.round(Number(number + "e+" + precision)) +
            "e-" + precision);
}
var AccountType;
(function (AccountType) {
    AccountType[AccountType["Cash"] = 0] = "Cash";
    AccountType[AccountType["Margin"] = 1] = "Margin";
})(AccountType || (AccountType = {}));
var TradingDayResult = /** @class */ (function () {
    function TradingDayResult() {
    }
    return TradingDayResult;
}());
var DayTradingForecaster = /** @class */ (function () {
    function DayTradingForecaster(expectedProfitPerShare, costPerShare, initialBalance, numTradingDays, accountType) {
        if (expectedProfitPerShare === void 0) { expectedProfitPerShare = 0.05; }
        if (costPerShare === void 0) { costPerShare = 4.0; }
        if (initialBalance === void 0) { initialBalance = 1000.0; }
        if (numTradingDays === void 0) { numTradingDays = 50; }
        if (accountType === void 0) { accountType = AccountType.Cash; }
        this.expectedProfitPerShare = expectedProfitPerShare;
        this.costPerShare = costPerShare;
        this.initialBalance = initialBalance;
        this.numTradingDays = numTradingDays;
        this.accountType = accountType;
        this.results = [];
    }
    DayTradingForecaster.prototype.generate = function (n, previousDayResult) {
        if (n === void 0) { n = 1; }
        if (previousDayResult === void 0) { previousDayResult = undefined; }
        var currentDayResult = new TradingDayResult();
        var startBalance = (previousDayResult != undefined ? previousDayResult.balance : this.initialBalance);
        currentDayResult.id = n;
        currentDayResult.sharesCount = roundToWhole(startBalance / this.costPerShare);
        currentDayResult.profit = round(currentDayResult.sharesCount * this.expectedProfitPerShare, 3);
        currentDayResult.balance = round(startBalance + currentDayResult.profit, 3);
        if (this.accountType == AccountType.Cash)
            currentDayResult.tradeCount = 1;
        else
            currentDayResult.tradeCount = -1; // Margin Account not implemented
        this.results.push(currentDayResult);
        if (n <= this.numTradingDays)
            this.generate(++n, currentDayResult);
    };
    return DayTradingForecaster;
}());
var forecaster = new DayTradingForecaster();
forecaster.generate();
console.log(forecaster.results);

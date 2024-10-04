import { DayTradingForecaster } from "./calc";

class Main {
    async calculate_working() {
        try {
            let forecaster = new DayTradingForecaster();
            await forecaster.generate();
            
            console.log(forecaster.results);
        } catch (err) {
            console.log(err);
        }
    }

    async calculate_error() {
        try {
            let forecaster = new DayTradingForecaster(0, 0, 0, 0);
            await forecaster.generate();
            
            console.log(forecaster.results);
        } catch (err) {
            console.log(err);
        }
    }
}

const main =new Main()
// main.calculate_working();
main.calculate_error();

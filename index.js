import inquirer from "inquirer";
import chalk from "chalk";
console.log(`\n\t\t\t\t\t ${chalk.rgb(119, 0, 200)("WELCOME TO CURRENCY CONVERTOR ON CONSOLE")}`);
let CurrencyLink = "https://v6.exchangerate-api.com/v6/8b7e1fc89cecc05763e44e75/latest/PKR";
let CurrencyFetch = async (data) => {
    let CurrencyFetch = await fetch(data);
    let res = await CurrencyFetch.json();
    return res.conversion_rates;
};
let value = await CurrencyFetch(CurrencyLink);
let countries = Object.keys(value);
let countryFrom = await inquirer.prompt({
    name: "from",
    type: "list",
    message: `${chalk.magenta("Amount Converted from")}`,
    choices: countries
});
let amoount = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: `${chalk.green("please enter the amount in")} ${chalk.blueBright(countryFrom.from)} `
});
let countryTo = await inquirer.prompt({
    name: "to",
    type: "list",
    message: `${chalk.magenta("Amount Converted To")}`,
    choices: countries
});
let conversionRateLink = `https://v6.exchangerate-api.com/v6/8b7e1fc89cecc05763e44e75//pair/${countryFrom.from}/${countryTo.to}`;
let conversionRateFetch = async (conversionFetchData) => {
    let conversionRate = await fetch(conversionFetchData);
    let res = await conversionRate.json();
    return res.conversion_rate;
};
let rate = await conversionRateFetch(conversionRateLink);
let conversion_rate = amoount.amount * rate;
console.log(` Your Conversion Amount Is ${chalk.blue(conversion_rate)}`);

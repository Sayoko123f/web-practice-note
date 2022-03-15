import * as readline from "readline";

export default function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

// How to use
// const ans = await askQuestion("Are you sure?");
// console.log('Your answer:', ans);
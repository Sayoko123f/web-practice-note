<template>
  <div>
    <button v-show="showGameStartButton" type="button" @click="setAnswer()">
      Start
    </button>
    <div v-if="gameStart">
      <div>
        <p v-for="(v, i) in gameMessage" :key="i">{{ v }}</p>
      </div>
      <input
        type="text"
        maxlength="4"
        v-model="p.guess"
        @keyup.enter="guess()"
        :disabled="disableGuess"
      />
      <button type="button" @click="guess()" :disabled="disableGuess">
        Guess
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("GuessNumber Component mounted.");
  },
  data: () => ({
    gameStart: false,
    disableGuess: true,
    showGameStartButton: true,
    gameMessage: [],
    c: {
      answer: [],
    },
    p: {
      guess: "",
    },
  }),
  methods: {
    setAnswer() {
      this.c.answer = [];
      for (let i = 0; i < 4; i++) {
        this.c.answer.push(Math.floor(Math.random() * 10));
      }
      console.log("c.answer: ", this.c.answer);
      this.showGameStartButton = false;
      this.gameMessage = [];
      this.gameStart = true;
      this.disableGuess = false;
    },
    guess() {
      let g = this.p.guess;
      //   console.log(g);
      if (!g || !g.match(/\d{4}/) || g.length !== 4) {
        this.gameMessage.push("Please enter 4 digit number");
        this.p.guess = "";
        return;
      }
      /** Valid answer */
      let ans = this.c.answer.slice();
      let count = { a: 0, b: 0 };
      let doubleCheck = { p: [], c: [] };
      for (let i = 0; i < 4; i++) {
        let v = ans.shift();
        // console.log("v: ", v);
        // console.log("g[i]: ", g[i]);
        if (parseInt(g[i]) === v) {
          count.a++;
        } else {
          doubleCheck.c.push(v);
          doubleCheck.p.push(g[i]);
        }
      }
      //   console.log("doubleCheck.c: ", doubleCheck.c);
      //   console.log("doubleCheck.p: ", doubleCheck.p);

      for (let i = 0; i < doubleCheck.p.length; i++) {
        for (let j = 0; j < doubleCheck.c.length; j++) {
          //   console.log("doubleCheck.c[j]: ", doubleCheck.c[j]);
          //   console.log("doubleCheck.p[i]: ", doubleCheck.p[i]);
          if (parseInt(doubleCheck.p[i]) === doubleCheck.c[j]) {
            doubleCheck.p.splice(i, 1);
            doubleCheck.c.splice(j, 1);
            (i -= 1), (j -= 1);
            count.b++;
            break;
          }
        }
      }
      this.gameMessage.push(`${g}:${count.a}A${count.b}B`);
      if (count.a === 4) {
        this.win();
      }
      /** end Valid */
      this.p.guess = "";
    },
    win() {
      this.disableGuess = true;
      this.gameMessage.push("Answer is " + this.c.answer + ".");
      this.gameMessage.push("You Win!");
      /** Restart */
      this.showGameStartButton = true;
      /** end Restart */
    },
  },
};
</script>

<style>
</style>
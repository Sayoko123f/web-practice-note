<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("ExampleComponent mounted.");
  },
  data: () => ({
    test: "test",
  }),
  computed: {
    hello() {
      return "hello";
    },
  },
  methods: {
    hi(){
      console.log('hi');
    },
  },
};
</script>

<style scoped>
</style>
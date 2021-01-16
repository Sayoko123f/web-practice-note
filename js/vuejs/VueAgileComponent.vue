<template>
  <agile
    :nav-buttons="false"
    :autoplay-speed="5000"
    :speed="2500"
    dots
    fade
    pause-on-hover
    pause-on-dots-hover
    autoplay
  >
    <div class="silde">
      <img :src="imgsPath[0]" />
    </div>
    <div class="silde">
      <img :src="imgsPath[1]" />
    </div>
    <div class="silde">
      <img :src="imgsPath[2]" />
    </div>
  </agile>
</template>

<script>
import { VueAgile } from "vue-agile";

export default {
  components: {
    agile: VueAgile,
  },
  data: () => ({
    imgsPath: Object,
  }),
  props: {
    imgs: String,
  },
  mounted() {
    console.log("VueAgileComponent mounted.");
    this.imgsPath = JSON.parse(this.imgs);
  },
};
</script>

<style>
.agile__dots {
  bottom: 10px;
  flex-direction: column;
  right: 30px;
  position: absolute;
}
.agile__dot {
  margin: 5px 0;
}
.agile__dot button {
  background-color: transparent;
  border: 1px solid #fff;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button,
.agile__dot:hover button {
  background-color: #fff;
}

.slide {
  display: block;
  height: 500px;
  object-fit: cover;
  width: 100%;
}
</style>
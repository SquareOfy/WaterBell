<template lang="">
  <div>
    <div class="select-region">
      <div class="select-region-box">
        <router-link to="/road/systemlog/measureLog"
          >센서 측정 로그</router-link
        >
      </div>
      <div class="select-region-box">
        <router-link to="/road/systemlog/statusLog">기기 상태 로그</router-link>
      </div>
      <div class="select-region-box">
        <router-link to="/road/systemlog/controlLog"
          >기기 제어 로그</router-link
        >
      </div>
    </div>
    <router-view class="router-view-style"></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoadSystemlog'
})
</script>
<style scoped>
.select-region {
  display: flex;
  justify-content: center;
}

.select-region-box {
  border: 1px solid #939393;
  border-radius: 8px;
  background-color: white;

  width: 120px;
  margin: 10px 10px;
}

.go-selected-btn {
  display: block;
  border: 1px solid #10316b;
  border-radius: 8px;
  color: white;
  background-color: #10316b;

  width: 50px;
  margin: 10px 10px;
}

a {
  color: #10316b;
  text-decoration: none;
}

.router-view-style {
  padding: 40px 0px;
  min-height: 500px;
  min-width: 600px;
  overflow: hidden;
}
</style>

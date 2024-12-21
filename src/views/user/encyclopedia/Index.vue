<script setup>
import {ref} from 'vue';
import NavBar from "@/components/public/NavBar.vue";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import {content} from "@/assets/md/encyclopedia.js";

const text = ref(content);

VMdPreview.use(githubTheme, {});
</script>

<template>
  <div>
    <nav-bar title="指南"/>
    <div class="container">
      <div class="card">
        <v-md-preview :text="text"></v-md-preview>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 16px;
  min-height: 100vh;
  background: #F2F2F2;
}

.card {
  padding: 16px 0;
  background-color: #fff;
  border-radius: 8px;

  p {
    margin: 8px 0;
  }
}
</style>
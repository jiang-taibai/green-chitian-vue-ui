<script setup>

</script>

<template>
  <div>
    <van-nav-bar title="我的" fixed placeholder/>
    <van-cell-group>
      <van-cell title="手机号换绑" is-link clickable :to="{name: 'ProfileModifyPhone'}"/>
      <van-cell title="修改密码" is-link clickable :to="{name: 'ProfileModifyPassword'}"/>
    </van-cell-group>
  </div>
</template>

<style scoped lang="less">

</style>
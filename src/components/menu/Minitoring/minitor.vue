<template>
    <div>
        实时监控
    </div>
</template>
<script >
export default {
  name: 'app',
  data () {
    return {
    }
  },
  // 销毁监听事件
  destroyed () {
    window.removeEventListener('app', this.name)
  },
  created () {
    window.open('http://127.0.0.1:5001', '')
  }
}

</script>
<style lang="less" scoped>
</style>

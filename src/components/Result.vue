<template>
  <div class="parent">
    <div class="div1">

      <img :src="videoData.thumbnails.default.url" >
    </div>
    <div class="div2">
      
      <h3>{{ videoData.title }}</h3>
      <p>{{ videoData.description }}</p>

    </div>

    
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    videoData: Object
  }
}
</script>

<style scoped>
h3 {
    color: black;
    margin: 0 14px;
    text-align: left;
}
p {
  
  margin: 0 14px;
  text-align: left;
}
.parent {
display: grid;
grid-template-columns: 1fr 4fr;
grid-template-rows: 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
  


</style>

<template>
  <div>

    <h3>Content</h3>
    <div><span v-for="item in data" :key="item" :style="{margin: '5px'}">{{item}}</span></div>
    <button @click="matchDataWithDict">Match with dictionary</button>

    <h3>Result</h3>

    <div><span v-for="item in foundResult" :key="item.text" :style="{backgroundColor: item.bg, margin: '5px'}">{{item.text}}</span></div>
  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return {
      placeDict: ["សាលារៀន", "មន្ទីរ", "ក្រសួង"],
      personDict: ["លោក", "លោកស្រី", "ឯកឧត្តម"],
      data: ["លោក ប៉ែនសុធី", "គុយទាវឆា", "លោកស្រី ពិនលក្ខណា", "មន្ទីរ សេដ្ឋកិច្ច", "ក្រសួង សាធារណការ", "សត្វស្វា"],
      foundResult: [{style: '', text: ''}],
      isFound: false,
    }
  },
  methods: {
    matchDataWithDict(){
      this.data.map(o => {
        
        this.placeDict.map(p => {
          if(o.split(' ')[0] ===  p) {
            this.foundResult.push({bg: "yellow", text: o});
            this.isFound=true;
          }
        });
        

        this.personDict.map(p => {
          if(o.split(' ')[0] ===  p) {
            this.foundResult.push({bg: "green", text: o});
            this.isFound=true;
          }
        });

        if(!this.isFound){
          this.foundResult.push({bg: "", text: o});
        }
        this.isFound = false;
      });
      
    }
  }
}
</script>

<style>

</style>

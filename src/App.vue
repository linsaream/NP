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

import {placeDict} from './libs/placeDict';
import {personDict} from './libs/personDict';
import {textS} from './libs/texts'
export default {
  name: 'app',
  data(){
    return {
      placeDict: placeDict,
      personDict: personDict,
      data: textS,
      foundResult: [{style: '', text: ''}],
      isFound: false,
    }
  },
  methods: {
    matchDataWithDict(){
      this.data.map((o, index) => { //data from user separate from " "
        
        this.placeDict.map(p => {//loop place
          if(o ===  p) {
            this.foundResult.push({text: this.data[index]});
            this.foundResult.push({bg: "yellow", text: this.data[index+1]});
            
            this.isFound=true;
          }
        });
        

        this.personDict.map(p => {
          if(o ===  p) {
            this.foundResult.push({text: this.data[index]});
            this.foundResult.push({bg: "lightgreen", text: this.data[index+1]});
            
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

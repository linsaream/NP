<template>
  <v-app>
    <v-layout row justify-center align-center fill-height>
      <v-card width="900" :elevation="24">
        <v-system-bar dark>
          <v-spacer></v-spacer>
          <span>LIN SAREAM</span>
        </v-system-bar>
        <v-toolbar color="primary" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="headline toolbar-title">ប្រព័ន្ធស្វែងរកឈ្មោះមនុស្ស និងទីកន្លែង</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="ma-2">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex grow>
                <v-textarea
                  v-model="formData.article"
                  :rules="rules.article"
                  label="អត្ថបទនៅទីនេះ"
                  clearable
                  outlined
                  auto-grow
                  counter
                ></v-textarea>
              </v-flex>
              <div class="mx-5">
                <v-switch
                  label="ឈ្មោះមនុស្ស"
                  inset
                  color="error"
                  v-model="formData.personName"
                  hide-details
                ></v-switch>
                <v-switch
                  label="ឈ្មោះទីកន្លែង"
                  inset
                  color="warning"
                  v-model="formData.placeName"
                  hide-details
                ></v-switch>
                <v-btn
                  color="primary"
                  @click="matchDataWithDict"
                  :disabled="!valid"
                  :loading="loading"
                  class="mt-5"
                >
                  <v-icon left>search</v-icon>ស្វែងរក
                </v-btn>
              </div>
            </v-layout>
          </v-form>
          <h3>អត្ថបទបានរកឃើញ</h3>
          <v-divider class="my-2"></v-divider>
          <v-skeleton-loader
            :loading="loading"
            transition="scale-transition"
            height="94"
            type="paragraph"
          >
            <v-layout row align-center class="mx-1">
              <div v-for="(item, index) in foundResult" :key="item.text+index">
                <v-chip
                  label
                  :color="item.type=='place'? 'warning': 'error'"
                  class="mr-1"
                  v-if="!!item.type"
                >{{item.text}}</v-chip>
                <span v-else class="mr-1 body-1">{{item.text}}</span>
              </div>
            </v-layout>
          </v-skeleton-loader>
        </v-card-text>
        <v-card-actions v-if="foundResult.length!==0">
          <v-spacer></v-spacer>
          <span>
            រកឃើញ ឈ្មោះមនុស្ស
            <v-chip color="error">{{khNumber(total.person)}}</v-chip>ឈ្មោះទីកន្លែង
            <v-chip color="warning">{{khNumber(total.place)}}</v-chip>
          </span>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-app>
</template>

<script>

/* eslint-disable */
import { placeDict } from "./libs/placeDict";
import { personDict } from "./libs/personDict";
import { toKhNumber } from "./libs/toKh";

import {textS} from './libs/texts'
export default {
  name: "app",
  data() {
    return {
      placeDict: placeDict,
      personDict: personDict,
      foundResult: [],
      total: {
        place: 0,
        person: 0
      },
      valid: false,
      loading: false,
      formData: {
        article:
          "លោក ប៉ែនសុធី គុយទាវឆា លោកស្រី ពិនលក្ខណា មន្ទីរ សេដ្ឋកិច្ច ក្រសួង សាធារណការ សត្វស្វា លោក ប៉ែនសុធី",
        personName: true,
        placeName: true
      },
      rules: {
        article: [v => !!v || "តម្រូវបញ្ចូល អត្ថបទ"]
      }
    };
  },
  methods: {
    reset() {
      this.foundResult = [];
      this.total.place = 0;
      this.total.person = 0;
    },
    matchDataWithDict() {
      if (this.$refs.form.validate()) {
        this.reset();
        this.loading = true;
        setTimeout(() => {
          const { article, placeName, personName } = this.formData;
          let result = [];
          let isFound = false;
          if (article) {
            let arr = article.split(" ");

            arr.map((o, index) => {
              //data from user separate from " "

              this.placeDict.map(p => {
                //loop place
                if (o === p) {
                  //compare value in artical o === place
                  result.push(
                    { text: o }, //push title
                    { type: placeName ? "place" : "", text: arr[index + 1] } //push place
                  );
                  this.total.place += 1;
                  isFound = true;
                }
              });

              this.personDict.map(p => {
                //loop person
                if (o === p) {
                  //compare value in artical o === person
                  result.push(
                    { text: o }, //push title
                    { type: personName ? "person" : "", text: arr[index + 1] } //push person
                  );
                  this.total.person += 1;
                  isFound = true;
                }
              });

              if (!isFound) {
                if (result[index] && o === result[index].text) {
                } else {
                  result.push({ text: o });
                }
                // console.log(o,result[index])

                // if(result[index] && o===result[index].text){
                // result.splice(index, index+1)
                // }
                // console.log(o, result[index])

                // }
              }
              isFound = false;
            });
            this.foundResult = result;
          } else {
            result = [];
            this.foundResult = [];
          }
          this.loading = false;
        }, 1000);
      }
    },
    khNumber(enNum) {
      return toKhNumber(enNum + "");
    }
  }
};
</script>

<style>
.toolbar-title {
  line-height: 1 !important;
  padding-top: 7px !important;
  padding-bottom: 7px !important;
}
.v-input__control > .v-input__slot > .v-text-field__slot > textarea {
  line-height: 1.8;
}
.v-list-item__title,
.v-text-field--outlined
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > input,
.v-text-field--outlined
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input,
.v-text-field--rounded
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input {
  line-height: 1;
  padding: 5px 0 5px 0;
}
.v-label {
  line-height: 1;
  font-size: 14px !important;
}

.v-input .v-label {
  height: 32px !important;
}
</style>

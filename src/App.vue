<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" floating fixed>
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="./assets/avatar.png" />
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link two-line>
            <v-list-item-content>
              <v-list-item-title class="title">LIN SAREAM</v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item link @click="displayAbout">
          <v-list-item-icon>
            <v-icon>person</v-icon>
          </v-list-item-icon>
          <v-list-item-title>អំពីខ្ញុំ</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="success" dark app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline toolbar-title">ប្រព័ន្ធស្វែងរកឈ្មោះមនុស្ស និងទីកន្លែង</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <v-card outlined>
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
                      color="success"
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
        </v-fade-transition>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline success" primary-title>អំពីខ្ញុំ</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sd do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined @click="dialog = false">បិទ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
/* eslint-disable */
import { article } from "./libs/article";
import { placeDict } from "./libs/placeDict";
import { personDict } from "./libs/personDict";
import { toKhNumber } from "./libs/toKh";

import { textS } from "./libs/texts";
export default {
  name: "app",
  data() {
    // also equal variable but also can be used on html
    return {
      dialog: false,
      drawer: this.$vuetify.breakpoint.mdAndUp ? true : false,
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
        article: textS,
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
                  if (placeName) {
                    this.total.place += 1;
                  }
                  isFound = true;
                }
              });
              //persname ? true : false if(){}else{}
              this.personDict.map(p => {
                //loop person
                if (o === p) {
                  //compare value in artical o === person
                  result.push(
                    { text: o }, //push title
                    { type: personName ? "person" : "", text: arr[index + 1] } //push person
                  );
                  if (personName) {
                    this.total.person += 1;
                  }
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
        }, 500);
      }
    },
    khNumber(enNum) {
      return toKhNumber(enNum + "");
    },
    displayAbout() {
      this.drawer = false;
      this.dialog = true;
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

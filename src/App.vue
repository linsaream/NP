<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" floating fixed>
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="./assets/avatar1.png" />
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link two-line>
            <v-list-item-content>
              <v-list-item-title class="title">LIN SAREAM</v-list-item-title>
              <v-list-item-subtitle>linsaream@gmail.com</v-list-item-subtitle>
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
          <v-card outlined :loading="placesDb.length===0 || peopleDb.length===0">
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
                    <br />
                    <v-btn
                      color="success"
                      @click="reloadDb"
                      class="mt-5"
                      :loading="connectLoading"
                    >
                      <v-icon left>refresh</v-icon>reload db
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
                      @click="item.type=='place'? saveText('places', item.text): saveText('people', item.text)"
                      label
                      :color="item.type=='place'? 'warning': item.type == 'person'? 'error': 'gray'"
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
        <v-card-title class="headline success white--text mb-3" primary-title>អំពីខ្ញុំ</v-card-title>
        <v-card-text>
          ខ្ញុំបាទ
          <b>លិន សារាម</b> សូមបញ្ជាក់ថារបាយការណ៍ស្រាវជ្រាវ ដែលមានចំណងជើងថា
          <b>ការសិក្សាលើប្រព័ន្ធស្វែងរកឈ្មោះមនុស្ស និងឈ្មោះទីកន្លែង</b> សម្រាប់បំពេញលក្ខខណ្ឌយកសញ្ញាបត្របរិញ្ញាបត្រជាន់ខ្ពស់ផ្នែកព័ត៌មានវិទ្យា នៅសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ គឺជាស្នាដៃរបស់ខ្ញុំបាទទាំងស្រុង។ ស្នាដៃនេះពុំទាន់ត្រូវបានប្រើប្រាស់ដើម្បីបំពេញលក្ខខណ្ឌសិក្សា សម្រាប់យក សញ្ញាបត្រនៅសាកលវិទ្យាល័យនេះ ឬសាកលវិទ្យាល័យណា ឬវិទ្យាស្ថានថ្នាក់ស្មើ ណាមួយនៅឡើយទេ។
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" outlined @click="dialog = false">បិទ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
    <confirm-dialog
      :visible="confirmDialog.visible"
      @confirm="confirmDialog.confirmFn"
      @close="confirmDialog.visible=false"
      :title="confirmDialog.title"
      :type="confirmDialog.type"
      :text="confirmDialog.text"
    />
  </v-app>
</template>

<script>
/* eslint-disable */
//import dict from "./assets/dict.txt";
//const dictionary = dict.split("\n").map(item => item.trim());
import firebase from "./firebase/config";
import ConfirmDialog from "./components/ConfirmDialog";
import _ from "lodash";
import { article } from "./libs/article";
import { placeDict } from "./libs/placeDict";
import { personDict } from "./libs/personDict";
import { toKhNumber } from "./libs/toKh";

import { textS } from "./libs/texts";
export default {
  name: "app",
  components: { ConfirmDialog },
  data() {
    // also equal variable but also can be used on html
    return {
      dialog: false,
      drawer: this.$vuetify.breakpoint.mdAndUp ? true : false,
      placeDict: placeDict,
      personDict: personDict,
      placesDb: [],
      peopleDb: [],
      places: [],
      people: [],
      foundResult: [],
      total: {
        place: 0,
        person: 0
      },
      valid: false,
      loading: false,
      connectLoading: false,
      formData: {
        // article: "បាត់ដំបង",
        article: article,
        personName: true,
        placeName: true
      },
      rules: {
        article: [v => !!v || "តម្រូវបញ្ចូល អត្ថបទ"]
      },
      snackbar: {
        visible: false,
        color: "",
        text: ""
      },
      confirmDialog: {
        type: "error",
        visible: false,
        text: "",
        title: "",
        confirmFn: () => null
      }
    };
  },
  methods: {
    reset() {
      this.foundResult = [];
      this.total.place = 0;
      this.total.person = 0;
    },
    reloadDb() {
      this.connectLoading = true;
      setTimeout(() => {
        this.findPlaces();
        this.findPeople();
        this.connectLoading = false;
      }, 350);
    },
    successMsg() {
      this.snackbar.visible = true;
      this.snackbar.color = "success";
      this.snackbar.text = "កត់ត្រាជោគជ័យ";
    },
    errorMsg(text) {
      this.snackbar.visible = true;
      this.snackbar.color = "error";
      this.snackbar.text = "កំហុស" + " " + text;
    },
    saveText(collection, text) {
      this.confirmDialog = {
        type: "error",
        visible: true,
        title: "បញ្ជាក់",
        text: `តើអ្នកពិតជាចង់បញ្ចូលពាក្យនេះ ${text} ទៅកាន់ database?`,
        confirmFn: () => {
          this.insertToFirestore(
            collection,
            text,
            res => {
              this.successMsg();
              this.reloadDb();
            },
            err => {
              this.errorMsg(err);
            }
          );
        }
      };
    },
    findPlaces() {
      firebase.db
        .collection("places")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.placesDb.push(doc.data().name);
            this.placesDb = [...new Set(this.placesDb)];
          });
        });
    },
    findPeople() {
      firebase.db
        .collection("people")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.peopleDb.push(doc.data().name);
            this.peopleDb = [...new Set(this.peopleDb)];
          });
        });
    },
    insertToFirestore(collectionName, value, successCallBack, errorCallBack) {
      firebase.db
        .collection(collectionName)
        .add({ name: value })
        .then(function(docRef) {
          successCallBack(docRef.id);
        })
        .catch(function(error) {
          errorCallBack(error);
        });
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
            //let arr = article.split(" ").map(item => item.trimLeft().trimRight());
            let arr = article
              .replace(/\u200b/g, " ")
              .split(" ")
              .filter(item => item.trim()); //replace(/ /g,' ').

            for (const [index, o] of arr.entries()) {
              //data from user separate from " "
              //place from db
              if (result[index] && o === result[index].text) {
              } else {
                if (_.includes(this.placesDb, o)) {
                  result.push({
                    type: placeName ? "place" : "",
                    text: arr[index],
                    ref: "place_db"
                  });
                  if (placeName) {
                    this.total.place += 1;
                  }
                  isFound = true;
                }
              }
              //place with prefix
              if (!isFound) {
                if (result[index] && o === result[index].text) {
                } else {
                  if (_.includes(this.placeDict, o)) {
                    result.push(
                      { text: o, ref: "place_prefix" }, //push title
                      {
                        type: placeName ? "place" : "",
                        text: arr[index + 1],
                        ref: "place_prefix"
                      } //push place
                    );
                    this.places.push(arr[index + 1]);
                    this.places = [...new Set(this.places)];
                    if (placeName) {
                      this.total.place += 1;
                    }
                    isFound = true;
                  }
                }
              }

              //learn word place
              if (!isFound) {
                if (result[index] && o === result[index].text) {
                } else {
                  if (_.includes(this.places, o)) {
                    result.push({
                      type: placeName ? "place" : "",
                      text: o,
                      ref: "learn_place"
                    });
                    if (placeName) {
                      this.total.place += 1;
                    }
                    isFound = true;
                  }
                }
              }

              //people from db
              if (!isFound) {
                if (result[index] && o === result[index].text) {
                } else {
                  if (_.includes(this.peopleDb, o)) {
                    result.push({
                      type: personName ? "person" : "",
                      text: arr[index],
                      ref: "people_db"
                    });
                    if (personName) {
                      this.total.person += 1;
                    }
                    isFound = true;
                  }
                }
              }

              //persname ? true : false if(){}else{}
              if (!isFound) {
                if (_.includes(this.personDict, o)) {
                  result.push(
                    { text: o, ref: "person_prefix" }, //push title
                    {
                      type: personName ? "person" : "",
                      text: arr[index + 1],
                      ref: "person_prefix"
                    },
                    {
                      type: personName ? "person" : "",
                      text: arr[index + 2],
                      ref: "person_prefix"
                    }
                    //push person
                  );

                  this.people.push(arr[index + 1]);
                  this.people.push(arr[index + 2]);
                  this.people = [...new Set(this.people)];

                  if (personName) {
                    this.total.person += 1;
                  }
                  isFound = true;
                }
              }
              //learn word person
              if (result[index] && o === result[index].text) {
              } else {
                if (!isFound) {
                  if (_.includes(this.people, o)) {
                    result.push({
                      type: personName ? "person" : "",
                      text: o,
                      ref: "learn_person"
                    });
                    if (personName) {
                      this.total.person += 1;
                    }
                    isFound = true;
                  }
                }
              }

              if (!isFound) {
                if (result[index] && o === result[index].text) {
                } else {
                  result.push({ text: o, ref: "nothing" });
                }
              }
              isFound = false;
            }

            this.foundResult = result;
          } else {
            result = [];
            this.foundResult = [];
          }
          this.loading = false;
        }, 200);
      }
    },
    khNumber(enNum) {
      return toKhNumber(enNum + "");
    },
    displayAbout() {
      this.drawer = !!this.$vuetify.breakpoint.mdAndUp;
      this.dialog = true;
    }
  },
  created() {
    this.findPlaces();
    this.findPeople();
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

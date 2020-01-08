<template>
    <v-dialog v-model="dialog" max-width="360" :persistent="persistent" transition="slide-y-reverse-transition">
        <v-card>
            <v-card-title primary-title class="error white--text title"
                          style="font-size: 16px; font-weight: bold; padding-left: 23px">{{title}}</v-card-title>
            <v-card-text class="pt-5">
                <v-layout align-center row fill-height>
                    <span style="font-size: 15px">
                      <v-icon class="pr-2" style="font-size: 30px" color="orange">
                        error
                    </v-icon>
                      {{text}}</span>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close">បោះបង់</v-btn>
                <v-btn :color="type" text @click="confirm">យល់ព្រម</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: "ConfirmDialog",
    props: {
      persistent: {type: Boolean, default: false},
      visible: {type: Boolean, default: false},
      title: {type: String, default: 'title'},
      text: {type: String, default: 'text'},
      type: {type: String, default: ''}
    },
    data() {
      return {
        dialog: false
      }
    },
    watch: {
      visible(nextVal) {
        this.dialog = nextVal;
      },
      dialog(nextVal) {
        !nextVal ? this.$emit('close') : null;
      }
    },
    methods: {
      confirm() {
        this.close();
        this.$emit('confirm');
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
    .v-btn {
        font-weight: bold;
    }
</style>
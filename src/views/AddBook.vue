<template lang="html">
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card class="mx-auto pa-5" outlined>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="addbooks.Field"
              type="text"
              label="Field"
              required
            ></v-text-field>

            <v-text-field
              v-model="addbooks.Indicator1"
              type="text"
              label="Indicator1"
              required
            ></v-text-field>

            <v-text-field
              v-model="addbooks.Indicator2"
              type="text"
              label="Indicator2"
              required
            ></v-text-field>

            <v-text-field
              v-model="addbooks.Subfield"
              type="text"
              label="Subfield"
              required
            ></v-text-field>

            <v-row>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel">
                Cancel
              </v-btn>

              <v-btn color="success" type="submit">
                Confirm
              </v-btn>

    <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false;">
          <div class="modal">
            <h1>Modal heading</h1>
            <p>This my first modal using vue.js</p>
          </div>
        </div>
      </div>
    </transition>
    <button @click="isOpen = !isOpen;">
      {{ isOpen ? "Close" : "Open" }} modal
    </button>
  </div>

              //////////////////////////////////////////////////
            </v-row>
          </v-form>
          <span>{{ addbooks }}</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddBook",

  data: () => ({
          isOpen: false,
    addbooks: {
      Field: "",
      Indicator1: "",
      Indicator2: "",
      Subfield: null,
    },
  }),
  methods: {
    // submit() {
    //   alert(JSON.stringify(this.addbooks));
    // },

  },
};
</script>

<style lang="css" scoped>
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>

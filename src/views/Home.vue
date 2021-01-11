<template>
  <v-container class="container">
    <div class="bgImg"></div>
    <h1>POKEMON</h1>
    <h2>Gotta Catch'm All!</h2>
    <h3 class="mt-10">Whats Your name young pokemon trainer?</h3>
    <v-form @submit.prevent="submit" ref="form" class="form" lazy-validation>
      <div>
        <v-text-field
          class="form__input mt-12"
          outlined
          v-model="name"
          label="Your Name"
          :placeholder="error ? 'field is required!' : 'Type Your name here'"
          required
        ></v-text-field>
      </div>
      <v-btn
        id="submitBtn"
        :disabled="!name.length"
        color="#0055dd"
        class="mx-auto white--text"
        type="submit"
      >
        Continue
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",

  data: () => ({
    name: "",
    error: true,
  }),
  methods: {
    ...mapActions(["setName"]),
    submit(name) {
      this.$store.dispatch("setName", this.name);
      this.$router.push("catch-m-all");
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  border: 2px solid black;
  border-radius: 20px;
  box-shadow: 0 0 23px 2px black;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  margin: auto 10px;
  padding: 20px;
  width: auto;
  .bgImg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/pngfind.com-pokemon-fire-red-logo-3487022.png");
    background-position: center;
    background-size: cover;
    opacity: 0.2;
  }
  font-size: 2rem;
  h1 {
    color: red;
  }
  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
  .form {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__input {
      width: 250px;
      background-color: rgba(255, 255, 255, 0.336);
    }
  }
}
</style>

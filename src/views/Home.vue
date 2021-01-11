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
          :rules="[rules.name]"
          v-model="nickname"
          label="Your nickname"
          required
        ></v-text-field>
      </div>
      <v-btn
        id="submitBtn"
        color="#0055dd"
        :disabled="!formIsValid"
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
    nickname: "",
    rules: {
      name: (value) => {
        const pattern = /^[a-zA-Z0-9]+$/;
        return (
          pattern.test(value) ||
          "Only letters and digits, no special characters allowed"
        );
      },
    },
  }),
  methods: {
    ...mapActions(["setName"]),
    submit(nickname) {
      this.$store.dispatch("setName", this.nickname);
      this.$router.push("catch-m-all");
    },
  },
  computed: {
    formIsValid() {
      const pattern = /^[a-zA-Z0-9]+$/;

      if (!pattern.test(this.nickname)) {
        return;
      }
      return this.nickname;
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
  width: auto;
  height:auto;
  .bgImg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../assets/img/pngfind.com-pokemon-fire-red-logo-3487022.png");
    background-position: bottom;
    background-size: contain;
    background-repeat: repeat;
    opacity: 0.2;
    padding: 0;
    margin:auto -10px;
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
    height: auto;
    height: 200px;
    &__input {
      width: 300px;
      background-color: rgba(255, 255, 255, 0.336);
    }
  }
}
</style>

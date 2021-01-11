<template>
  <div class="wrapper">
    <span>
      <h1 class="mb-2 py-2">
        Welcome,
        <p id="username">{{ username }} !</p>
      </h1>
    </span>
    <h2>Can You catch'm all ?!?!</h2>
    <div>
      <v-progress-circular
        v-if="loader"
        indeterminate
        :size="150"
        color="primary"
        class="ma-6"
      ></v-progress-circular>
    </div>
    <div class="main mt-10">
      <div
        class="pokeCard"
        :class="pokemon.caught ? 'caught' : ''"
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front pokeCard">
              <v-card-title class="pa-0" primary-title>
                {{ pokemon.name.toUpperCase().replace("-", " ") }}
              </v-card-title>
              <img :src="pokemon.artwork" alt="" />
            </div>
            <div class="flip-card-back">
              <div v-for="(stat, index) in pokemon.stats" :key="index">
                <span class="stats">
                  <p>{{ stat.value }} :</p>
                  <p>{{ stat.name }}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-btn
      id="btn"
      :disabled="this.endGame"
      x-large
      color="success"
      @click="catchThemAll"
      >Catch'm all!</v-btn
    >
    <v-btn
      id="btn"
      class="tryAgain"
      v-if="this.endGame"
      color="success"
      @click="tryAgain"
      >try Again?</v-btn
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CatchEmAll",
  data() {
    return {
      loader: true,
      endGame: false,
    };
  },
  mounted() {
    this.loader = true;
    if (!this.$store.state.username) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("collectPokemons");
  },
  beforeUpdate() {
    this.loader = false;
  },
  methods: {
    ...mapActions(["collectPokemons", "clearData"]),

    tryAgain() {
      this.$router.push("/");
    },
    catchThemAll() {
      const caughtPokemons = [];

      this.pokemons.map((pokemon) => {
        if (this.calculateProbability()) {
          caughtPokemons.push(pokemon.name);
          pokemon.caught = true;
          this.$forceUpdate();
          this.endGame = true;
        }
      });
      console.log({
        name: this.username,
        pokemons: caughtPokemons,
      });
    },
    calculateProbability() {
      return Math.random() < 0.5;
    },
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    pokemons() {
      return this.$store.state.pokemons;
    },
  },
};
</script>

<style lang="scss">
.caught {
  border-radius: 50%;
  background: radial-gradient(red, white, red, red);
  transform: rotateZ(3600deg);
  border: none;
  color: white;
  transition: all 0.5s ease;
  &::after {
    padding: 5px;
    background: black;
    content: "YOU CAUGHT IT!";
  }
}
.wrapper {
  margin-bottom: 40px;
  p {
    display: inline;
  }
  #btn {
    font-size: 0.7rem;
    margin: 15px 10px;
    color: black;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(white, red);
    transition: border 0.2s ease;
    &:hover {
      border: 2px solid black !important;
    }
  }
  #username {
    color: red;
  }
  .main {
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 700px) {
      gap: 50px;
    }
    .pokeCard {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 290px;
      height: 290px;
      .stats {
        font-size: 0.9rem;
        p {
          line-height: 2px;
        }
      }
      img {
        width: 70%;
        @media (max-width: 700px) {
          width: 70%;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.3s;
}

//flippin cards
.flip-card {
  width: 290px;
  height: 290px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.295);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
  cursor: pointer;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.295);
}

.flip-card-front {
  color: black;
}

.flip-card-back {
  display: flex;
  justify-content: center;
  color: white;
  background-color: #012261;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
</style>
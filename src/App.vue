<template>

  <main class="container py-4 my-5">

    <div class="row align-content-start justify-content-around">

      <div class="col-12 text-center text-lg-start">
        
      </div>

      <!-- <div class="col-12 col-lg-5 order-1 order-lg-0 mt-5">

        <fieldset class="mb-4">

          <legend>Play</legend>

          <div class="mb-3">
            <label for="win_option" class="form-label">Select Winner</label>
            <div class="input-group">
              <select v-model="defaultWinner" id="win_option" :disabled="isSpinning" class="form-select">
                <option v-for="(slice, index) in slices" :value="index">
                  {{ slice.text }}
                </option>
              </select>
              <button class="btn btn-success px-4" :disabled="isSpinning" @click="spinFor(defaultWinner)">
                <span class="spinner-border spinner-border-sm me-2" v-if="isSpinning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </span>
                Spin
              </button>
            </div>
          </div>

        </fieldset>

        <fieldset class="mb-4">

          <legend>Slices</legend>

          <div class="mb-3" v-for="(slice, index) in slices">
            <div class="input-group">
              <div class="input-group-text p-0">
                <input v-model="slice.color" class="form-control form-control-color border-0" type="color">
              </div>
              <input v-model="slice.text" class="form-control" type="text">
              <button class="btn btn-danger" @click="slices.splice(index, 1)" :disabled="isSpinning">
                <span class="spinner-border spinner-border-sm me-2" v-if="isSpinning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </span>
                Remove
              </button>
            </div>
          </div>

          <div class="text-center">
            <button class="btn btn-primary" @click="slices.push({ color: getRandomColor(), text: 'New Slice' })" :disabled="isSpinning">
              <span class="spinner-border spinner-border-sm me-2" v-if="isSpinning" role="status">
                <span class="visually-hidden">Loading...</span>
              </span>
              Add Slice
            </button>
          </div>

        </fieldset>

        <fieldset class="mb-4">

          <legend>Cursor</legend>

          <div class="row mb-3">
            <div class="col-6">
              <label for="cursor_angle" class="form-label">Cursor Angle</label>
              <div class="input-group">
                <input v-model="cursorAngle" id="cursor_angle" class="form-control" type="number" max="360" min="0">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li v-for="angle in [0, 45, 90, 135, 180, 225, 270, 315, 360]">
                    <div class="dropdown-item cursor-pointer" @click="cursorAngle = angle">{{ angle }} deg</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-6">
              <label for="cursor_distance" class="form-label">Cursor Distance</label>
              <input v-model="cursorDistance" id="cursor_distance" class="form-control" type="number">
            </div>
          </div>

          <div class="mb-3">
            <label for="cursor_position" class="form-label">Cursor Position</label>
            <select v-model="cursorPosition" id="cursor_position" @change="handleCursorPositionChange" class="form-select">
              <option value="edge">Edge</option>
              <option value="center">Center</option>
            </select>
          </div>

        </fieldset>

        <fieldset class="mb-4">

          <legend>Shining Dots</legend>

          <div class="alert alert-info" role="alert">
            Shining dots is not a part of the vue-wheel-spinner component. It's a separate component which built in this demo.
            You can create different external ornaments like this.
          </div>

          <div class="row mb-3">
            <label for="shining_dots_border_color" class="form-label">Border Color / Width</label>
            <div class="input-group">
              <div class="input-group-text p-0">
                <input v-model="shiningDotsBorderColor" id="shining_dots_border_color"
                       class="form-control form-control-color border-0" type="color">
              </div>
              <input v-model="shiningDotsBorderWidth" id="shining_dots_border_width" class="form-control" type="number">
            </div>
          </div>

          <div class="mb-3">
            <label for="shining_dots_color" class="form-label">Dot Color / Size / Count / Shine Color</label>
            <div class="input-group">
              <div class="input-group-text p-0">
                <input v-model="shiningDotsColor" id="shining_dots_color"
                       class="form-control form-control-color border-0"
                       type="color">
              </div>
              <input v-model="shiningDotsSize" id="shining_dots_size" class="form-control" type="number">
              <input v-model="shiningDotsCount" id="shining_dots_count" class="form-control" type="number">
              <div class="input-group-text p-0">
                <input v-model="shiningDotsShineColor" id="shining_dots_shine_color"
                       class="form-control form-control-color border-0"
                       type="color">
              </div>
            </div>
          </div>

        </fieldset>

      </div>-->

      <div class="col-12 col-lg-7 px-lg-5 order-0 order-lg-1">

        <div class="sticky-top">
          <h1 class="fs-2 text-center">🎡 Try to win a Prize !</h1>
          <div class="fs-2 text-center">
            <div v-if="winnerResult">
              Result: <span>{{ winnerResult.text }}</span> <span v-if="isLost">🤕</span> <span v-else>🎉</span>
            </div>
            <div v-else-if="isSpinning">
              Spinning...
            </div>
            <div v-else>
              Ready to spin?
            </div>
          </div>

          <ShiningDots
              :color="shiningDotsColor"
              :border-color="shiningDotsBorderColor"
              :shine-color="shiningDotsShineColor"
              :border-width="shiningDotsBorderWidth"
              :size="shiningDotsSize"
              :count="shiningDotsCount">

            <VueWheelSpinner
                ref="spinner"
                :slices="slices"
                :winner-index="defaultWinner"
                :sounds="sounds"
                :cursor-angle="cursorAngle"
                :cursor-position="cursorPosition"
                :cursor-distance="cursorDistance"
                @spin-start="onSpinStart"
                @spin-end="onSpinEnd">

              <template #cursor>
                <img class="cursor-img" :src="cursorImage" alt="Cursor">
              </template>

              <template #default>
                <button
                    class="spin-button"
                    :disabled="isSpinning"
                    @click="spinRandom()"
                    
                    @mouseover="handleSpinButtonHover"
                    @mouseleave="handleSpinButtonLeave"><!-- @click="handleSpinButtonClick" -->
                  Spin
                </button>
              </template>

            </VueWheelSpinner>

          </ShiningDots>

          <div>
            <!---<button
                class="btn btn-success btn-lg rounded-pill w-100 py-4"
                :disabled="isSpinning"
                @click="spinRandom()">
                <span class="spinner-border spinner-border-sm me-2" v-if="isSpinning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </span>
              Spin for Random
            </button>-->
          </div>

        </div>

      </div>

    </div>
  </main>


</template>

<script>
import VueWheelSpinner from 'vue-wheel-spinner';
import 'bootstrap/js/src/dropdown.js'

import cursorImage from './assets/cursor.svg';
import wonSound from './sounds/won.mp3';
import clickSound from './sounds/click.mp3';
import hoverSound from './sounds/hover.mp3';
import leaveSound from './sounds/leave.mp3';
import spinningSound from './sounds/spinning.mp3';
import ShiningDots from "@/components/ShiningDots.vue";

export default {
  components: {
    ShiningDots,
    VueWheelSpinner
  },
  data() {
    return {
      winnerResult: null,
      slices: this.createColorTextArray(8),
      isSpinning: false,
      isLost: true,
      defaultWinner: 0,
      sounds: {
        won: wonSound,
        spinButtonClick: clickSound,
        spinButtonHover: hoverSound,
        spinButtonLeave: leaveSound,
        spinning: spinningSound
      },
      cursorImage,
      cursorAngle: 270,
      cursorPosition: 'edge',
      cursorDistance: -25,
      shiningDotsColor: '#ffffff',
      shiningDotsShineColor: '#ffd800',
      shiningDotsBorderColor: '#1e254c',
      shiningDotsBorderWidth: 30,
      shiningDotsSize: 8,
      shiningDotsCount: 60
    };
  },
  watch: {
    slices: {
      handler() {
        this.$refs.spinner.drawWheel();
      },
      deep: true
    },
    shiningDotsBorderWidth() {
      this.$refs.spinner.drawWheel();
    },
  },
  methods: {
    getRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    createColorTextArray(count) {
      let j = 1;
      const result = [];
      const colors = [
        '#eb4d4b',
        '#ffffff',
      ];  // Predefined colors
      const prizes = [
        "1 Ethereum",
        "$50 Amazon Gift Card",
        "$100 Uber Eat Gift Card",
        "1 Solana",
        "Try again",
        "Airpods 3 Pro",
        "Macbook Air M2",
        "Try again"
    ]; // Prizes to Win
      for (let i = 1; i <= prizes.length; i++) {
        let colorB;
        if(prizes[i-1] == "Try again"){
          colorB= "#898a8c";
          }else{
            colorB= colors[j % colors.length];  // Alternate colors
            j=j+1;
          }
        result.push({
          
          color: colorB,
          //text: 'Slice ' + i,        // Convert number to string
          text: prizes[i-1] ,
        });
      }
      return result;
    },
    playAudio(audio) {
      if (audio) {
        audio.volume = 0.5
        audio.play();
      }
    },
    handleSpinButtonClick() {
      if (this.buttonClickAudio) {
        this.playAudio(this.buttonClickAudio)
      }
      this.$refs.spinner.spinWheel(this.defaultWinner);
    },
    handleSpinButtonHover() {
      if (this.buttonHoverAudio) {
        this.playAudio(this.buttonHoverAudio)
      }
    },
    handleSpinButtonLeave() {
      if (this.buttonLeaveAudio) {
        this.playAudio(this.buttonLeaveAudio)
      }
    },
    handleCursorPositionChange() {
      if (this.cursorPosition === 'center') {
        if (!this.cursorDistance) {
          this.cursorDistance = 50;
        }
      } else {
        this.cursorDistance = 0;
      }
    },
    spinFor(index) {
      this.defaultWinner = index;
      this.$refs.spinner.spinWheel(index);
    },
    spinRandom() {
      const randomSlice = Math.floor(Math.random() * this.slices.length);
      this.$refs.spinner.spinWheel(randomSlice);
    },
    /**async spinRandom() {
    try {
      const response = await fetch('/api/spin');
      if (!response.ok) {
        throw new Error('Failed to fetch winner');
      }

      const data = await response.json();

      // Déterminez l'index du gagnant en fonction de l'API
      const winnerIndex = data.winnerIndex; // Supposons que l'API retourne winnerIndex
      this.$refs.spinner.spinWheel(winnerIndex);
    } catch (error) {
      console.error('Error fetching winner:', error);
    }
  },**/
    onSpinStart() {
      this.winnerResult = null;
      this.isSpinning = true;
      this.isLost = true;
    },
    onSpinEnd(winnerIndex) {
      this.isSpinning = false;
      if(this.slices[winnerIndex].text !== 'Try again'){
          this.isLost = false ;
      }else{
        this.isLost = true;
      }
      this.winnerResult = this.slices[winnerIndex] ;
    }
  },
  mounted() {
    this.buttonHoverAudio = new Audio(hoverSound);
    this.buttonLeaveAudio = new Audio(leaveSound);
    this.buttonClickAudio = new Audio(clickSound);
  }
};
</script>

<style>

.cursor-img {
  width: 50px;
  aspect-ratio: 1 / 1;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.19));
}

.spin-button {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  font-size: 20px;
  cursor: pointer;
  background: #eb4d4b;
  border-radius: 50%;
  transition: all 150ms;
  border: 10px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white !important;
  box-shadow: inset -3px -3px 2px 2px rgba(0, 0, 0, 0.19), 3px 3px 2px 2px rgba(0, 0, 0, 0.19);
  z-index: 11;
  position: relative;
  user-select: none;

  &:hover {
    box-shadow: inset -5px -5px 2px 2px rgba(0, 0, 0, 0.19), 3px 3px 2px 2px rgba(0, 0, 0, 0.19);
  }

  &:active {
    box-shadow: inset 3px 3px 2px 2px rgba(0, 0, 0, 0.19), 3px 3px 2px 2px rgba(0, 0, 0, 0.19);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    pointer-events: none;
  }

}

</style>

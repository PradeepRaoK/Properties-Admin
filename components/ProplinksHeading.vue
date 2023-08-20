<template>
    <div class="text-container">
      <h3>{{ heading }}</h3>
    </div>
  </template>
  <script>
  export default {
    props: ["heading"],
    data() {
      return {};
    },
  };
  </script>
  <style scoped>
  /* .text-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  
  .text-container h3 {
    margin: 0;
    font-size: 30px;
    color: rgba(225, 225, 225, 0.01);
    background-image: url("/images/defaultImages/home-back.jpeg");
    background-repeat: repeat;
    -webkit-background-clip: text;
    animation: animate 15s ease-in-out infinite;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
  }
  
  @keyframes animate {
    0%,
    100% {
      background-position: left top;
    }
    25% {
      background-position: right bottom;
    }
    50% {
      background-position: left bottom;
    }
    75% {
      background-position: right top;
    }
  }
  </style>
  
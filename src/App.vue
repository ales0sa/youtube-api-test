<template>
  <div id="app">
    <header>
      <span>

        YOUTUBE SEARCH:

        <input
          v-model="searchInput"
          type="text"
          ref="search"
          :disabled="searchDisabled"
        />

      </span>
    </header>
    <main>
      {{ errorData }}
      <div v-if="!results.error">
        <Result
          v-for="(vd, index) in results.items"
          :videoData="vd.snippet"
          :key="index"
        />
      </div>
      <div v-else>
        
        <h4>
          Oh no! Something bad happend! Blame the server or say it was a DDoS!
        </h4>

        <h5>Real reason:</h5>
        
        <p v-html="results.error.message" />
      </div>
    </main>
  </div>
</template>

<script>
import Result from "./components/Result";


export default {
  name: "app",
  data() {
    return {
      searchDisabled: false,
      isWriting: null,
      showError: false,
      errorData: "",
      isMakingRequest: false,
      searchInput: "",
      searchText: null,
      results: [],
    };
  },
  created() {},
  watch: {
    searchInput: function () {

        // check if finished writing
        if (!this.isWriting) {

          setTimeout(() => {

            // call search
            this.goSearch();

            
            this.isWriting = false;
          }, 1000); 

        }
        

        this.isWriting = true;
      }, immediate: true,
  },
  methods: {
    goSearch() {
        this.errorData = '';
        this.results   = [];
        // get value to query
        this.searchText = this.searchInput

        // check if minimum 3 chars
        if(this.searchText.length >= 3){

          // fetch express server located in 'backend' folder

          try {

            fetch("http://localhost:3000/?search=" + this.searchText)
              .then((response) => response.json())
              .then((data) => {               
                this.results = data
              })            
              .catch((error) => {                  
                    
                    if (!error.response) {
                        // network error
                        this.errorData = 'Error: Network Error. Please check if backend is running.';
                    } 
              })

          } catch (error) {

            console.log(error)
            
          }

        
        }
    },
  },
  components: {
    Result,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 76px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}
header input {
  margin-left: 10px;
  padding-left: 30px;
  height: 36px;
  font-size: 1rem;
  width: auto;
}
header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>

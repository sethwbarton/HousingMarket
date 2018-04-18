<template>
  <div class="feed">
  <div >
    <div>
      <h1>Post Your Contracts To Sell Here</h1>
      <form v-on:submit.prevent="post" class="PostForm">
	       <textarea v-model="text" placeholder="Description"/><br/>
         <textarea v-model="amenities" placeholder="Amenities"/><br/>
         <textarea v-model="address" placeholder="Address"/><br/>
	        <div class="buttonWrap">
	           <button class="primary" type="submit">Post</button>
	       </div>
      </form>
    </div>
      <div v-for="item in feed" class="item">
        <h3>Your Contracts:</h3>
        <p class="idline"><span class="user">{{item.name}}</span><span class="handle">{{item.username}}</span><span       class="time">{{item.created | since}}</span></p>
        <h5>Description:</h5>
        <p class="post">{{item.description}}</p>
        <h5>Amenities:</h5>
        <p class="post">{{item.amenities}}</p>
        <h5>Address:</h5>
        <p class="post">{{item.address}}</p>
      </div>
  </div>
  <div>
    <div class="search">
      <h1>Search For Contracts to Buy Here:</h1>
      <form v-on:submit.prevent="search">
       <input v-model="keywords" placeholder="Search">
       <a href="#" v-on:click="search" class="search"><i class="fas fa-search"></i></a>
      </form>
    </div>
    <div v-for="item in searchResults" class="item">
      <p class="idline"><span class="user">{{item.name}}</span><span class="handle">{{item.username}}</span><span       class="time">{{item.created | since}}</span></p>
      <h5>Description:</h5>
      <p class="post">{{item.description}}</p>
      <h5>Amenities:</h5>
      <p class="post">{{item.amenities}}</p>
      <h5>Address:</h5>
      <p class="post">{{item.address}}</p>
    </div>
  </div>
  </div>
</template>


<script>
 import moment from 'moment';
 export default {
   name: 'UserFeed',
   data () {
     return {
       keywords: '',
       text: '',
       amenities: '',
       address: '',
     }
   },
   created: function() {
     this.$store.dispatch('getFeed');
   },
   filters: {
     since: function(datetime) {
       moment.locale('en', {
	 relativeTime: {
	   future: 'in %s',
	   past: '%s',
	   s:  'seconds',
	   ss: '%ss',
	   m:  '1m',
	   mm: '%dm',
	   h:  'h',
	   hh: '%dh',
	   d:  'd',
	   dd: '%dd',
	   M:  ' month',
	   MM: '%dM',
	   y:  'a year',
	   yy: '%dY'
	 }
       });
       return moment(datetime).fromNow();
     },
   },
   computed: {
     feed: function() {
       return this.$store.getters.feed;
     },
     searchResults: function() {
       console.log(this.$store.getters.searchResults);
       return this.$store.getters.searchResults;
     },
   },
   methods: {
     post: function() {
       this.$store.dispatch('addContract',{
         contract: this.text,
         amenities: this.amenities,
         address: this.address,
       }).then(post => {
	        this.text = "";
          this.amenities = "";
          this.address = "";
       });
     },

    search: function() {
        this.$store.dispatch('doSearch', {
          keywords: this.keywords,
        }).then(post => {
          this.keywords = '';
          this.amenities = "";
          this.address = "";
        });
    },

   }
 }


</script>

<style scoped>
 .feed {
     display: grid;
     grid-template-columns: 1fr 1fr;
     grid-column-gap: 1em;
 }
 .PostForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }
 .item {
     border-bottom: 1px solid #ddd;
     padding: 10px;
 }
 .post {
     margin-top: 0px;
 }
 .idline {
     margin-bottom: 0px;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
 .time {
     float: right;
     color: #666;
 }

 .fa-search {
   color: black;
 }
</style>

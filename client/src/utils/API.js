import axios from "axios";

export default {
    // Gets all news
    getNews: function() {
      return axios.get("/api/main/news");
    },
    // Gets all jobs
    getJobs: function() {
      return axios.get("/api/main/jobs");
    },
    // Gets all events
    getEvents: function() {
      return axios.get("/api/main/events");
    },
  // Gets all events
    getUser: function () {
      return axios.get("/api/User");
    },
    createUser: function (user) {
      console.log(user)
      return axios.post("http://localhost:3001/api/User", {
        linkedInId: user.linkedInId,
        firstName: user.firstName,
        lastName: user.lastName,
        headline: user.headline,
        location: user.location,
        profilePicURL: user.profilePicURL,
        verified: true
      })
    }
  };

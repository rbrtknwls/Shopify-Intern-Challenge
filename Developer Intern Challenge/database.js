/*
======= Data Storage =====
The idea here was to make an ADT, to mimic what exists in the real world where data is not stored locally on the backend and needs to be accesed through a series of functions like hwats below
*/

var database = []
var deleted_users = []

module.exports = {
  
  /*
    Function for checking if the user already exists.
    Time Complexity: ~O(n+m) {n = database size, m = deletedUsers size}
  */
  
  user_exists: function (user) {
    var current_uuids = Object.values(database).map(x => x.UUID);
    var deleted_uuids = Object.values(deleted_users).map(x => x.UUID);

    if (current_uuids.indexOf(user.UUID) > -1 || deleted_uuids.indexOf(user.UUID) > -1) {
      return false
    }
    return true;
  },

  
  /*
    Function for adding the user to the database.
    Time Complexity: ~O(n)
  */
  
  add_user: function (user) {
    var user_id = user.UUID;
    if (this.user_exists(user)){
      database.push(user);
      return "User: " + user_id + " has been added!";
    }
    return "User: " + user_id + " already exists";
  },


  /*
    Function for removing a user from the database.
    Time Complexity: ~O(n)
  */

  remove_user: function(user) {
    database = database.reduce((accumulator, current) => {
      if (current.UUID != user.UUID) { 
        accumulator.push(current); 
      }
      else { 
        console.log ("User: " + user.UUID + " has been deleted");

        // Here we want to merge the existing data with the comments
        var updated_user = user;
        updated_user["NAME"] = current.NAME;
        updated_user["TYPE"] = current.TYPE;
        
        deleted_users.push(updated_user); 
      }
      return accumulator
    }, []);
  },

  /*
    Function for adding a deleted user back to the database
    Time Complexity: ~O(n)
  */

  add_user_back: function(user) {
    deleted_users = deleted_users.reduce((accumulator, current) => {
      if (current.UUID != user.UUID) { 
        accumulator.push(current); 
      }
      else { 
        console.log ("User: " + user.UUID + " has been readded to the database");
        database.push(current);
      }
      return accumulator
    }, []);
  },


  /*
    Function for editing a user
    Time Complexity: ~O(n)
  */

  update_user: function(user) {
     database = database.reduce((accumulator, current) => {
      if (current.UUID == user.UUID) { 
        console.log ("User: " + user.UUID + " has been updated");

        current.NAME = user.NAME;
        current.TYPE = user.TYPE;
      }
      accumulator.push(current);
      return accumulator
    }, []);
  },

  /*
    Function for returning a list of users
    Time Complexity: ~O(1)
  */

  get_users: function () {
    console.log("exs");
    console.log(database);
    console.log("Del");
    console.log(deleted_users);
    return database;
  }
};
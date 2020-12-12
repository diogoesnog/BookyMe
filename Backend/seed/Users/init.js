db = db.getSiblingDB("BookymeUsers");

db.createCollection("users");

db.users.insertMany([{
  "_id": "5fc6b3294b1974397a8a41d7",
  "favorites": [],
  "avatar": "User.jpg",
  "reviews": [],
  "bookings": [],
  "type": "User",
  "stores": [],
  "name": "Regular User",
  "username": "userbookyme",
  "email": "user@bookyme.com",
  "password": "$2a$10$2R1sjaIa3LzV37.bsnbfJOOgZ52t0AZykCDXebHhe7096OCWLpS/S"
},{
  "_id": "5fc6b3364b1974397a8a41d8",
  "favorites": [],
  "avatar": "User.jpg",
  "reviews": [],
  "bookings": [],
  "type": "User",
  "stores": [],
  "name": "Administrator User",
  "username": "adminbookyme",
  "email": "admin@bookyme.com",
  "password": "$2a$10$l1cL6wPxamWUiwBXmK91qexBkpSyB4/HWZfOVH92OxQwh6hTxWF6u"
}]);
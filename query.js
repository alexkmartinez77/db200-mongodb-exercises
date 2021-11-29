// 1 get all documents
db.movies.find({})
// 2 get all documents with writer set to "Quentin Tarantino"
db.movies.find({"writer": "Quentin Tarantino"})
// 3 get all documents where actors include "Brad Pitt"
db.movies.find({"actors": "Brad Pitt"})
// 4 get all documents with franchise set to "The Hobbit"
db.movies.find({"franchise": "The Hobbit"})
// 5 get all movies released in the '90s
db.movies.find({"year": {"$gt":1989, "$lt": 2000}})
// 6 get all movies released before the year 2000 or after 2010
db.movies.find({"$or": [{"year": {"$gt":2010}}, {"year": {"$lt":2000}}]})
// 6 get all movies released after the year 2000 or before 2010
db.movies.find({"$nor": [{"year": {"$gt":2010}}, {"year": {"$lt":2000}}]})
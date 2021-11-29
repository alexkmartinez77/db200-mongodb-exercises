//QUERY/FIND DOCUMENTS
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

//UPDATE DOCUMENTS
// 1 add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
db.movies.update({"title": "The Hobbit: An Unexpected Journey"}, {$set: {"synposis": "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}})
db.movies.update({"title": "The Hobbit: An Unexpected Journey"}, {$unset:{"synposis":1}})
db.movies.update({"title": "The Hobbit: An Unexpected Journey"}, {$set: {"synopsis": "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}})

// 2 add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
db.movies.update({"title": "The Hobbit: The Desolation of Smaug"}, {$set: {"synposis": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}})
db.movies.update({"title": "The Hobbit: The Desolation of Smaug"}, {$unset:{"synposis":1}}) 
db.movies.update({"title": "The Hobbit: The Desolation of Smaug"}, {$set: {"synopsis": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}})

// 3 add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.update({"title": "Pulp Fiction"}, {$set:{"actor":"Samuel L. Jackson"}})      // added actor rather than to the actors array
db.movies.update({"title": "Pulp Fiction"}, {$unset:{"actor":1}})                      // removes the actor key/value pair
db.movies.update({"title": "Pulp Fiction"}, {$push:{"actors":"Samuel L. Jackson"}})    // 

//TEXT SEARCH
db.movies.createIndex( { synopsis: "text" } )                                         // First thing to do is index the synposis key
db.movies.getIndexes()                                                                // See all indexes on this collection / table
db.movies.dropIndex("synopsis_text")                                                  // Drops an index
// 1 find all movies that have a synopsis that contains the word "Bilbo"
db.movies.find( { $text: { $search: "Bilbo" } } )                               
// 2 find all movies that have a synopsis that contains the word "Gandalf"
db.movies.find( { $text: { $search: "Gandalf" } } )
// 3 find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
db.movies.find( { $text: { $search: "Bilbo -Gandalf" } } )
// 4 find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
db.movies.find( { $text: { $search: "dwarves hobbit" } } )
// 5 find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find( { $text: { $search: '"gold" "dragon"' } } )
// 6 find all movies that have a synopsis that contains the word "Bilbo" and "Erebor"
db.movies.find( { $text: { $search: '"Bilbo" "Erebor"' } } )
// 7 fin movie that has synopsis with exact phrase "Lonely Mountain"
db.movies.find( { $text: { $search: "\"Lonely Mountain\"" } } )

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44sxxxox1l3yjos")

  collection.name = "ingredients"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44sxxxox1l3yjos")

  collection.name = "ingredient_in_recipe"

  return dao.saveCollection(collection)
})

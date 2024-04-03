/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44sxxxox1l3yjos")

  // remove
  collection.schema.removeField("f8wi99we")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxcrxfnh",
    "name": "ingredient",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44sxxxox1l3yjos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f8wi99we",
    "name": "ingredient",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "99d33jkl5bz1bs2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("nxcrxfnh")

  return dao.saveCollection(collection)
})

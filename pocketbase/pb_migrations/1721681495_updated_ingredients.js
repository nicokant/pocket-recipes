/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44sxxxox1l3yjos")

  // remove
  collection.schema.removeField("mxz3kaox")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awsxco4w",
    "name": "unit",
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
    "id": "mxz3kaox",
    "name": "unit",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "g",
        "l",
        "dl",
        "cl",
        "ml",
        "cups"
      ]
    }
  }))

  // remove
  collection.schema.removeField("awsxco4w")

  return dao.saveCollection(collection)
})

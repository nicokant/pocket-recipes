/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("98a4vd252xncbu2")

  // remove
  collection.schema.removeField("wadrllj3")

  // remove
  collection.schema.removeField("f6slvvhn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hdcuth09",
    "name": "instructions",
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
  const collection = dao.findCollectionByNameOrId("98a4vd252xncbu2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wadrllj3",
    "name": "instructions",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f6slvvhn",
    "name": "ingredients",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("hdcuth09")

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("98a4vd252xncbu2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dr6wxalu",
    "name": "tags",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ppnq9qczx20fz8k",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("98a4vd252xncbu2")

  // remove
  collection.schema.removeField("dr6wxalu")

  return dao.saveCollection(collection)
})

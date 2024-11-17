/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("98a4vd252xncbu2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sy6jdnoj",
    "name": "portions",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("98a4vd252xncbu2")

  // remove
  collection.schema.removeField("sy6jdnoj")

  return dao.saveCollection(collection)
})

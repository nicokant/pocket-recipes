/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44sxxxox1l3yjos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "egb4nwns",
    "name": "notes",
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

  // remove
  collection.schema.removeField("egb4nwns")

  return dao.saveCollection(collection)
})

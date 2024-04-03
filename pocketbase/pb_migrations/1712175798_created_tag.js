/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ppnq9qczx20fz8k",
    "created": "2024-04-03 20:23:18.122Z",
    "updated": "2024-04-03 20:23:18.122Z",
    "name": "tag",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hnebkylw",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ppnq9qczx20fz8k");

  return dao.deleteCollection(collection);
})

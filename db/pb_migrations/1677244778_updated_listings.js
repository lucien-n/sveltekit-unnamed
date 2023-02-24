migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // remove
  collection.schema.removeField("ydd74aia")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7imvfg7p",
    "name": "seller_name",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydd74aia",
    "name": "seller_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("7imvfg7p")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // remove
  collection.schema.removeField("kro5fwt0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hlfx7bu4",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kro5fwt0",
    "name": "seller_address",
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
  collection.schema.removeField("hlfx7bu4")

  return dao.saveCollection(collection)
})

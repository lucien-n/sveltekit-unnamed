migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // remove
  collection.schema.removeField("kro5fwt0")

  return dao.saveCollection(collection)
})

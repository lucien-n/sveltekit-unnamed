migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // remove
  collection.schema.removeField("ydd74aia")

  return dao.saveCollection(collection)
})

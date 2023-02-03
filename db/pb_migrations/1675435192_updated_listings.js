migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yq99sixo",
    "name": "picture_url",
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
  collection.schema.removeField("yq99sixo")

  return dao.saveCollection(collection)
})

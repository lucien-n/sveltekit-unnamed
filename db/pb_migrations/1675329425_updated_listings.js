migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  collection.createRule = "seller = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltlxrcangzwail0")

  collection.createRule = null

  return dao.saveCollection(collection)
})

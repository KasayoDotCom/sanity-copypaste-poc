export async function copyJSON(sourceDoc, sourceArrayElement) {
  const query = `*[_id == $id]{${sourceArrayElement}}`
  const params = {id: sourceDoc._id}

  const result = await client.fetch(query, params)
  return result[0][sourceArrayElement]
}

export async function createNewDocument(targetDoc, targetArray, content) {
  const newDocument = {
    ...targetDoc,
    _id: `${targetDoc._id}-${Date.now()}`,
    _type: targetDoc._type,
    [targetArray]: [...targetDoc[targetArray], content],
  }

  return await client.create(newDocument)
}

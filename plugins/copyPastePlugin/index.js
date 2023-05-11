import React, {useState, useEffect} from 'react'
import sanityClient from 'part:@sanity/base/client'
import FormField from 'part:@sanity/components/formfields/default'
import Select from 'part:@sanity/components/selects/default'
import Button from 'part:@sanity/components/buttons/default'
import {copyJSON, createNewDocument} from './helpers'

const client = sanityClient.withConfig({apiVersion: '2023-03-25'})

export default function CopyPastePlugin() {
  const [documents, setDocuments] = useState([])
  const [sourceDoc, setSourceDoc] = useState(null)
  const [targetDoc, setTargetDoc] = useState(null)
  const [sourceArrayElement, setSourceArrayElement] = useState(null)
  const [targetArray, setTargetArray] = useState(null)

  useEffect(() => {
    client.fetch('*[_type]').then(setDocuments)
  }, [])

  function handleCopyPaste() {
    if (!sourceDoc || !sourceArrayElement || !targetDoc || !targetArray) {
      console.error('All fields must be selected.')
      return
    }

    copyJSON(sourceDoc, sourceArrayElement)
      .then((content) => createNewDocument(targetDoc, targetArray, content))
      .catch(console.error)
  }

  return (
    <div>
      <h2>Copy & Paste Plugin</h2>

      <FormField label="Source Document">
        <Select
          options={documents}
          placeholder="Select a document"
          onChange={(option) => setSourceDoc(option)}
        />
      </FormField>

      <FormField label="Source Array Element">
        <Select
          options={sourceDoc ? Object.keys(sourceDoc) : []}
          placeholder="Select an array element"
          onChange={(option) => setSourceArrayElement(option)}
        />
      </FormField>

      <FormField label="Target Document">
        <Select
          options={documents}
          placeholder="Select a document"
          onChange={(option) => setTargetDoc(option)}
        />
      </FormField>

      <FormField label="Target Array">
        <Select
          options={targetDoc ? Object.keys(targetDoc) : []}
          placeholder="Select an array"
          onChange={(option) => setTargetArray(option)}
        />
      </FormField>

      <Button onClick={handleCopyPaste}>Copy & Paste</Button>
    </div>
  )
}

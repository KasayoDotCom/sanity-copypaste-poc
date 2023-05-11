// ./components/CopyPasteInput.tsx
import React, {useState, useEffect} from 'react'
import {useClient} from 'sanity'
import {Box, Button, Card, Flex, Select, Text, Stack} from '@sanity/ui'
import {StringInputProps, set} from 'sanity'

const CopyPasteInput: React.FC<StringInputProps> = (props) => {
  const {value, onChange, readOnly, onFocus, onBlur, focusRef, id} = props

  const client = useClient({apiVersion: '2021-10-21'})
  const [documents, setDocuments] = useState([])
  const [sourceDoc, setSourceDoc] = useState(null)
  const [sourceArrayElement, setSourceArrayElement] = useState(null)

  useEffect(() => {
    client.fetch('*[_type]').then(setDocuments)
  }, [])

  async function copyJSON(sourceDoc, sourceArrayElement) {
    const query = `*[_id == $id]{${sourceArrayElement}}`
    const params = {id: sourceDoc._id}

    const result = await client.fetch(query, params)
    return result[0][sourceArrayElement]
  }

  function handleCopyPaste() {
    if (!sourceDoc || !sourceArrayElement) {
      console.error('All fields must be selected.')
      return
    }

    copyJSON(sourceDoc, sourceArrayElement)
      .then((content) => {
        onChange(content ? set(content) : unset())
      })
      .catch(console.error)
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Text size={2} weight="semibold">
          Copy & Paste Input
        </Text>

        <Flex direction={['column', 'column', 'row']}>
          <Box flex={1} marginRight={3}>
            <Text size={1} weight="semibold">
              Source Document
            </Text>
            <Select
              id={id}
              ref={focusRef}
              readOnly={readOnly}
              value={sourceDoc}
              onFocus={onFocus}
              onBlur={onBlur}
              options={documents}
              placeholder="Select a document"
              onChange={(option) => setSourceDoc(option)}
            />
          </Box>
          <Box flex={1}>
            <Text size={1} weight="semibold">
              Source Array Element
            </Text>
            <Select
              id={id}
              ref={focusRef}
              readOnly={readOnly}
              value={sourceArrayElement}
              onFocus={onFocus}
              onBlur={onBlur}
              options={sourceDoc ? Object.keys(sourceDoc) : []}
              placeholder="Select an array element"
              onChange={(option) => setSourceArrayElement(option)}
            />
          </Box>
        </Flex>

        <Button text="Copy & Paste" tone="positive" onClick={handleCopyPaste} />
      </Stack>
    </Card>
  )
}

export default CopyPasteInput

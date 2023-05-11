import React, {useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {Box, Button, Text, Select, Stack, Flex, useToast} from '@sanity/ui'

const CopyPasteAction = ({id, type, onComplete}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [documents, setDocuments] = useState([])
  const [sourceDoc, setSourceDoc] = useState()
  const [sourceArray, setSourceArray] = useState(null)
  const [sourceArrayElement, setSourceArrayElement] = useState(null)

  const [targetDoc, setTargetDoc] = useState()
  const [targetArray, setTargetArray] = useState(null)

  const client = useClient({apiVersion: '2021-10-21'})
  const toast = useToast()

  useEffect(() => {
    client.fetch('*[_type == "page"]').then(setDocuments)
  }, [])

  const availableDocsSelectOptions = documents.map((doc) => {
    return <option value={JSON.stringify(doc)}>{doc.title}</option>
  })

  function getArrayOptionsFromObject(obj) {
    const arrayEntries = Object.entries(obj).filter(([key, value]) => Array.isArray(value))

    return arrayEntries.map(([key, array]) => (
      <option key={key} value={JSON.stringify({key: key, array: array})}>
        {key}
      </option>
    ))
  }

  const handleCopyPaste = () => {
    if (sourceArrayElement && targetArray) {
      const updatedTargetArray = [...targetArray.array, sourceArrayElement]
      const updatedTargetDoc = {...targetDoc}
      updatedTargetDoc[targetArray.key] = updatedTargetArray

      client
        .patch(targetDoc._id)
        .set(updatedTargetDoc)
        .commit()
        .then(() => {
          toast.push({
            title: 'Copy & Paste',
            description: 'Element successfully copied and pasted.',
            status: 'success',
          })
          setIsOpen(false)
          onComplete()
        })
        .catch((error) => {
          toast.push({
            title: 'Copy & Paste',
            description: 'An error occurred while copying and pasting.',
            status: 'error',
          })
          console.error('Copy & Paste error:', error)
        })
    }
  }

  return {
    id: 'copy-paste',
    icon: () => <>📋</>,
    label: 'Copy & Paste',
    onHandle: () => {
      setIsOpen(true)
    },
    dialog: {
      type: 'dialog',
      onClose: () => onComplete,
      content: isOpen && (
        <Box padding={4}>
          <Stack space={4}>
            <Text size={2} weight="semibold">
              Copy & Paste Input
            </Text>
            <Flex direction={['column', 'column', 'column']} justify={'space-between'}>
              <Box margin={[0, 0, 3, 0]}>
                <Text size={1} weight="semibold">
                  Source Document
                </Text>
                <Select
                  padding={[3, 3, 4]}
                  marginBottom={5}
                  placeholder="Select a document"
                  onChange={(option) => setSourceDoc(JSON.parse(option.target.value))}
                >
                  <option hidden disabled selected value>
                    -- select an option --
                  </option>
                  {availableDocsSelectOptions}
                </Select>
              </Box>
              {sourceDoc && (
                <Box margin={[0, 0, 3, 0]}>
                  <Text size={1} weight="semibold">
                    Source Array
                  </Text>
                  <Select
                    padding={[3, 3, 4]}
                    placeholder="Select an array element"
                    onChange={(option) => {
                      setSourceArray(JSON.parse(option.target.value))
                    }}
                  >
                    <option hidden disabled selected value>
                      -- select an option --
                    </option>
                    {getArrayOptionsFromObject(sourceDoc)}
                  </Select>
                </Box>
              )}
              {sourceDoc && sourceArray && (
                <Box margin={[0, 0, 3, 0]}>
                  <Text size={1} weight="semibold">
                    Source Element of Selected Array
                  </Text>
                  <Select
                    padding={[3, 3, 4]}
                    placeholder="Select an array element"
                    onChange={(option) => setSourceArrayElement(JSON.parse(option.target.value))}
                  >
                    <option hidden disabled selected value>
                      -- select an option --
                    </option>
                    {sourceArray.array.map((arrayElement) => (
                      <option value={JSON.stringify(arrayElement)}>
                        {arrayElement?.title || JSON.stringify(arrayElement)}
                      </option>
                    ))}
                  </Select>
                </Box>
              )}
            </Flex>
            {documents && sourceDoc && sourceArray && sourceArrayElement && (
              <Flex direction={['column', 'column', 'column']} justify={'space-between'}>
                <Box margin={[0, 0, 3, 0]}>
                  <Text size={1} weight="semibold">
                    Target Document
                  </Text>
                  <Select
                    padding={[3, 3, 4]}
                    marginBottom={5}
                    placeholder="Select a document"
                    onChange={(option) => setTargetDoc(JSON.parse(option.target.value))}
                  >
                    <option hidden disabled selected value>
                      -- select an option --
                    </option>
                    {availableDocsSelectOptions}
                  </Select>
                </Box>
                {targetDoc && (
                  <Box margin={[0, 0, 3, 0]}>
                    <Text size={1} weight="semibold">
                      Target Array
                    </Text>
                    <Select
                      padding={[3, 3, 4]}
                      placeholder="Select an array element"
                      onChange={(option) => {
                        setTargetArray(JSON.parse(option.target.value))
                      }}
                    >
                      <option hidden disabled selected value>
                        -- select an option --
                      </option>
                      {getArrayOptionsFromObject(targetDoc)}
                    </Select>
                  </Box>
                )}
              </Flex>
            )}
            {documents &&
              sourceDoc &&
              sourceArray &&
              sourceArrayElement &&
              targetDoc &&
              targetArray && (
                <Button text="Copy & Paste" tone="positive" onClick={handleCopyPaste} />
              )}
          </Stack>
        </Box>
      ),
    },
  }
}

export default CopyPasteAction

import React from 'react'
import {useDocumentOperation} from 'sanity'

export function DialogAction({id, type, published, draft}) {
  const doc = draft || published

  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [documentTitle, setDocumentTitle] = React.useState(doc?.title)

  const {patch} = useDocumentOperation(id, type)

  const patchField = (field) => {
    patch.execute([{set: {title: field}}])
  }

  return {
    label: `Edit title`,
    onHandle: () => {
      setDocumentTitle(doc?.title)
      setDialogOpen(true)
    },
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose: () => {
        setDocumentTitle(doc?.title)
        setDialogOpen(false)
      },
      header: 'Edit title field',
      content: (
        <>
          <input
            type="text"
            value={documentTitle}
            onChange={(event) => setDocumentTitle(event.currentTarget.value)}
          />
          <button
            onClick={() => {
              patchField(documentTitle)
              setDialogOpen(false)
            }}
          >
            Update
          </button>
        </>
      ),
    },
  }
}

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import CopyPasteAction from './schemas/actions/CopyPasteAction'

export default defineConfig({
  name: 'default',
  title: 'Sanity Copy&Paste POC',

  document: {
    actions: [CopyPasteAction],
  },

  projectId: '6cerk2j6',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

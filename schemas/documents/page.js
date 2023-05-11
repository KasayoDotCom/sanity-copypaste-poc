import CopyPasteAction from '../actions/CopyPasteAction'
// import CopyPasteInput from '../components/CopyPasteInput'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  //   actions: [CopyPasteAction],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    // {
    //   name: 'copyElement',
    //   title: 'Copy Element',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'targetDocument'}]}],
    //   components: {
    //     input: CopyPasteInput,
    //   },
    // },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [{type: 'module'}],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
}

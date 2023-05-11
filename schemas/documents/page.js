export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
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

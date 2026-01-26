export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Album', value: 'album' },
          { title: 'Game', value: 'game' },
          { title: 'Book', value: 'book' },
          { title: 'Film', value: 'film' },
          { title: 'Essay', value: 'essay' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { category } = selection
      return {
        ...selection,
        subtitle: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
      }
    },
  },
}



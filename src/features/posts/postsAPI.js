export const fetchPostsFromAPI = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      id: 1,
      title: 'Redux Toolkit in large apps',
      content: 'A centralized store makes scaling easier.',
    },
    {
      id: 2,
      title: 'Slices keep code organized',
      content: 'Each feature has its own reducer and actions.',
    },
  ]
}

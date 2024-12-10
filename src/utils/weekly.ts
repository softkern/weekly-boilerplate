import { type CollectionEntry, getCollection } from 'astro:content'

export const fetchWeekly = async () => {
  // if PROD, filter draft post
  const weeklies: CollectionEntry<'weekly'>[] = await getCollection('weekly', ({ data }: CollectionEntry<'weekly'>) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })
  return weeklies.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
}

export const fetchWeeklyByYear = async () => {
  const years = new Map<number, CollectionEntry<'weekly'>[]>()
  const weeklies: CollectionEntry<'weekly'>[] = await fetchWeekly()
  for (const w of weeklies) {
    const year = new Date(w.data.date).getFullYear()
    let wks = years.get(year)
    if (!wks) {
      wks = []
    }
    wks.push(w)
    years.set(year, wks)
  }
  return years
}

export const getLatestIssue = async () => {
  const weeklies: CollectionEntry<'weekly'>[] = await getCollection('weekly', ({ data }: CollectionEntry<'weekly'>) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  return Math.max(...weeklies.map((w) => w.data.issue))
}

export const fetchTags = async () => {
  const tags = new Map<string, number>()
  const weeklies = await fetchWeekly()
  weeklies.map((weekly) => {
    if (!weekly.data.tags) {
      return
    }

    weekly.data.tags.map((tag: string) => {
      tags.set(tag, (tags.get(tag) || 0) + 1)
    })
  })

  const sortedTags = Array.from(tags.entries()).sort((a, b) => b[1] - a[1])
  return sortedTags
}

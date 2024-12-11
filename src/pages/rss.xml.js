import rss from '@astrojs/rss'
import { fetchWeekly } from '@utils/weekly'
import { SITE } from 'config'

export const GET = async (context) => {
  const weeklies = await fetchWeekly()

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site?.toString() || '',
    items: await Promise.all(
      weeklies.map(async (weekly) => ({
        title: weekly.data.title,
        pubDate: weekly.data.date,
        description: weekly.data.description,
        link: `/weekly/${weekly.slug}/`,
      })),
    ),
    customData: '<language>zh-cn</language>',
  })
}

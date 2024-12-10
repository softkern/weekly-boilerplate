import { loadRenderers } from 'astro:container'
import { getContainerRenderer } from '@astrojs/mdx'
import rss from '@astrojs/rss'
import { fetchWeekly } from '@utils/weekly'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { SITE } from 'config'

export const GET = async (context) => {
  const weeklies = await fetchWeekly()

  const container = await AstroContainer.create({
    renderers: await loadRenderers([getContainerRenderer()]),
  })

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site?.toString() || '',
    items: await Promise.all(
      weeklies.map(async (weekly) => ({
        title: weekly.data.title,
        pubDate: weekly.data.date,
        description: weekly.data.description,
        content: await container.renderToString((await weekly.render()).Content),
        link: `/weekly/${weekly.slug}/`,
      })),
    ),
    customData: '<language>zh-cn</language>',
  })
}

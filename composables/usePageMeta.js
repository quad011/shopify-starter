import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import appConfig from '~/config/app';

export default function usePageMeta(page) {
  if (!page?.value) return;

  const config = useRuntimeConfig();

  const prefix = _get(page.value, 'data') ? 'data.' : '';

  // Extract and process meta title
  const titleContent =
    _get(page.value, `${prefix}meta_title`) ||
    _get(page.value, `${prefix}title`);

  // console.log(
  //   'PREFIX:',
  //   prefix,
  //   titleContent,
  //   _get(page.value, `${prefix}meta_title`),
  //   _get(page.value, `${prefix}title`),
  // );

  const title = `${appConfig.site_name} | ${stripHtml(titleContent)}`;

  // Extract and process OG title
  const ogTitle = _get(page.value, `${prefix}og_title`) || title;

  // Extract and process meta description
  const description =
    _get(page.value, `${prefix}meta_description`) || appConfig.site_description;

  // Extract and process OG description
  const ogDescription =
    _get(page.value, `${prefix}og_description`) || description;

  // Extract OG image
  const ogImage =
    _get(page.value, `${prefix}og_image.url`) || appConfig.default_og_image;

  // Set SEO meta tags
  useSeoMeta({
    title,
    ogTitle,
    description,
    ogDescription,
    ogImage,
    robots:
      config.public.staging === 'true' ? 'noindex, nofollow' : 'index, follow',
    // twitterCard: 'https://images.prismic.io/miq-website/6520187efbd9a45bcec80ee4_Future_Shaping-header1.png',
  });
}

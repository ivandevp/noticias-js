import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Meta {
  name: string
  content: string
}

interface Frontmatter {
  audio: string
  descriptionText: string
  title: string
  image: string
  date: string
}

interface Fields {
  slug: string
}

interface ISEOProps {
  title?: string
  description?: string
  lang?: string
  meta?: Meta[]
  frontmatter?: Frontmatter
  fields?: Fields
  isBlogPost?: boolean
}

const SEO: React.FC<ISEOProps> = ({
  description,
  lang = "es",
  meta = [],
  title,
  fields,
  frontmatter,
  isBlogPost,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
            social {
              fbAppId
              twitter
            }
          }
        }
      }
    `
  )

  const metaTitle = title || (frontmatter && frontmatter.title)
  const metaDescription =
    description ||
    (frontmatter && frontmatter.descriptionText) ||
    site.siteMetadata.description
  const url =
    fields && fields.slug
      ? `${site.siteMetadata.siteUrl}/${fields.slug}`
      : site.siteMetadata.siteUrl
  const image = (frontmatter && frontmatter.image) || site.siteMetadata.image

  const metaShareTitle = isBlogPost
    ? `Unexpected News Podcast: ${metaTitle}`
    : metaTitle

  return (
    <Helmet
      titleTemplate="Unexpected News Podcast - %s"
      htmlAttributes={{ lang }}
    >
      <title>{metaShareTitle}</title>
      <meta name="title" content={metaShareTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="image" content={image} />
      <link rel="canonical" href={url} />
      <meta name="author" content={site.siteMetadata.author} />
      {frontmatter && frontmatter.date ? (
        <meta name="date" content={frontmatter.date} />
      ) : null}

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={isBlogPost ? "article" : "website"} />
      <meta property="og:title" content={metaShareTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={site.siteMetadata.social.fbAppId} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.social.twitter} />
      <meta name="twitter:title" content={metaShareTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO

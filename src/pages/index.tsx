import React from 'react'
import { Link } from 'gatsby'

import { Layout } from '../components/layout'
import SEO from '../components/seo'
import { TyprEditor } from '../components/editor'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TyprEditor />
  </Layout>
)

export default IndexPage

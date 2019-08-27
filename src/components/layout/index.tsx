import * as React from 'react'
import { DefaultLayoutContainer, Main } from './elements'
import { Header } from '../header'
import Helmet from 'react-helmet'
import { Provider } from 'overmind-react'
import { overmind } from '../../overmind'

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <DefaultLayoutContainer>
    <Provider value={overmind}>
      <Header />
      <Main>{children}</Main>
    </Provider>
  </DefaultLayoutContainer>
)

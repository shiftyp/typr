import * as React from 'react'
import {
  HeaderContainer,
  Logo,
  RareWord,
  Line,
  CommonWord,
  PageDescription,
} from './elements'
import { ResponsiveRow, Row, Column } from '../flex'

export const Header = ({ children }: { children?: React.ReactNode }) => (
  <HeaderContainer>
    <ResponsiveRow responsiveWidth={400} alignItems="flex-end">
      <Logo>
        <Line>
          <RareWord>typr</RareWord>
        </Line>
        <Line>
          .<CommonWord>app</CommonWord>
        </Line>
      </Logo>
      <PageDescription responsiveWidth={400} responsiveJustifyContent="center">
        <Line>
          typr <RareWord>underlines</RareWord>{' '}
          <a href="https://books.google.com/ngrams">infrequently used</a> words
          and
        </Line>
        <Line>suggests more frequently used synonyms.</Line>
        <Line>click on a suggestion to make the change.</Line>
      </PageDescription>
      {children}
    </ResponsiveRow>
  </HeaderContainer>
)

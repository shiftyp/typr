import * as React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Link, GatsbyLinkProps } from 'gatsby'
import { ResponsiveRow } from '../flex'

export const HeaderContainer = styled.header`
  padding: 20px 0;
`

export const Line = styled.span`
  display: inline-block;
  width: 100%;
`

export const BorderedWord = styled.span`
  display: inline-block;
  position: relative;
  &::before {
    top: 1.2em;
    width: 100%;
    display: block;
    position: absolute;
    content: ' ';
    border-top-width: 0.5em;
    border-top-style: solid;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  }
`

export const CommonWord = styled(BorderedWord)`
  &::before {
    border-top-color: #aaa;
  }
`

export const RareWord = styled(BorderedWord)`
  &::before {
    border-top-color: #000;
  }
`

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  background: #fff;
  color: #000;
  text-decoration: none;

  padding: 10px 0;
  margin: 0 0 20px 0;

  font-family: 'Major Mono Display', monospace;
  text-transform: lowercase;
  font-size: 2em;
  font-weight: 600;

  ${BorderedWord} {
    margin-bottom: 0.8em;
  }
`

export const PageDescription = styled(ResponsiveRow)`
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 0.8em;
  line-height: 1.5em;

  @media (max-width: ${({ responsiveWidth }) => responsiveWidth}px) {
    text-align: center;
  }
`

import * as React from 'react'
import styled, { css } from 'styled-components'

const width = 720

const OuterContainer = styled.div`
  box-sizing: border-box;
  display: flex;

  padding: 0 2rem;

  width: 100%;
  justify-content: center;

  @media (max-width: ${width}px) {
    padding: 0;
  }
`

const InnerContainer = styled.div`
  width: 100%;
  max-width: ${width}px;
`

export const MaxWidthContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  width?: number
  className?: string
  responsive?: boolean
}) => (
  <OuterContainer>
    <InnerContainer className={className}>{children}</InnerContainer>
  </OuterContainer>
)

export type FlexAlign =
  | 'space-evenly'
  | 'space-between'
  | 'center'
  | 'flex-start'
  | 'flex-end'

export type FlexProps = {
  justifyContent?: FlexAlign
  alignItems?: FlexAlign
}

export const FlexContainer = styled.div<FlexProps>`
  display: flex;

  justify-content: ${({ justifyContent = 'space-between' }) => justifyContent};
  align-items: ${({ alignItems = 'center' }) => alignItems};
`

export const Row = styled(FlexContainer)`
  flex-direction: row;
`

export const FullWidthRow = styled(Row)`
  width: 100%;
`

export const ResponsiveRow = styled(Row)<{
  responsiveWidth?: number
  responsiveAlignItems?: FlexAlign
  responsiveJustifyContent?: FlexAlign
}>`
  @media (max-width: ${({ responsiveWidth = 600 }) => responsiveWidth}px) {
    flex-direction: column;

    align-items: ${({ responsiveAlignItems = 'center' }) =>
      responsiveAlignItems};
    justify-content: ${({ responsiveJustifyContent = 'center' }) =>
      responsiveJustifyContent};
  }
`

export const Column = styled(FlexContainer)`
  flex-direction: column;
`

export const FullWidthColumn = styled(Column)`
  width: 100%;
`

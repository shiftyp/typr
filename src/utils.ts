import * as React from 'react'
import { Info, WordInfo } from './types'

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.substr(1)

export const isCaptialized = (str: string) =>
  str.charCodeAt(0) <= 90 && str.charCodeAt(0) >= 65

export const frequencyToLuminosity = (
  frequency: number,
  minf: number,
  maxf: number,
) => Math.max(0, Math.min(100, ((frequency - minf) / (maxf - minf)) * 100))

export function makeFetch<Ret, Args extends any[] = []>(
  makeUrl: ((...args: Args) => string) | string,
) {
  return async (...args: Args) => {
    const resp = await fetch(
      makeUrl instanceof Function ? makeUrl(...args) : makeUrl,
    )
    const data = await resp.json()

    return data as Ret
  }
}

export const getRelativeBoundingBox = (
  baseRef?: React.RefObject<HTMLElement>,
  parentRef?: React.RefObject<HTMLElement>,
): ClientRect | null => {
  if (!baseRef || !baseRef.current || !parentRef || !parentRef.current) {
    return null
  }

  const base: ClientRect = baseRef.current.getBoundingClientRect()
  const parent: ClientRect = parentRef.current.getBoundingClientRect()

  return {
    top: base.top - parent.top,
    left: base.left - parent.left,
    right: base.right - parent.left,
    bottom: base.bottom - parent.top,
    width: base.width,
    height: base.height,
  }
}

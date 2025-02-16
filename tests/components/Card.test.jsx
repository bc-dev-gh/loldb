import { render, screen } from '@testing-library/react'
import React from 'react'
import Card from '../../src/components/Card'

describe('Card', () => {
  it('should render a Card with a Title, Subtitle, Body, and an Icon with IconAlt when supplied', () => {
    const testDict = {
      'title': { 'text': 'Lorem Ipsum', 'role': ['heading', {level:4}]},
      'subtitle': { 'text': 'dolor sit amet', 'role': ['heading', {level:5}]},
      'body': { 'text': 'consectetur adipiscing elit. Nulla neque sapien, elementum tristique eros id, iaculis interdum augue.', 'role': ['paragraph']}
    }
    const imgLink = 'favicon.ico'
    const imgAlt = 'image description'
    render(<Card
      title={testDict.title.text}
      subtitle={testDict.subtitle.text}
      iconurl={imgLink}
      iconalt={imgAlt}
      body={testDict.body.text} />)
    for (const key in testDict) {
      const testElement = screen.getByRole.apply(this, testDict[key].role)
      expect(testElement).toBeInTheDocument()
      expect(testElement).toHaveTextContent(RegExp(testDict[key].text),'i')
    }
    const testImage = screen.queryByRole('img')
    expect(testImage).toBeInTheDocument()
    expect(testImage).toHaveAttribute('alt', imgAlt)
    expect(testImage).toHaveAttribute('src', imgLink)
  })

  it('should not attempt to render an image if iconurl is not provided', () => {
    render (<Card />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
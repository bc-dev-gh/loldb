import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Card from '../../src/components/Card'

describe('Card', () => {
  it('should render a Card with a Title, Subtitle, Body, Link and an Icon with IconAlt when supplied', () => {
    const testDict = {
      'title': { 'text': 'Lorem Ipsum', 'role': ['heading', {level:4}]},
      'subtitle': { 'text': 'dolor sit amet', 'role': ['heading', {level:5}]},
      'body': { 'text': 'consectetur adipiscing elit. Nulla neque sapien, elementum tristique eros id, iaculis interdum augue.', 'role': ['paragraph']}
    }
    const imgLink = 'favicon.ico'
    const imgAlt = 'image description'
    const linkPage = '/loldb/items'
    render(
      <BrowserRouter>
        <Card
        title={testDict.title.text}
        subtitle={testDict.subtitle.text}
        linkurl={linkPage}
        iconurl={imgLink}
        iconalt={imgAlt}
        body={testDict.body.text} />
      </BrowserRouter>
    )
    for (const key in testDict) {
      const testElement = screen.getByRole.apply(this, testDict[key].role)
      expect(testElement).toBeInTheDocument()
      expect(testElement).toHaveTextContent(RegExp(testDict[key].text),'i')
    }
    const testImage = screen.getByRole('img')
    expect(testImage).toBeInTheDocument()
    expect(testImage).toHaveAttribute('alt', imgAlt)
    expect(testImage).toHaveAttribute('src', imgLink)
    const testLink = screen.getByRole('link')
    expect(testLink).toBeInTheDocument()
    expect(testLink).toHaveAttribute('href', linkPage)
  })

  it('should not attempt to render an image  or generate a link if iconurl or linkurl are not respectively provided', () => {
    render (<Card />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
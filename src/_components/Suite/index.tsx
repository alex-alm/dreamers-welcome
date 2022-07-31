import React from 'react'
import Highlight from './Highlight'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
        }
    }
    hideFirstSeparator?: boolean
}
const Suite = ({ data, hideFirstSeparator }: SuiteProps) => {
    const { fields } = data
    const { highlights } = fields
    return (
        <>
            {highlights && highlights.length
                ? highlights.map((x, i) => (
                      // @ts-ignore
                      <Highlight
                          key={~~(i * Math.random())}
                          data={x}
                          hideSeparator={hideFirstSeparator && i === 0}
                      />
                  ))
                : null}
        </>
    )
}

export default Suite

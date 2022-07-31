import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import BodyText from '../../Typography/BodyText'

const SubNav = styled.div`
    position: sticky;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50px;
    z-index: 200;
    background: white;
    
    .separator {
        margin: 0 30px;
        height: 1px;
        background-color: #c1c1c1;
        width: calc(100% - 60px);
        position: absolute;
        bottom: 0;
    }
`

const SubLink = styled.div`
    display: inline-block;
    margin: 0 40px;
    cursor: pointer;

    .active {
        text-decoration: underline;
    }
`

const SubNavigation = ({
    data,
    queryArray,
    activeState,
}: {
    data: [{ name: string; slug: string }]
    queryArray?: string | string[]
    activeState?: string
}) => {
    const router = useRouter()
    const shallowRoute = (slug: string): void => {
        if (queryArray === undefined) {
            return
        }
        const baseUrl = `/${queryArray[0]}/${queryArray[1]}`
        router.push(`${baseUrl}/${slug}`, undefined, { shallow: true })
    }

    const getSubClass = (slug: string): string => {
        if (queryArray === undefined) {
            return ''
        }
        return slug === activeState ? 'active' : ''
    }
    return (
        <SubNav>
            <div>
                {data &&
                    data.length &&
                    data.map((x, i: number) => {
                        return (
                            <SubLink
                                key={i}
                                onClick={() => shallowRoute(x.slug)}
                            >
                                <BodyText
                                    size="lg"
                                    uppercase
                                    className={getSubClass(x.slug)}
                                >
                                    {x.name}
                                </BodyText>
                            </SubLink>
                        )
                    })}
            </div>
            <div className="separator" />
        </SubNav>
    )
}

export default SubNavigation

import { getAllPropertiesForPaths, getProperty } from '../_lib/api'
import GridImage from '../_components/UI/GridImage'
import Blurb from '../_components/UI/Blurb'
import Suite from '../_components/Suite'
import BannerContent from '../_components/UI/BannerContent'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SubNavigation from '../_components/Navigation/SubNavigation'
import { useRouter } from 'next/router'

interface PropertyProps {
    propertyResponse: any
    setBucket: any
}

const StyledGridImage = styled(GridImage)`
    height: calc(100vh);
    min-height: 700px;
`

const Home = ({ propertyResponse, setBucket }: PropertyProps) => {
    const {
        bannerImage,
        bannerHeader,
        blurb,
        suites,
        rooms,
        bottomBlurb,
        location,
        propertyType,
        bannerDescriptionList,
        bucket,
        features,
    } = propertyResponse

    const router = useRouter()

    setBucket(bucket[0])
    const pType = propertyType[0]
    const showSubNav = pType === 'Suites' || pType === 'Hotel'

    const [activeView, setView] = useState(suites[0])

    const getSubNavigationData = () => {
        if (pType === 'Suites') {
            return suites.map((x: { fields: any }) => {
                return { name: x.fields.suiteName, slug: x.fields.slug }
            })
        } else if (pType === 'Hotel') {
            return [
                { name: 'Suites', slug: 'suites' },
                { name: 'Rooms', slug: 'rooms' },
            ]
        }
    }

    useEffect(() => {
        const a = router.query.slug
        let viewToShow: string | undefined
        if (Array.isArray(a) && a.length > 2) {
            viewToShow = a.pop()
        } else {
            viewToShow = suites[0].fields.slug
        }

        const finalView = suites.find(
            (x: { fields: { slug: string } }) => x.fields.slug === viewToShow
        )
        setView(finalView)
    }, [router.query])

    return (
        <>
            <StyledGridImage
                imageObj={bannerImage}
                border={false}
                borderRadius={false}
                fullHeight
                //ratio={0.5}
            >
                <BannerContent
                    headerText={bannerHeader}
                    headerSubheader={`${propertyType} in ${location}`}
                    description={bannerDescriptionList}
                />
            </StyledGridImage>
            <Blurb text={blurb} />
            {showSubNav && (
                <SubNavigation
                    activeState={activeView.fields.slug}
                    queryArray={router.query.slug}
                    data={getSubNavigationData()}
                />
            )}
            <Suite
                id="suites_view"
                data={activeView}
                hideFirstSeparator={showSubNav && suites.length > 1}
            />
            {bottomBlurb && <Blurb text={bottomBlurb} borderTop />}
        </>
    )
}

export default Home

export async function getStaticProps(context: { params: { slug: string } }) {
    const propertyResponse = await getProperty(context.params.slug[1])

    return {
        props: {
            propertyResponse,
        },
    }
}

export async function getStaticPaths() {
    const allProperties = await getAllPropertiesForPaths()

    // @ts-ignore
    let paths: { params: { slug: string[] } }[] = []

    // @ts-ignore
    allProperties.forEach((property) => {
        const bucket = property.bucket[0].toLowerCase().replace(/\s/g, '')
        const propertyType = property.propertyType[0]
        const pathObj = { params: { slug: [bucket, property.slug] } }
        paths.push(pathObj)

        // Check for suite routes
        if (
            property.suites &&
            property.suites.length > 1 &&
            propertyType === 'Suites'
        ) {
            property.suites.map((y: { fields: { slug: string } }) => {
                const pathObj = {
                    params: {
                        slug: [bucket, property.slug, y.fields.slug],
                    },
                }
                paths.push(pathObj)
            })
        } else if (propertyType === 'Hotel') {
            // Do some stuff

            const addition = [
                {
                    params: {
                        slug: [bucket, property.slug, 'suites'],
                    },
                },
                {
                    params: {
                        slug: [bucket, property.slug, 'rooms'],
                    },
                },
            ]
            paths.push(...addition);
        }
    })

    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    }
}

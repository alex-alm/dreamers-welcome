import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { ViewportProvider } from '../_utils/ViewportProvider'
import { ReactNode, useEffect, useState } from 'react'
import TopNav from '../_components/Navigation'
import styled from 'styled-components'
import Footer from '../_components/Footer'
import EmailCapture from '../_components/EmailCapture'
import { useRouter } from 'next/router'
import { getPostUrl } from '../_lib/apiConstants'

const StyledMain = styled.main`
    width: 100%;
    min-height: 100vh;
`
interface HeaderData {
    bucket?: string
    property?: string
    simpleNav?: boolean
}

function MyApp({ Component, pageProps }: AppProps) {
    // @ts-ignore
    const [navTheme, setNavTheme] = useState(undefined)
    const [headerData, setHeaderData] = useState<HeaderData | undefined>(
        undefined
    )
    const router = useRouter()
    const blockList = ['/[...slug]', '/experience/[slug]', '/guide/[slug]', '/']

    useEffect(() => {
        if (blockList.includes(router.pathname)) {
            return
        }

        let data
        if (router.asPath.indexOf('puertorico') > -1) {
            data = { bucket: 'Puerto Rico', simpleNav: false }
        } else if (router.asPath.indexOf('northcarolina') > -1) {
            data = { bucket: 'North Carolina', simpleNav: false }
        } else {
            data = { bucket: undefined, property: undefined, simpleNav: false }
        }
        setHeaderData({ ...headerData, ...data })
    }, [router])

    return (
        <ViewportProvider>
            <TopNav navTheme={navTheme} headerData={headerData} />
            <StyledMain id="main">
                <Component
                    {...pageProps}
                    setHeaderData={setHeaderData}
                    setNavTheme={setNavTheme}
                />
            </StyledMain>
            <EmailCapture />
            <Footer activeBucket={headerData?.bucket} />
        </ViewportProvider>
    )
}
export default MyApp

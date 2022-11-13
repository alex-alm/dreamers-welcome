import styled, { css } from 'styled-components'
import { rem } from 'polished'

interface P {
    dark?: boolean
    active?: boolean
    opened?: boolean
    navTheme?: string
    collapse?: boolean
}

export const StyledSelect = styled.select`
    option:hover {
        background: white;
    }
`

export const StyledDropdown = styled.div`
    position: absolute;
    left: ${rem(30)};
    height: 100%;
    color: ${({ dark }: P) => (dark ? '#1a1a1a' : 'white')};
    display: flex;
    align-items: center;
    min-width: 240px;
    cursor: pointer;
    font-size: ${rem(16)};
    text-transform: uppercase;
    letter-spacing: ${rem(0.5)};
    z-index: 1;
`

export const Panel = styled.ul`
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5);
    transform-origin: 100% 0;
    transition: 0.3s;
    position: absolute;
    top: calc(100% + 10px);
    overflow: hidden;
    list-style: none;
    width: ${rem(200)};
    border: 1px solid #c1c1c1;
    border-radius: ${rem(8)};

    ${({ opened }: P) =>
        opened &&
        css`
            visibility: visible;
            opacity: 1;
            background: rgba(255, 255, 255, 0.9);
            transform: scale(1);
        `};

    li {
        padding: ${rem(9)} ${rem(16)};
        color: #1a1a1a;
        transition: 0.3s;
    }

    li:last-child {
        margin: 0;
        border: none;
    }

    li:hover,
    li.active {
        background: #d9d9d9;
    }
`

export const Inner = styled.div`
    position: relative;
    float: right;
`

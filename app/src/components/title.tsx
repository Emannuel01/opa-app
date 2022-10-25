import styled from "styled-components"

export interface TitleProps {
    title: string
}

export function Title({ title }: TitleProps) {
    return (
        <TextTitle>{title}</TextTitle>
    )
}

const TextTitle = styled.div`
    font-family: Google Sans,sans-serif;
    color: #494949;
    font-weight: bold;
    font-size: 26px;
    padding: 0 0 30px;
`
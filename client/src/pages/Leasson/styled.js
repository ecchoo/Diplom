import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
`

export const SideBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 20%;
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(3)};
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing(5, 3)};
    border-right: 2px solid ${({ theme }) => theme.colors.background};
`

export const SideBarSection = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(1)};
`

export const SectionTitle = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    opacity: .7;
    font-size: 22px;
`

export const NavigationLink = styled.a`
    font-size: 16px;
`

export const LeassonContent = styled.div`
    margin-left: 20%;
    width: 80%;
    overflow-y: auto;
    position: relative;
    /* padding: ${({ theme }) => theme.spacing(3)}; */
`

export const MdWrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    overflow-y: hidden;
    & * {
        border: none !important;
    }
    & .section-container.html-wrap {
        height: auto;
        overflow-y: hidden !important;
    }

    & .rc-md-editor {
        height: 100%;
    }

    & .rc-md-navigation.visible, .section.sec-md.visible {
        display: none;
    }

    & .rc-md-editor .editor-container > .section {
        border: none !important;
    }
`

export const PracticalTasks = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(1, 1.5, 1.5, 1.5)};
`

export const PracticalTasksList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: ${({ theme }) => theme.spacing(4)};
`

export const PracticalTasksHeader = styled.span`
    font-size: 24px;
    font-weight: 700;
`

export const PracticalTask = styled.li`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
`

export const ButtonAddFile = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: max-content;
    background-color: ${({ theme }) => theme.colors.accent};

    &:disabled{
        opacity: .5;
    }
`

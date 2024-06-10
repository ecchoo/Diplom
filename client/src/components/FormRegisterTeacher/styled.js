import { TextField as UITextField } from "@/UI";
import styled from "styled-components";

export const TextField = styled(UITextField)`
    /* border: 1px solid ${({ theme }) => theme.colors.primary} !important; */
    border-radius: ${({ theme }) => theme.spacing(1)};
    width: 100%;

    & label {
        font-size: 20px;
    }
`
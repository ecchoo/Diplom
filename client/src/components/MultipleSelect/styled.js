import { FormControl, Select } from "@mui/material";
import styled from "styled-components";

export const MultipleSelectContainer = styled(FormControl)`
    width: 100%;
`;

export const MultSelect = styled(Select)`
    border-radius: 10px !important;

    &::focus-visible *{
        outline: none !important;
    }
`;

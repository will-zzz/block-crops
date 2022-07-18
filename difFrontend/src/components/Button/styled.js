import { styled, Button } from "@mui/material";

export const CustomizedButton = styled(Button)(
  ({ theme }) => `
        .MuiInputBase-input {
            font-size: 14px;
        }
        .MuiInputLabel-root {
            color: ${theme.palette.primary.main};
            font-size: 14px;
        }
        position: absolute;
        bottom: 25px;
        right: 25px;
        border-radius: 8px;
        min-width: 106px;
    `
);

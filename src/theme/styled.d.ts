import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            main: string;
            secondary: string;
            white: string;
            dark: string;
            lightGray: string;
        }
    }
}

import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },

    body: {
        color: '$gray100',
        background: '#202024',
        '-webkit-font-smoothing': 'antialiased',
    },
})
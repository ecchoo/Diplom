export const theme = {
    colors: {
        primary: '#353535',
        secondary: '#f4ff73',
        accent: '#c19cf6',
        background: '#f2f2f2',

        gray: '#d6d6d3',

        progressBar: {
            primary: 'rgba(255, 199, 115, .2)',
            secondary: '#ffc773'
        },

        message: {
            incoming: '#ffffed',
            outgoing: '#f4edff'
        },

        white: '#ffffff',
        black: '#000000'
    },

    spacing: (...sizes) => {
        return sizes.map(size => `${size * 10}px`).join(' ')
    }
}
export const ShieldSvg = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
            {...props}
        >
            <defs>
                <clipPath id="a">
                    <path fill="#fff" fillOpacity={0} d="M0 0h20v20H0z" />
                </clipPath>
            </defs>
            <g fill="#000" clipPath="url(#a)">
                <path d="M10 19.68c-.34 0-.64-.09-.92-.26L5.61 17.4a8.29 8.29 0 01-3.15-3.07 8.364 8.364 0 01-1.18-4.22V4.57c0-.39.11-.73.33-1.05.22-.31.51-.54.87-.67L9.37.32c.42-.15.83-.15 1.25 0l6.9 2.53c.35.13.64.36.86.67.22.32.33.66.33 1.05v5.54a8.364 8.364 0 01-1.18 4.22 8.29 8.29 0 01-3.15 3.07l-3.46 2.02c-.29.17-.59.26-.92.26zm0-18.04a.33.33 0 00-.14 0L2.97 4.18c-.18.07-.27.2-.26.39v5.54c.02 1.26.35 2.43.99 3.51a6.9 6.9 0 002.63 2.54L9.8 18.2c.13.07.26.07.4 0l3.46-2.04a6.9 6.9 0 002.63-2.54c.64-1.08.97-2.25.99-3.51V4.57c0-.19-.08-.31-.26-.37l-6.89-2.54a.585.585 0 00-.13-.02z" />
                <path d="M9.37 12.77c-.18 0-.33-.06-.47-.17l-2.44-2.06a.689.689 0 01-.25-.48.66.66 0 01.17-.52c.12-.16.28-.24.48-.26.2-.02.37.04.52.17l1.92 1.61 3.27-3.6c.13-.15.29-.23.49-.24.2-.01.37.05.52.19.14.13.22.29.23.49.01.2-.05.37-.18.52l-3.7 4.11c-.15.17-.34.24-.56.24z" />
            </g>
        </svg>
    )
}
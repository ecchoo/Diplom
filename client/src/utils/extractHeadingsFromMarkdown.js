export const extractHeadingsFromMarkdown = (markdown) => {
    const regex = /^(#{1,6})\s+(.+)/gm;
    const matches = [...markdown.matchAll(regex)];
    return matches.map(match => ({
        level: match[1].length,
        text: match[2],
        anchor: match[2].toLowerCase().replace(/\s+/g, '-')
    }));
};
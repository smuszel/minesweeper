export const range = (start = 0) => end => {
    return Array(end - start).fill(undefined).map((_, ix) => ix + start);
}
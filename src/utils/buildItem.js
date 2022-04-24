export function buildItem(string) {
    const parse = new DOMParser()
    const HTML = parse.parseFromString(string, "text/html")
    return HTML.body.firstChild
}
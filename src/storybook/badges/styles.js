export const badge = (b = {}) => ` {
    display: inline-block;
    content: "${b.content}";
    background: ${b.color || 'red'};
    min-width: 1em;
    border-radius: 10em;
    vertical-align: baseline;
    padding: 2px 1ex 1px;
    font-size: 85%;
    margin: 0 1ex;
    text-align: center;
    font-weight: bold;
    color: white;
    line-height: 1;
    /* position: absolute; */
    right: 2em;
}`

export const bullet = (b = {}) => `{
    display: inline-block;
    content: "";
    background: ${b.color || 'red'};
    width: 1em;
    height: 1em;
    border-radius: 1em;
    font-size: 85%;
    margin: 0 1ex;
    /* position: absolute; */
    right: 2em;
}`
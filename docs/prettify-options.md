# Options

## indent_size
Type: `Number`
Default value: `2`

The indentation size to be used on the output HTML.

## indent_char
Type: `String`
Default value: `' '` (space)
Options: `space`|`tab` (use an actual space or tab, not the word)

Character with which to indent the output HTML.

## indent_scripts
Type: `String`
Default value: `normal`
Options: `keep`|`separate`|`normal`

The indentation character to use to indent the output HTML.

## indent_inner_html
Type: `Boolean`
Default value: `true`

Indent `<body></body>` and `<head></head>` sections.

## brace_style
Type: `String`
Default value: `collapse`

Options:

* `collapse`: (default) puts braces on the same line as control statements
* `expand`: put all braces on their own lines (Allman / ANSI style)
* `end-expand`: put _end_ braces only on their own line.

## wrap_line_length
Type: `Number`
Default value: `0` (disabled)

Maximum characters per line. `0` disables, max is `250`.

## preserve_newlines
Type: `Boolean`
Default value: `true`

Preserve existing line-breaks.

## max_preserve_newlines
Type: `Number`
Default value: `unlimited`

Maximum number of consecutive line-breaks to be preserved.

## unformatted
Type: `String|Array`
Default value: `["pre", "code"]`

Array of tags that should not be re-formatted in the output. Defaults to inline.

_Attention:_ Make sure you play around with the settings and view the HTML in the browser. Pay special attention to whitespace around links and other inline elements, such as `<strong>` and `<span>`. If you specify a list of elements to remain `unformatted`, you will definitely need to make sure that whitepace is rendering the way you want it to.



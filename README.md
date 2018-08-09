## About

A react component that horizontally truncates text based on how much width it fills in it's parent container.

## Install

Install from npm and you should be ready. The package will use your version of react from your project.

```
npm install --save react-truncator
```

## Use

Currently, the truncator component works best when used with block level elements rather the inline or inline block elements as this allows it to determine it's full size. The component takes the following props:

- **text**: The text to truncate as a string
- **extraSpacing**: Any extra spacing the text might need.
- **minWidth**: Override the size of the space the text takes up with a minimum width

```
import Truncator from 'react-truncator'

// ...
<Truncator
  text={yourText}
  extraSpacing={20}
/>
```

## How it works

The truncator will take a first pass and render the text with CSS styles so it fills up it's full space within it's parent. From here the truncator will know the text's width and will use an algorithm to determine how many characters it needs to truncate in order to fit within the space. Once it determines this it re-renders with the truncated text.

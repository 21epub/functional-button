# functional-button
functional buttons for epub360

## node version
node >= 16

## dev start command

`npm install`

`npm run dev`

## release

`npm run release`

## storybook

`npm run storybook`

## usage

### ExportButton

```
import {ExportButton} from '@21epub/functional-button'

export default function Test() {

    return(
        <ExportButton 
            content="导出PDF" 
            exportUrl={`/v3/api/docset/${slug}/export_pdf/`}
        />
    )
}

```

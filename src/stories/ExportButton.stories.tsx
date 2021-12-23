import type { ComponentMeta, ComponentStory } from '@storybook/react'
import 'antd/dist/antd.css'
import ExportButton from '../components/ExportButton'

export default {
  title: 'ExportButton/Default',
  component: ExportButton,
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof ExportButton>

const Template: ComponentStory<typeof ExportButton> = (args) => {
  return <ExportButton {...args} />
}

export const Default = Template.bind({})

Default.args = {
  exportUrl: '11111111' 
}

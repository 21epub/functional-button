import { message } from 'antd'
import type { ExportButtonProps} from '../../types';
import { ExportStatus } from '../../types'
import request from 'umi-request'


function exportData(exportUrl:string) {
    const resp = request.post(exportUrl)
    return resp
}

async function getExportDataStatus(exportUrl:string) {
    const resp = await request.get(exportUrl)
    return resp
}

const ExportButton:React.FC<ExportButtonProps> = (props) => {
    const {exportUrl,content="导出",style} = props
    
    const getExportStatus = async () =>{
        const res = await getExportDataStatus(exportUrl)

        if (res?.code === 200) {
            const exportItem = res.data.results[0]
            
            if(exportItem.status === ExportStatus.DONE){
                window.open(exportItem.download_url)
            }else if (exportItem.status === ExportStatus.EXPORTING) {
                //处理中则递归调用查询函数
                setTimeout(() =>{
                    getExportStatus()
                },2000)

            } else if (exportItem.status === ExportStatus.ERROR) {
                message.error('导出失败，请重试！')
            }
        } else {
            message.error(res?.msg)
        }
    
    }

    const createZipExport = async () => {
        const res = await exportData(exportUrl)

        if (res?.code === 200) {
            const exportItem = res.data.results[0]
            
            if(exportItem.status === ExportStatus.DONE){
                window.open(exportItem.download_url)
            }else if (exportItem.status === ExportStatus.EXPORTING) {
                // 处理中则递归调用查询函数
                setTimeout(() =>{
                    getExportStatus()
                },2000)
            } else if (exportItem.status === ExportStatus.ERROR) {
                message.error('导出失败，请重试！')
            }
        } else {
            message.error(res?.msg)
        }

    }

    const handleOnClick = () =>{
        createZipExport()
    }

    return(
        <div style={style} onClick={handleOnClick}>
        {content}
        </div>
    )
}

export default ExportButton
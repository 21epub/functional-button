import { message } from 'antd'
import type { ExportButtonProps} from '../../types';
import { ExportStatus } from '../../types'
import request from 'umi-request'
import downloadFile from '../../util/util';
import { AppContext } from '../../util/context';
import { useContext } from 'react';

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
    let requestTimes = 0;
    const { state: data, dispatch } = useContext(AppContext)
    
    console.log("data",data);
    

    const getExportStatus = async () =>{
        requestTimes += 1
        if(requestTimes < 30){
            const res = await getExportDataStatus(exportUrl)

            if (res?.code === 200) {
                const exportItem = res.data.results[0]
                
                if(exportItem.status === ExportStatus.DONE){
                    dispatch({type: 'selectExportStatus',payload: {exportStatus: exportItem.status}})
                    const fileName = exportItem.download_url.split('/')[exportItem.download_url.split('/').length - 1]
                    downloadFile(exportItem.download_url,fileName)
                }else if (exportItem.status === ExportStatus.EXPORTING) {
                    dispatch({type: 'selectExportStatus',payload: {exportStatus: exportItem.status}})
                    //处理中则递归调用查询函数
                    setTimeout(() =>{
                        getExportStatus()
                    },2000)
                } else if (exportItem.status === ExportStatus.ERROR) {
                    dispatch({type: 'selectExportStatus',payload: {exportStatus: exportItem.status}})
                    message.error('导出失败，请重试！')
                }
            } else {
                message.error(res?.msg)
            }
        }else{
            message.error('导出超时！')
        }
    
    }

    const createZipExport = async () => {
        const res = await exportData(exportUrl)

        if (res?.code === 200) {
            const exportItem = res.data.results[0]
            
            if(exportItem.status === ExportStatus.DONE){
                dispatch({type: 'selectExportStatus',payload: {exportStatus: exportItem.status}})
                const fileName = exportItem.download_url.split('/')[exportItem.download_url.split('/').length - 1]
                downloadFile(exportItem.download_url,fileName)
            }else if (exportItem.status === ExportStatus.EXPORTING) {
                dispatch({type: 'selectExportStatus',payload: {exportStatus: exportItem.status}})
                // 处理中则递归调用查询函数
                setTimeout(() =>{
                    getExportStatus()
                },2000)
            } else if (exportItem.status === ExportStatus.ERROR) {
                dispatch({type: 'selectExportStatus',payload: {exportStatus: exportItem.status}})
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
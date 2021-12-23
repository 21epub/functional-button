// eslint-disable-next-line
export enum ExportStatus {
    INITIAL = 0, //没有导出过
    EXPORTING = 1, //导出中
    DONE = 2, //最近一次导出已完成
    ERROR = 3, //导出操作出错
}

export interface ExportButtonProps {
    exportUrl:string
    content?:React.ReactNode|string
    style?: React.CSSProperties
}

const reducer = (state: any, action: any) => {

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (action.type) {
      case 'selectExportStatus': 
        // eslint-disable-next-line no-case-declarations
        const { payload } = action
        return { ...state, ...payload }
      default:
        throw new Error()
    }
  }
  
  export default reducer
  
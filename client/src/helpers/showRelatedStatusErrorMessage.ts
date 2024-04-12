export const showRelatedStatusErrorMessage = (status: number, isDataInvalid: (isValid: boolean) => void,
isUserConfirmed: (isConfirmed: boolean) => void) => {
    if (status === 401) { 
        isUserConfirmed(true) 
        isDataInvalid(true)
    }
    if (status === 403) { 
        isUserConfirmed(false) 
        isDataInvalid(false)
    }
}

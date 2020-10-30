import { ManageChildren } from '../contants/actionType'

const initialState = {
    childrenList : [],
    specialCircumstances : [],
    riskSpecial : [],
    otherCircumstances : [],
    formOfHelp : [],
    totalChildrenList : null,
    totalSpecialCircumstances : null,
    totalRiskSpecial : null,
    totalOtherCircumstances : null,
    totalFormOfHelp : null,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case ManageChildren.FETCH_DATA:
            return {
                ...state,
                childrenList : [...action.data.payload],
                totalChildrenList : action.data.total
            };
        case ManageChildren.FETCH_SPECIAL_CIRCUMSTANCES:
            return {
                ...state,
                specialCircumstances : [...action.data.payload],
                totalSpecialCircumstances : action.data.total,
            };
        case ManageChildren.FETCH_RISK_SPECIAL_CIRCUMSTANCES:
            return {
                ...state,
                riskSpecial : [...action.data.payload],
                totalRiskSpecial : action.data.total,
            };
        case ManageChildren.FETCH_OTHER_CIRCUMSTANCES:
            return {
                ...state,
                otherCircumstances : [...action.data.payload],
                totalOtherCircumstances : action.data.total,
            };
        case ManageChildren.FETCH_FORM_OF_HELP:
            return {
                ...state,
                formOfHelp : [...action.data.payload],
                totalFormOfHelp : action.data.total,
            };
        default:
            return state;
    }
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchCommon = (url, params) => {

    const initialState = [
        {
            id_tinhthanhpho: null,
            ten_tinhthanhpho: null,
            id_quanhuyen: null,
            ten_quanhuyen: null,
            id_phuongxa: null,
            ten_phuongxa: null,
        }
    ]

    const [state, setState] = useState(initialState)

    useEffect(()=>{
        axios.get(url)
             .then(res => {
                setState([...state,res.result])
             })
    },[url])

    return [state]
}
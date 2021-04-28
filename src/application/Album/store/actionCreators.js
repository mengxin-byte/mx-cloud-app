import * as actionTypes from './constants'
import { getAlbumDetailRequest } from '../../../api/request'
import { fromJS } from 'immutable'


export const changeCurrentAlbum = (data) => ({
    type: actionTypes.CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getAlbumList = (id) => {
    return (dispatch) => {
        getAlbumDetailRequest(id).then((res) => {
            let data = res.playlist;
            dispatch(changeCurrentAlbum(data))
            dispatch(changeEnterLoading(false))
        }).catch(() => {
            console.log("获取album失败")
        })
    }
}
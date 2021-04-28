import React, { useState, useEffect, useContext } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
    NavContainer,
    ListContainer,
    List,
    ListItem
} from "./style";
import Scroll from '../../baseUI/scroll/index';
import * as actionTypes from './store/actionCreators';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading';
import { CHANGE_CATEGORY, CHANGE_ALPHA, CategoryDataContext } from './data';
import { renderRoutes } from 'react-router-config';

function Singers(props) {

    // let [category, setCategory] = useState('')
    // let [alpha, setAlpha] = useState('')

    const { data, dispatch } = useContext(CategoryDataContext)
    const { category, alpha } = data.toJS()

    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

    const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

    useEffect(() => {
        if (!singerList.size) {
            getHotSingerDispatch()
        }
    }, [])


    let handleUpdateAlpha = (val) => {
        // setAlpha(val);
        dispatch({ type: CHANGE_ALPHA, data: val });
        updateDispatch(category, val);
    };

    let handleUpdateCategory = (val) => {
        // setCategory(val);
        dispatch({ type: CHANGE_CATEGORY, data: val });
        updateDispatch(val, alpha);
    };

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount)
    }

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha)
    }

    const enterDetail = (id) => {
        props.history.push(`/singers/${id}`)
    }


    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : []
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <div>
            <NavContainer>
                <Horizen list={categoryTypes} title={"分类 (默认热门):"} handleClick={val => handleUpdateCategory(val)} currentVal={category}></Horizen>
                <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} currentVal={alpha}></Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList()}
                </Scroll>
                <Loading show={enterLoading}></Loading>
            </ListContainer>
            {renderRoutes(props.route.routes)}
        </div>


    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(actionTypes.getHotSingerList())
        },
        updateDispatch(category, alpha) {
            dispatch(actionTypes.changePageCount(0))
            dispatch(actionTypes.changeEnterLoading(true))
            dispatch(actionTypes.getSingerList(category, alpha))
        },
        pullUpRefreshDispatch(category, alpha, hot, count) {
            dispatch(actionTypes.changePullUpLoading(true))
            dispatch(actionTypes.changePageCount(count + 1))
            if (hot) {
                dispatch(actionTypes.refreshMoreHotSingerList())
            } else {
                dispatch(actionTypes.refreshMoreSingerList(category, alpha))
            }
        },
        pullDownRefreshDispatch(category, alpha) {
            dispatch(actionTypes.changePullDownLoading(true))
            dispatch(actionTypes.changePageCount(0))
            if (category === '' && alpha === '') {
                dispatch(actionTypes.getHotSingerList())
            } else {
                dispatch(actionTypes.getSingerList(category, alpha))
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singers)

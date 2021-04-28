import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';
import {
    List,
    ListItem
} from './style'

function Horizen(props) {
    const { list, currentVal, title } = props;
    const { handleClick } = props;
    const Category = useRef(null);

    useEffect(() => {
        let categoryDOM = Category.current;
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`;
    }, []);


    return (
        <Scroll direction={"horizental"}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${currentVal === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    );
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizen.defaultProps = {
    list: [],
    currentVal: '',
    title: '',
    handleClick: null
};

Horizen.propTypes = {
    list: PropTypes.array,
    currentVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
};
export default memo(Horizen);
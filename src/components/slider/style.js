import styled from 'styled-components'
import style from '../../assets/global-style'

export const SliderContainer = styled.div`
    position: relative;
    box-siziing: border-box;
    width: 100%;
    height: 100%;
    margin: auto;
    background: white;
    .before {
        position: absolute;
        top: 0;
        height: 60%;
        width: 100%;
        background: ${style["theme-color"]};
    }

    // 包裹轮播图
    .slider-container {
        position: relative;
        width: 98%;
        height: 160px;
        overflow: hidden;
        margin: auto;
        border-radius: 6px;
        // 包裹图片
        .slider-nav {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
        }
        // 激活dot时的样式
        .swiper-pagination-bullet-active {
            background: ${style["theme-color"]};
        }
    }
`
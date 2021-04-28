import React from 'react'
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import {
    Top,
    Tab,
    TabItem
} from './style'
import Player from '../Player';

function Home(props) {
    console.log(props)
    const { route } = props
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">WebApp</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink to="/recommend" activeClassName="selected"><TabItem>排行</TabItem></NavLink>
                <NavLink to="/singers" activeClassName="selected"><TabItem>歌手</TabItem></NavLink>
                <NavLink to="/rank" activeClassName="selected"><TabItem>排行榜</TabItem></NavLink>
            </Tab>
            {renderRoutes(route.routers)}
            <Player></Player>
        </div>
    )
}

export default React.memo(Home)

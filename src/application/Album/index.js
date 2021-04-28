import React, { useState, useEffect, useCallback } from 'react';
import { Container, TopDesc, Menu, SongItem, SongList } from './style';
import { CSSTransition } from 'react-transition-group';
import Header from './../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import { getName, getCount, isEmptyObject } from './../../api/utils';
import { connect } from 'react-redux'
import { getAlbumList } from './store/actionCreators';
import Loading from '../../baseUI/loading/index';
import SongsList from '../SongsList';


function Album(props) {
    const [showStatus, setShowStatus] = useState(true);

    const { currentAlbum: currentAlbumImmutable, enterLoading } = props
    const { getAlbumDataDispatch } = props

    const handleBack = useCallback(
        () => {
            setShowStatus(false);
        }, []
    )

    let currentAlbum = currentAlbumImmutable.toJS();

    const id = props.match.params.id;

    useEffect(() => {
        getAlbumDataDispatch(id);
    }, [getAlbumDataDispatch, id]);

    const renderTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                    <div className="decorate"></div>
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                        <i className="iconfont play">&#xe885;</i>
                        <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt="" />
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>

        )
    }

    const renderMenu = () => {
        return (
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
        更多
      </div>
            </Menu>

        )
    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Header title={"返回"} handleClick={handleBack}></Header>
                {
                    !isEmptyObject(currentAlbum) ?
                        (
                            <Scroll bounceTop={false}>
                                <div>
                                    {renderTopDesc()}
                                    {renderMenu()}
                                    <SongsList
                                        songs={currentAlbum.tracks}
                                        collectCount={currentAlbum.subscribedCount}
                                        showCollect={true}
                                        showBackground={true}
                                    ></SongsList>
                                </div>
                            </Scroll>
                        ) : null
                }
                {enterLoading ? <Loading></Loading> : null}
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumDataDispatch(id) {
            dispatch(getAlbumList(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))

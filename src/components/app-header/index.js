import React, { memo } from 'react'
import { headerLinks } from '../../common/local-data'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
    HeaderWrapper,
    HeaderLeft,
    HeaderRight
} from './style'

const AppHeader = memo(() => {

    // 遍历headerLink展示header中的每一个按键
    const showSelectItem = (item, index) => {
        if (index < 3) {
            return (
                <NavLink to={item.link} >
                    {item.title}
                    <i className='sprite_01 icon'></i>
                </NavLink>
            )
        } else {
            return <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
        }
    }

    return (
        <HeaderWrapper>
            <div className='content w1100'>
                <HeaderLeft>
                    <a href='#/' className='logo sprite_01'>网易云音乐</a>
                    <div className='select-list'>
                        {
                            headerLinks.map((item, index) => {
                                return (
                                    <div key={item.title} className="select-item">
                                        {showSelectItem(item, index)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <Input className='search' placeholder='音乐/视频/电台/用户' prefix={<SearchOutlined />} />
                    <div className='center'>创作者中心</div>
                    <div className='login'>登录</div>
                </HeaderRight>
            </div>
            <div className='divider'></div>
        </HeaderWrapper>
    )
})

export default AppHeader
import React, { memo } from 'react'
import { HeaderWrapper } from './style'

// recommend的主题头部
const ThemeHeaderRCM = memo(props => {
    const { title, keywords = [] } = props; // 给keywords默认值，防止报错
    return (
        <HeaderWrapper>
            <div className='left'>
                {/* 标题：热门推荐 */}
                <h3 className='title'>{title}</h3>
                {/* 关键字：华语、民谣 */}
                <div className='keyword'>
                    {
                        keywords.map((item, index) => {
                            return (
                                <div className='item' key={item}>
                                    <a href="todo">{item}</a>
                                    <span className='divider'>|</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='right'>
                <a href="todo">更多</a>
                <i className='icon sprite_02'></i>
            </div>
        </HeaderWrapper>
    )
})

export default ThemeHeaderRCM
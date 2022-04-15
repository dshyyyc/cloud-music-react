import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import { discoverMenu } from '../../common/local-data'
import {
    DiscoverWrapper,
    TopMenu
} from './style'

const Discover = memo(props => {

    // 可以从props中拿到route
    const { route } = props;
    return (
        <DiscoverWrapper>
            <div className='top'>
                <TopMenu className='w1100'>
                    {
                        discoverMenu.map((item, index) => {
                            return (
                                <div className='item' key={item.title}>
                                    <NavLink to={item.link}>{item.title}</NavLink>
                                </div>
                            )
                        })
                    }
                </TopMenu>
            </div>
            {renderRoutes(route.routes)}
        </DiscoverWrapper>
    )
})

export default Discover;
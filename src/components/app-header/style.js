import styled from "styled-components";

export const HeaderWrapper = styled.div`
    height: 75px;
    background-color: #242424;
    font-size: 14px;

    .content{
        /* height: 70px; */
        display: flex;
        justify-content: space-between;
    }

    .divider {
        height: 5px;
        background-color: #C20C0C;
    }
`

export const HeaderLeft = styled.div`
    display: flex;
    
    .logo {
        display: inline-block;
        width: 176px;
        height: 70px;
        background-position: 0 0;
        text-indent: -9999px; //将此处的文字移出可视区域
    }

    .select-list {
        display: flex;
        line-height: 70px;

        .select-item {
            position: relative;

            a {
                display: block;
                padding: 0 20px;
                color: #ccc;
            }

            /* hot图标 */
            :last-of-type a {
                position: relative;
                ::after {
                    position: absolute;
                    content: '';
                    width: 28px;
                    height: 19px;
                    background-image: url(${require('@/assets/img/sprite_01.png')});
                    background-position: -192px 0;
                    top: 20px;
                    right: -15px;
                }
            }

            &:hover a, .active{
                color: #fff;
                background-color: #000;
                text-decoration: none;
            }

            .active .icon {
                position: absolute;
                display: inline-block;
                width: 12px;
                height: 7px;
                bottom: -1px;
                left: 50%;
                transform: translate(-50%, 0);
                background-position: -226px 0;
            }
        }

        /* NavLink活跃状态 */
        .link-active {
            color: #fff;
            background-color: #000;
            /* 下面的小三角 */
            .icon {
                position: absolute;
                width: 12px;
                height: 7px;
                bottom: -1px;
                left: 50%;
                transform: translate(-50%, 0);
                background-image: url('${require('@/assets/img/sprite_01.png')}');
                background-position: 254px 0;
            }
        }
    }
`

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    color: #ccc;
    font-size: 12px;

    /* 搜索框 */
    .search {
        width: 221px;
        height: 32px;
        border-radius: 16px;
    
        input {
            font-size: 14px;
            font-family: '微软雅黑';
            &::placeholder {
                font-size: 12px;
            }
        }
    }

    .center {
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #666;
        border-radius: 16px;
        margin: 0 16px;
        background-color: transparent;

        &:hover {
            cursor: pointer;
            border-color: #fff;
            color: #fff;
        }
    }

    .login:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .profile-img {
        width: 35px;
        height: auto;
        border-radius: 50%;
    }
`
import React, { memo, Suspense } from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from "react-router-config"
import AppHeader from "@/components/app-header"
import AppFooter from "@/components/app-footer"
import routes from "./router"
import store from './store'
import { HashRouter } from 'react-router-dom'
import AppPlayerBar from './pages/player/app-player-bar'

const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        {/* 路由懒加载，需要把内容放在suspense中 */}
        <Suspense fallback={<div>loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <AppFooter />
        <AppPlayerBar />
      </HashRouter>
    </Provider>

  )
})

export default App;
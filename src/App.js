import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Recommendation from './pages/Recommendation';
import RandomLoading from './pages/RandomLoading';
import SelectedLoading from './pages/SelectedLoading';
import RandomRecResult from './pages/RandomRecResult';
import SelectedRecResult from './pages/SelectedRecResult';
import MainHeader from './components/common/MainHeader';
import LoadingMainHeader from './components/common/LoadingMainHeader';
import ClothSelect from './pages/ClothSelect';
import PreferenceTest from './pages/PreferenceTest';
import MindTest from './pages/MindTest';
import MindTestResult from './pages/MindTestResult';
import ClosetMain from './pages/ClosetMain';
import ClosetGrid from './pages/ClosetGrid';
import ClosetNew from './pages/ClosetNew';
import ClosetComplete from './pages/ClosetComplete';

function App() {
    return (
      <Router>
        {/* SY: 헤더를 정하는 Switch */}
        <Switch>
          <Route exact path="/recommendation/loading_selected" component={LoadingMainHeader}/>
          <Route exact path="/recommendation/loading_random" component={LoadingMainHeader}/>
          <Route path="/recommendation" component={MainHeader} />
          <Route path="/" component={MainHeader} />
        </Switch>
        {/* SY: 페이지 내용을 정하는 Switch */}
        <Switch>
          <Route exact path="/" component={Main} />
          {/* 수연 */}
          <Route exact path="/recommendation" component={Recommendation}/>
          <Route exact path="/recommendation/result_random" component={RandomRecResult}/>
          <Route exact path="/recommendation/result_selected" component={SelectedRecResult}/>
          <Route exact path="/recommendation/cloth_select" component={ClothSelect}/>
          <Route exact path="/recommendation/loading_random" component={RandomLoading}/>
          <Route exact path="/recommendation/loading_selected" component={SelectedLoading}/>
          <Route exact path="/preference_test" component={PreferenceTest}/>
          <Route exact path="/mind_test" component={MindTest}/>
          <Route exact path="/mind_test/result" component={MindTestResult}/>
          {/* 소희님 */}
          <Route exact path="/closet" component={ClosetMain} />
          <Route exact path="/closet/grid" component={ClosetGrid} />
          <Route exact path="/closet/new" component={ClosetNew} />
          <Route exact path="/closet/complete" component={ClosetComplete} />
          <Route exact path="/recommend" component={ClosetMain} />
          <Route exact path="/recommend/grid" component={ClosetGrid} />
        </Switch>
      </Router>
    );
}

export default App;
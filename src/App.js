import Routes from './routing/Routes';
import {
  BrowserRouter as Router
} from "react-router-dom";
import ChartStyle from './components/charts/ChartStyles';


export default function App() {
  return (
    <Router>
       <ChartStyle />
      <Routes/>
    </Router>
  );
}

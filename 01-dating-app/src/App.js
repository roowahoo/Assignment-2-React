import './App.css';
import Profiles from './Profiles'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar'
import FindProfiles from './FindProfiles'

function App() {
    return (
        <div className="App">
            <NavBar />
            <Profiles />
            <FindProfiles/>


        </div>
    );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { CustomApps } from './components/CustomApps';
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Banner />
            <CustomApps />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
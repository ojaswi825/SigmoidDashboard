import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { appStore } from "./Redux/AppStore";
import Authentication from "./Pages/Authentication";
import Dashboard from "./Pages/Dashboard";
import NotFound404 from "./Pages/NotFound404";

function App() {
    return (
        <div className="App">
            <Provider store={appStore}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Authentication />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFound404 />} />
                    </Routes>
                </Router>
            </Provider>
        </div>
    );
}

export default App;

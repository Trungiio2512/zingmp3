import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoute } from "~/routes";
import MainLayout from "~/layouts/MainLayout";
import { Fragment } from "react";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {publicRoute.map((route, index) => {
                        let Layout;
                        const Page = route.component;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout === undefined) {
                            Layout = MainLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
